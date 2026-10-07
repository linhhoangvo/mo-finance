const seed = {
  properties: [
    {id:"mo-sen",name:"Mô Sen",type:"House",status:"Renovating",location:"Cẩm Hà, Hội An",purchase:3440000000,paid:4746296035,outstanding:255000000,market:0},
    {id:"mo-trau",name:"Mô Trầu",type:"House",status:"Operating",location:"Cẩm Châu, Hội An",purchase:3950000000,paid:5472407315,outstanding:175000000,market:0},
    {id:"mo-dua",name:"Mô Dừa",type:"Land",status:"Holding",location:"Hội An",purchase:1999000000,paid:2010283869,outstanding:0,market:0},
    {id:"mo-xanh",name:"Mô Xanh",type:"Land",status:"Holding",location:"Hội An",purchase:3200000000,paid:3209500000,outstanding:0,market:0}
  ],
  transactions: [
    {id:1,date:"2026-05-08",property:"mo-sen",type:"Expense",category:"Renovation",description:"Hồ bơi",amount:20000000,source:"Milan"},
    {id:2,date:"2026-05-18",property:"mo-sen",type:"Expense",category:"Electrical",description:"Nguyên liệu điện",amount:13000000,source:"Milan"},
    {id:3,date:"2026-05-27",property:"mo-sen",type:"Expense",category:"Furniture",description:"Ga gối",amount:3800000,source:"Milan"}
  ],
  loans:[
    {name:"Bank - Tú",principal:11600000000,outstanding:11600000000,rate:null,next:"Monthly",type:"Bank"},
    {name:"Bank - Milan",principal:7790000000,outstanding:7790000000,rate:null,next:"Monthly",type:"Bank"},
    {name:"Anh Tấn",principal:2000000000,outstanding:2000000000,rate:null,next:"",type:"Private"},
    {name:"Phương",principal:2000000000,outstanding:2000000000,rate:null,next:"",type:"Private"}
  ],
  rentals:[],
  sales:[
    {property:"Mô Kim",cost:2897490000,price:4050000000,profit:1152510000},
    {property:"Mô Tươi Nhà",cost:8184124126,price:9500000000,profit:1315875874}
  ]
};

const money = n => new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(Number(n||0));
const shortMoney = n => {
  const v=Number(n||0);
  if(Math.abs(v)>=1e9) return (v/1e9).toFixed(v%1e9===0?0:2)+"B";
  if(Math.abs(v)>=1e6) return (v/1e6).toFixed(v%1e6===0?0:1)+"M";
  return new Intl.NumberFormat("vi-VN").format(v);
};
const state = JSON.parse(localStorage.getItem("moFinanceData")||"null") || seed;
const save=()=>localStorage.setItem("moFinanceData",JSON.stringify(state));
const propName=id=>state.properties.find(p=>p.id===id)?.name||"General";

function renderDashboard(){
  const totalCost=state.properties.reduce((s,p)=>s+p.paid+p.outstanding,0);
  const debt=state.loans.reduce((s,l)=>s+l.outstanding,0);
  const realized=state.sales.reduce((s,x)=>s+x.profit,0);
  const rent=state.rentals.reduce((s,x)=>s+(x.income||0)-(x.expense||0),0);
  const committed=state.properties.reduce((s,p)=>s+p.outstanding,0);

  document.querySelector("#dashboard").innerHTML=`
    <div class="note">V1 đang dùng dữ liệu mẫu và lưu trên trình duyệt (localStorage). Chưa có dữ liệu tài chính thật nào được đưa lên GitHub.</div>
    <div class="kpi-grid">
      ${kpi("Total cost basis",shortMoney(totalCost),"Purchase + paid + outstanding")}
      ${kpi("Outstanding debt",shortMoney(debt),"Bank + private loans")}
      ${kpi("Committed payables",shortMoney(committed),"Contractor / supplier balances")}
      ${kpi("Realized profit",shortMoney(realized),"Sold properties")}
      ${kpi("Rental NOI",shortMoney(rent),"Current local entries")}
    </div>
    <div class="section two-col">
      <div>
        <div class="section-head"><div><h2>Portfolio</h2><p>Investment by property</p></div></div>
        ${propertyTable()}
      </div>
      <div class="card chart-card">
        <h2>Cost allocation</h2>
        <p>Relative committed investment</p>
        ${state.properties.map(p=>barRow(p.name,p.paid+p.outstanding,totalCost)).join("")}
      </div>
    </div>`;
}

function kpi(label,value,sub){return `<div class="card kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div>`}
function statusClass(s){return s.toLowerCase().replace(/\s+/g,"-")}
function propertyTable(){
  return `<div class="table-wrap"><table><thead><tr><th>Property</th><th>Status</th><th>Location</th><th class="money">Purchase</th><th class="money">Paid</th><th class="money">Outstanding</th><th class="money">Cost basis</th></tr></thead><tbody>
  ${state.properties.map(p=>`<tr><td><strong>${p.name}</strong><br><small>${p.type}</small></td><td><span class="badge ${statusClass(p.status)}">${p.status}</span></td><td>${p.location||"-"}</td><td class="money">${money(p.purchase)}</td><td class="money">${money(p.paid)}</td><td class="money">${money(p.outstanding)}</td><td class="money"><strong>${money(p.paid+p.outstanding)}</strong></td></tr>`).join("")}
  </tbody></table></div>`
}
function barRow(name,value,total){const pct=total?Math.max(2,value/total*100):0;return `<div class="bar-row"><span>${name}</span><div class="bar"><span style="width:${pct}%"></span></div><strong>${shortMoney(value)}</strong></div>`}

function renderProperties(){
 document.querySelector("#properties").innerHTML=`<div class="section-head"><div><h2>Properties</h2><p>Mỗi tài sản là một project đầu tư riêng.</p></div></div>${propertyTable()}`;
}
function renderTransactions(){
 document.querySelector("#transactions").innerHTML=`<div class="section-head"><div><h2>Transactions</h2><p>Mỗi giao dịch chỉ nhập một lần.</p></div></div>
 <div class="table-wrap"><table><thead><tr><th>Date</th><th>Property</th><th>Type</th><th>Category</th><th>Description</th><th>Source</th><th class="money">Amount</th></tr></thead><tbody>
 ${state.transactions.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(t=>`<tr><td>${t.date}</td><td>${propName(t.property)}</td><td><span class="badge">${t.type}</span></td><td>${t.category}</td><td>${t.description}</td><td>${t.source||"-"}</td><td class="money">${money(t.amount)}</td></tr>`).join("")||`<tr><td colspan="7" class="empty">No transactions yet</td></tr>`}
 </tbody></table></div>`;
}
function renderLoans(){
 const total=state.loans.reduce((s,l)=>s+l.outstanding,0);
 document.querySelector("#loans").innerHTML=`<div class="kpi-grid">${kpi("Total outstanding",shortMoney(total),"All active loans")}${kpi("Bank debt",shortMoney(state.loans.filter(x=>x.type==="Bank").reduce((s,x)=>s+x.outstanding,0)),"Bank loans")}${kpi("Private debt",shortMoney(state.loans.filter(x=>x.type==="Private").reduce((s,x)=>s+x.outstanding,0)),"Personal lenders")}</div>
 <div class="section"><div class="table-wrap"><table><thead><tr><th>Loan</th><th>Type</th><th class="money">Principal</th><th class="money">Outstanding</th><th>Interest</th><th>Next payment</th></tr></thead><tbody>${state.loans.map(l=>`<tr><td><strong>${l.name}</strong></td><td><span class="badge debt">${l.type}</span></td><td class="money">${money(l.principal)}</td><td class="money">${money(l.outstanding)}</td><td>${l.rate??"—"}</td><td>${l.next||"—"}</td></tr>`).join("")}</tbody></table></div></div>`;
}
function renderRentals(){
 document.querySelector("#rentals").innerHTML=`<div class="section-head"><div><h2>Rental operations</h2><p>Income, operating expenses and NOI by property.</p></div></div><div class="card empty">Rental module ready for data import.</div>`;
}
function renderSales(){
 const profit=state.sales.reduce((s,x)=>s+x.profit,0);
 document.querySelector("#sales").innerHTML=`<div class="kpi-grid">${kpi("Realized profit",shortMoney(profit),"From sold properties")}</div><div class="section"><div class="table-wrap"><table><thead><tr><th>Property</th><th class="money">Cost</th><th class="money">Sale price</th><th class="money">Profit</th><th class="money">ROI</th></tr></thead><tbody>${state.sales.map(s=>`<tr><td><strong>${s.property}</strong></td><td class="money">${money(s.cost)}</td><td class="money">${money(s.price)}</td><td class="money">${money(s.profit)}</td><td class="money">${(s.profit/s.cost*100).toFixed(1)}%</td></tr>`).join("")}</tbody></table></div></div>`;
}
function renderReports(){
 const byType={}; state.transactions.forEach(t=>byType[t.type]=(byType[t.type]||0)+Number(t.amount||0));
 document.querySelector("#reports").innerHTML=`<div class="two-col"><div class="card chart-card"><h2>Transaction mix</h2><p>Based on local V1 entries</p>${Object.entries(byType).map(([k,v])=>barRow(k,v,Object.values(byType).reduce((a,b)=>a+b,0))).join("")||'<div class="empty">No data</div>'}</div><div class="card chart-card"><h2>Financial model</h2><p>Management reporting structure</p><div class="bar-row"><span>Capital</span><div>Owner contributions</div><strong>Equity</strong></div><div class="bar-row"><span>Debt</span><div>Bank + private</div><strong>Liability</strong></div><div class="bar-row"><span>Operations</span><div>Rent − Opex</div><strong>NOI</strong></div><div class="bar-row"><span>Sales</span><div>Net proceeds − cost basis</div><strong>Profit</strong></div></div></div>`;
}

function renderAll(){renderDashboard();renderProperties();renderTransactions();renderLoans();renderRentals();renderSales();renderReports()}
renderAll();

document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".nav-item,.view").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active"); document.querySelector("#"+btn.dataset.view).classList.add("active");
 document.querySelector("#pageTitle").textContent=btn.textContent;
}));

const dialog=document.querySelector("#transactionDialog");
document.querySelector("#addTransactionBtn").onclick=()=>{
 const sel=document.querySelector("#txProperty");
 sel.innerHTML='<option value="general">General / Portfolio</option>'+state.properties.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
 document.querySelector("#txDate").value=new Date().toISOString().slice(0,10);
 dialog.showModal();
};
document.querySelector("#transactionForm").addEventListener("submit",e=>{
 if(e.submitter?.value==="cancel") return;
 e.preventDefault();
 const tx={id:Date.now(),date:txDate.value,property:txProperty.value,type:txType.value,category:txCategory.value.trim(),description:txDescription.value.trim(),amount:Number(txAmount.value),source:txSource.value.trim()};
 state.transactions.push(tx); save(); renderAll(); dialog.close(); e.target.reset();
});
