const seed = {
  version: 2,
  cashHeld: 1674144215,
  properties: [
    {id:"mo-sen",name:"Mô Sen",type:"House",status:"Renovating",location:"Cẩm Hà, Hội An",description:"120m² · mặt tiền 6m · view lúa & sen",purchase:3440000000,paid:4746296035,outstanding:255000000,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3440000000,Legal:6364765,Construction:514431270,Wood:100000000,Contractor:685500000}},
    {id:"mo-trau",name:"Mô Trầu",type:"House",status:"Operating",location:"Cẩm Châu, Hội An",description:"152.7m² · mặt tiền 5m · view hậu lúa",purchase:3950000000,paid:5472407315,outstanding:175000000,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3950000000,Legal:26920409,Equipment:576486907,Wood:70000000,Contractor:848999999}},
    {id:"mo-dua",name:"Mô Dừa",type:"Land",status:"Holding",location:"Thanh Nam, Cẩm Châu",description:"Thửa đất số 99",purchase:1999000000,paid:2010283869,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:1999000000,Legal:11283869}},
    {id:"mo-xanh",name:"Mô Xanh",type:"Land",status:"Holding",location:"Hội An",description:"Đất đầu tư",purchase:3200000000,paid:3209500000,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3200000000,Legal:9500000}},
    {id:"mo-lua",name:"Mô Lúa",type:"Land",status:"Holding",location:"Hội An",description:"Danh mục đất Mô Lúa",purchase:7450000000,paid:7553560361,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:7450000000,Legal:73560361,Other:30000000}},
    {id:"mo-kim",name:"Mô Kim",type:"Land",status:"Sold",location:"Hội An",description:"Đã bán",purchase:2825000000,paid:2897490000,outstanding:0,market:4050000000,rentalProfit:0,debtAllocated:0,breakdown:{Land:2825000000,Legal:56890000,Construction:3600000,Other:12000000}},
    {id:"mo-tuoi-nha",name:"Mô Tươi Nhà",type:"House",status:"Sold",location:"An Mỹ, Cẩm Châu",description:"Nhà cho thuê 6 căn hộ · 171.2m²",purchase:0,paid:8184124126,outstanding:0,market:9500000000,rentalProfit:0,debtAllocated:0,breakdown:{TotalInvestment:8184124126}}
  ],
  transactions: [
    {id:1,date:"2026-05-08",property:"mo-sen",type:"Expense",category:"Construction",description:"Hồ bơi",amount:20000000,source:"Owner"},
    {id:2,date:"2026-05-18",property:"mo-sen",type:"Expense",category:"Electrical",description:"Nguyên liệu điện",amount:13000000,source:"Owner"},
    {id:3,date:"2026-05-27",property:"mo-sen",type:"Expense",category:"Furniture",description:"Ga gối",amount:3800000,source:"Owner"}
  ],
  loans:[
    {name:"Chị Tú",principal:11600000000,outstanding:11600000000,interestPaid:644942745,type:"Bank"},
    {name:"Chị Milan",principal:7790000000,outstanding:7790000000,interestPaid:375983245,type:"Bank"},
    {name:"Private loan A",principal:2000000000,outstanding:2000000000,interestPaid:0,type:"Private"},
    {name:"Private loan B",principal:2000000000,outstanding:2000000000,interestPaid:24657534,type:"Private"}
  ],
  capitalSources:[
    {name:"Owner capital A",amount:2730000000,type:"Equity"},
    {name:"Owner capital B",amount:3388994359,type:"Equity"},
    {name:"Bank financing",amount:19390000000,type:"Debt"}
  ],
  rentals:[],
  sales:[
    {propertyId:"mo-kim",property:"Mô Kim",cost:2897490000,price:4050000000,profit:1152510000},
    {propertyId:"mo-tuoi-nha",property:"Mô Tươi Nhà",cost:8184124126,price:9500000000,profit:1315875874}
  ]
};

const money=n=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(Number(n||0));
const num=n=>new Intl.NumberFormat("vi-VN").format(Number(n||0));
const shortMoney=n=>{const v=Number(n||0);if(Math.abs(v)>=1e9)return (v/1e9).toFixed(Math.abs(v)%1e9===0?0:2)+"B";if(Math.abs(v)>=1e6)return (v/1e6).toFixed(1)+"M";return num(v)};
const storageKey="moFinanceDataV2";
const state=JSON.parse(localStorage.getItem(storageKey)||"null")||structuredClone(seed);
const save=()=>localStorage.setItem(storageKey,JSON.stringify(state));
const propName=id=>state.properties.find(p=>p.id===id)?.name||"General";
const activeProps=()=>state.properties.filter(p=>p.status!=="Sold");
const costBasis=p=>Number(p.paid||0)+Number(p.outstanding||0);
const realizedProfit=()=>state.sales.reduce((s,x)=>s+Number(x.profit||0),0);
const totalDebt=()=>state.loans.reduce((s,l)=>s+Number(l.outstanding||0),0);
const totalInterestPaid=()=>state.loans.reduce((s,l)=>s+Number(l.interestPaid||0),0);

function kpi(label,value,sub){return `<div class="card kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div>`}
function statusClass(s){return s.toLowerCase().replace(/\s+/g,"-")}
function barRow(name,value,total){const pct=total?Math.max(2,value/total*100):0;return `<div class="bar-row"><span>${name}</span><div class="bar"><span style="width:${pct}%"></span></div><strong>${shortMoney(value)}</strong></div>`}

function propertyTable(list=state.properties){
 return `<div class="table-wrap"><table><thead><tr><th>Property</th><th>Status</th><th>Location</th><th class="money">Paid</th><th class="money">Outstanding</th><th class="money">Cost basis</th><th></th></tr></thead><tbody>
 ${list.map(p=>`<tr class="click-row" data-property="${p.id}"><td><strong>${p.name}</strong><br><small>${p.type}</small></td><td><span class="badge ${statusClass(p.status)}">${p.status}</span></td><td>${p.location||"-"}</td><td class="money">${money(p.paid)}</td><td class="money">${money(p.outstanding)}</td><td class="money"><strong>${money(costBasis(p))}</strong></td><td><button class="small-btn" data-property="${p.id}">View</button></td></tr>`).join("")}
 </tbody></table></div>`;
}

function renderDashboard(){
 const active=activeProps(), activeCost=active.reduce((s,p)=>s+costBasis(p),0);
 const payables=active.reduce((s,p)=>s+Number(p.outstanding||0),0);
 const estimatedEquity=active.reduce((s,p)=>s+(Number(p.market||0)||costBasis(p))-Number(p.debtAllocated||0),0);
 document.querySelector("#dashboard").innerHTML=`
 <div class="note"><strong>V2:</strong> portfolio model lấy cấu trúc và số liệu tổng hợp từ workbook. Các khoản vay chưa được phân bổ chính xác về từng tài sản nên Equity theo property sẽ chỉ chính xác sau khi gắn loan → property.</div>
 <div class="kpi-grid">
   ${kpi("Active cost basis",shortMoney(activeCost),"Tài sản chưa bán")}
   ${kpi("Portfolio debt",shortMoney(totalDebt()),"Bank + private")}
   ${kpi("Payables",shortMoney(payables),"Nhà thầu / nhà cung cấp")}
   ${kpi("Cash held",shortMoney(state.cashHeld),"Theo tổng kết workbook")}
   ${kpi("Realized profit",shortMoney(realizedProfit()),"Tài sản đã bán")}
 </div>
 <div class="section two-col">
  <div><div class="section-head"><div><h2>Active portfolio</h2><p>Bấm vào một tài sản để xem chi tiết.</p></div></div>${propertyTable(active)}</div>
  <div class="card chart-card"><h2>Capital deployed</h2><p>Cost basis theo tài sản đang nắm giữ</p>${active.map(p=>barRow(p.name,costBasis(p),activeCost)).join("")}</div>
 </div>
 <div class="section">
  <div class="section-head"><div><h2>Funding snapshot</h2><p>Tách Equity và Debt thay vì gộp thành “thu”.</p></div></div>
  <div class="source-grid">${state.capitalSources.map(s=>`<div class="card source-card"><span>${s.type}</span><strong>${shortMoney(s.amount)}</strong><small>${s.name}</small></div>`).join("")}</div>
 </div>`;
 bindPropertyRows();
}

function renderProperties(){
 const active=activeProps(), sold=state.properties.filter(p=>p.status==="Sold");
 document.querySelector("#properties").innerHTML=`
 <div class="section-head"><div><h2>Active properties</h2><p>Mỗi tài sản là một project đầu tư.</p></div></div>${propertyTable(active)}
 <div class="section"><div class="section-head"><div><h2>Sold properties</h2><p>Lưu lịch sử cost basis và realized profit.</p></div></div>${propertyTable(sold)}</div>`;
 bindPropertyRows();
}

function renderTransactions(){
 document.querySelector("#transactions").innerHTML=`<div class="section-head"><div><h2>Transactions</h2><p>Mỗi giao dịch chỉ nhập một lần.</p></div></div>
 <div class="table-wrap"><table><thead><tr><th>Date</th><th>Property</th><th>Type</th><th>Category</th><th>Description</th><th>Source</th><th class="money">Amount</th></tr></thead><tbody>
 ${state.transactions.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(t=>`<tr><td>${t.date}</td><td>${propName(t.property)}</td><td><span class="badge">${t.type}</span></td><td>${t.category}</td><td>${t.description}</td><td>${t.source||"-"}</td><td class="money">${money(t.amount)}</td></tr>`).join("")||`<tr><td colspan="7" class="empty">No transactions yet</td></tr>`}
 </tbody></table></div>`;
}

function renderLoans(){
 document.querySelector("#loans").innerHTML=`
 <div class="kpi-grid">${kpi("Total outstanding",shortMoney(totalDebt()),"All loans")}${kpi("Interest paid",shortMoney(totalInterestPaid()),"Workbook history")}${kpi("Bank debt",shortMoney(state.loans.filter(x=>x.type==="Bank").reduce((s,x)=>s+x.outstanding,0)),"Bank")}${kpi("Private debt",shortMoney(state.loans.filter(x=>x.type==="Private").reduce((s,x)=>s+x.outstanding,0)),"Private")}</div>
 <div class="section"><div class="table-wrap"><table><thead><tr><th>Loan</th><th>Type</th><th class="money">Principal</th><th class="money">Outstanding</th><th class="money">Interest paid</th></tr></thead><tbody>
 ${state.loans.map(l=>`<tr><td><strong>${l.name}</strong></td><td><span class="badge debt">${l.type}</span></td><td class="money">${money(l.principal)}</td><td class="money">${money(l.outstanding)}</td><td class="money">${money(l.interestPaid)}</td></tr>`).join("")}
 </tbody></table></div></div>`;
}

function renderRentals(){
 document.querySelector("#rentals").innerHTML=`<div class="section-head"><div><h2>Rental operations</h2><p>V2 đã chuẩn bị cấu trúc NOI theo từng property.</p></div></div>
 <div class="card empty">Chưa import được lịch sử doanh thu thuê từ workbook. Giao dịch Income/Expense có thể được thêm ngay từ nút “Add transaction”.</div>`;
}

function renderSales(){
 document.querySelector("#sales").innerHTML=`
 <div class="kpi-grid">${kpi("Realized profit",shortMoney(realizedProfit()),"Gross realized gain from workbook")}${kpi("Sold assets",state.sales.length,"Recorded exits")}</div>
 <div class="section"><div class="table-wrap"><table><thead><tr><th>Property</th><th class="money">Cost basis</th><th class="money">Sale price</th><th class="money">Profit</th><th class="money">ROI</th></tr></thead><tbody>
 ${state.sales.map(s=>`<tr class="click-row" data-property="${s.propertyId}"><td><strong>${s.property}</strong></td><td class="money">${money(s.cost)}</td><td class="money">${money(s.price)}</td><td class="money">${money(s.profit)}</td><td class="money">${(s.profit/s.cost*100).toFixed(1)}%</td></tr>`).join("")}
 </tbody></table></div></div>`;
 bindPropertyRows();
}

function renderReports(){
 const activeCost=activeProps().reduce((s,p)=>s+costBasis(p),0);
 const categories={};
 activeProps().forEach(p=>Object.entries(p.breakdown||{}).forEach(([k,v])=>categories[k]=(categories[k]||0)+Number(v||0)));
 document.querySelector("#reports").innerHTML=`
 <div class="two-col">
  <div class="card chart-card"><h2>Active cost mix</h2><p>Breakdown từ các property có dữ liệu phân loại.</p>${Object.entries(categories).sort((a,b)=>b[1]-a[1]).map(([k,v])=>barRow(k,v,activeCost)).join("")}</div>
  <div class="card chart-card"><h2>Management view</h2><p>Những số cần tách riêng</p>
   <div class="breakdown"><div class="breakdown-row"><span>Owner capital</span><strong>Equity</strong></div><div class="breakdown-row"><span>Bank/private loans</span><strong>Debt</strong></div><div class="breakdown-row"><span>Rental income − operating costs</span><strong>NOI</strong></div><div class="breakdown-row"><span>Sale proceeds − full cost basis</span><strong>Net profit</strong></div></div>
  </div>
 </div>`;
}

function openProperty(id){
 const p=state.properties.find(x=>x.id===id); if(!p)return;
 const sale=state.sales.find(s=>s.propertyId===id);
 const basis=costBasis(p);
 const detail=document.querySelector("#propertyDetail");
 detail.innerHTML=`
 <div class="property-head"><div><p class="eyebrow">PROPERTY</p><h2>${p.name}</h2><div class="property-meta"><span class="badge ${statusClass(p.status)}">${p.status}</span><span>${p.type}</span><span>·</span><span>${p.location}</span><span>·</span><span>${p.description||""}</span></div></div><button class="icon-btn" id="closeProperty">×</button></div>
 <div class="property-body">
  <div class="detail-grid">
   <div class="mini-card"><span>Purchase / Land</span><strong>${money(p.purchase)}</strong></div>
   <div class="mini-card"><span>Paid to date</span><strong>${money(p.paid)}</strong></div>
   <div class="mini-card"><span>Outstanding payable</span><strong>${money(p.outstanding)}</strong></div>
   <div class="mini-card"><span>Total cost basis</span><strong>${money(basis)}</strong></div>
  </div>
  <div class="section"><div class="section-head"><div><h2>Cost breakdown</h2><p>Phân loại chi phí từ workbook.</p></div></div>
   <div class="breakdown">${Object.entries(p.breakdown||{}).map(([k,v])=>`<div class="breakdown-row"><span>${k}</span><strong>${money(v)}</strong></div>`).join("")||'<div class="empty">No breakdown yet</div>'}</div>
  </div>
  ${sale?`<div class="calc"><h3>Exit result</h3><p>Asset already sold.</p><div class="calc-result"><div class="result-box"><span>Sale price</span><strong>${money(sale.price)}</strong></div><div class="result-box"><span>Cost basis</span><strong>${money(sale.cost)}</strong></div><div class="result-box"><span>Profit</span><strong>${money(sale.profit)}</strong></div><div class="result-box"><span>ROI</span><strong>${(sale.profit/sale.cost*100).toFixed(1)}%</strong></div></div></div>`:
  `<div class="calc"><h3>What if I sell today?</h3><p>Nhập giá bán dự kiến và chi phí bán để xem tiền thực nhận và lợi nhuận.</p>
   <div class="calc-grid">
    <label>Expected sale price<input id="salePrice" type="number" step="1000000" value="${p.market||basis}"></label>
    <label>Selling costs (%)<input id="sellingPct" type="number" step="0.1" value="2"></label>
    <label>Loan payoff<input id="loanPayoff" type="number" step="1000000" value="${p.debtAllocated||0}"></label>
    <label>Rental profit to date<input id="rentalProfit" type="number" step="1000000" value="${p.rentalProfit||0}"></label>
   </div>
   <div class="calc-result" id="calcResult"></div>
  </div>`}
 </div>`;
 document.querySelector("#propertyDialog").showModal();
 document.querySelector("#closeProperty").onclick=()=>document.querySelector("#propertyDialog").close();
 if(!sale){
   ["salePrice","sellingPct","loanPayoff","rentalProfit"].forEach(id=>document.querySelector("#"+id).addEventListener("input",()=>updateSaleCalc(p)));
   updateSaleCalc(p);
 }
}

function updateSaleCalc(p){
 const price=Number(document.querySelector("#salePrice").value||0),pct=Number(document.querySelector("#sellingPct").value||0),loan=Number(document.querySelector("#loanPayoff").value||0),rent=Number(document.querySelector("#rentalProfit").value||0);
 const sellingCosts=price*pct/100, basis=costBasis(p), profit=price-sellingCosts-basis+rent, cashAfterDebt=price-sellingCosts-loan;
 document.querySelector("#calcResult").innerHTML=`
 <div class="result-box"><span>Selling costs</span><strong>${money(sellingCosts)}</strong></div>
 <div class="result-box"><span>Cash after debt</span><strong>${money(cashAfterDebt)}</strong></div>
 <div class="result-box"><span>Estimated profit</span><strong>${money(profit)}</strong></div>
 <div class="result-box"><span>ROI on cost</span><strong>${basis?(profit/basis*100).toFixed(1):"0.0"}%</strong></div>`;
}

function bindPropertyRows(){
 document.querySelectorAll("[data-property]").forEach(el=>el.onclick=e=>{e.stopPropagation();openProperty(el.dataset.property)});
}

function renderAll(){renderDashboard();renderProperties();renderTransactions();renderLoans();renderRentals();renderSales();renderReports()}
renderAll();

document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".nav-item,.view").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active");document.querySelector("#"+btn.dataset.view).classList.add("active");document.querySelector("#pageTitle").textContent=btn.textContent;
}));

const dialog=document.querySelector("#transactionDialog");
document.querySelector("#addTransactionBtn").onclick=()=>{
 const sel=document.querySelector("#txProperty");
 sel.innerHTML='<option value="general">General / Portfolio</option>'+state.properties.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
 document.querySelector("#txDate").value=new Date().toISOString().slice(0,10);dialog.showModal();
};
document.querySelector("#transactionForm").addEventListener("submit",e=>{
 if(e.submitter?.value==="cancel")return;
 e.preventDefault();
 state.transactions.push({id:Date.now(),date:txDate.value,property:txProperty.value,type:txType.value,category:txCategory.value.trim(),description:txDescription.value.trim(),amount:Number(txAmount.value),source:txSource.value.trim()});
 save();renderAll();dialog.close();e.target.reset();
});
