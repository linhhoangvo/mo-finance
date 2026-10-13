const seed = {
  version: 2,
  cashHeld: 1674144215,
  properties: [
    {id:"mo-sen",name:"Mô Sen",type:"House",status:"Renovating",location:"Cẩm Hà, Hội An",description:"120m² · mặt tiền 6m · view lúa & sen",purchase:3440000000,paid:4753803639,outstanding:255000000,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3440000000,Legal:13872369,Construction:514431270,Wood:100000000,Contractor:685500000}},
    {id:"mo-trau",name:"Mô Trầu",type:"House",status:"Operating",location:"Cẩm Châu, Hội An",description:"152.7m² · mặt tiền 5m · view hậu lúa",purchase:3950000000,paid:5480407315,outstanding:175000000,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3950000000,Legal:34920409,Equipment:576486907,Wood:70000000,Contractor:848999999}},
    {id:"mo-dua",name:"Mô Dừa",type:"Land",status:"Holding",location:"Thanh Nam, Cẩm Châu",description:"Thửa đất số 99",purchase:1999000000,paid:2010283869,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:1999000000,Legal:11283869}},
    {id:"mo-xanh",name:"Mô Xanh",type:"Land",status:"Holding",location:"Hội An",description:"Đất đầu tư",purchase:3200000000,paid:3209500000,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3200000000,Legal:9500000}},
    {id:"mo-lua-1",name:"Mô Lúa 1",type:"Land",status:"Holding",location:"Hội An",description:"Đất Mô Lúa 1",purchase:2150000000,paid:2214789111,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:2150000000,Legal:34789111,Construction:30000000}},
    {id:"mo-lua-moi",name:"Mô Lúa mới",type:"Land",status:"Holding",location:"Hội An",description:"Đất Mô Lúa mới",purchase:2300000000,paid:2328551000,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:2300000000,Legal:28551000}},
    {id:"mo-tuoi-dat",name:"Mô Tươi Đất",type:"Land",status:"Holding",location:"An Mỹ, Cẩm Châu, Hội An",description:"Đất Mô Tươi",purchase:3000000000,paid:3010220250,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{Land:3000000000,Legal:10220250}},
    {id:"nuong-om",name:"Nương Ôm",type:"Project",status:"Operating",location:"Hội An",description:"Dự án Nương Ôm",purchase:0,paid:1266560000,outstanding:0,market:0,rentalProfit:0,debtAllocated:0,breakdown:{TotalInvestment:1266560000}},
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
const verifiedSen=state.properties.find(p=>p.id==="mo-sen");
if(verifiedSen && Number(verifiedSen.paid)===4746296035){
 verifiedSen.paid=4753803639;
 verifiedSen.breakdown=verifiedSen.breakdown||{};
 verifiedSen.breakdown.OtherUnclassified=Number(verifiedSen.breakdown.OtherUnclassified||0)+7507604;
 save();
}
if(verifiedSen && Number(verifiedSen.breakdown?.Legal)===13872369){
 verifiedSen.breakdown.Legal=6364765;
 verifiedSen.breakdown.OtherUnclassified=7507604;
 save();
}
if(verifiedSen && Number(verifiedSen.breakdown?.OtherUnclassified)===7507604){
 verifiedSen.breakdown.Legal=13872369;
 delete verifiedSen.breakdown.OtherUnclassified;
 save();
}
if(!state.properties.some(p=>p.id==="nuong-om")){
 state.properties.push(structuredClone(seed.properties.find(p=>p.id==="nuong-om")));
 save();
}

// Split the old combined land portfolio only when it still matches the verified workbook.
const oldLand=state.properties.find(p=>p.id==="mo-lua");
if(oldLand&&Number(oldLand.paid)===7553560361&&Number(oldLand.outstanding||0)===0){
 const newProps=structuredClone(seed.properties.filter(p=>["mo-lua-1","mo-lua-moi","mo-tuoi-dat"].includes(p.id)));
 const present=new Set(state.properties.map(p=>p.id));
 state.properties=state.properties.filter(p=>p.id!=="mo-lua");
 newProps.forEach(p=>{if(!present.has(p.id))state.properties.push(p)});
 // Preserve legacy transactions and loans: existing mo-lua references are not reassigned without evidence.
 localStorage.setItem(storageKey,JSON.stringify(state));
}

// Mô Trầu: tab Mô Trầu base 5,472,407,315 + tab Tổng row 588 legal 8,000,000.
const moTrau=state.properties.find(p=>p.id==="mo-trau");
if(moTrau&&Number(moTrau.paid)===5472407315){
  moTrau.paid=5480407315;
  localStorage.setItem(storageKey,JSON.stringify(state));
}

// Incremental source-sheet import. Fixed source-row IDs make reloading idempotent.
const sheetUpdates=[
 {row:586,date:"2026-09-17",property:"mo-sen",category:"Legal",description:"Làm sổ + đóng thuế đưa nhà vào sổ nhà Sen",amount:6485674},
 {row:588,date:"2026-09-19",property:"mo-trau",category:"Legal",description:"Mô Trầu chuyển khoản làm giấy tờ",amount:8000000},
 {row:602,date:"2026-09-11",property:"general",category:"Payroll",description:"Chi phí lương Cam",amount:239000000},

 {row:592,date:"2026-10-02",property:"mo-sen",category:"Legal",description:"Làm sổ + đóng thuế đưa nhà vào sổ nhà Sen",amount:1021930},
 {row:593,date:"2026-10-02",property:"general",category:"Business registration",description:"Chuyển khoản tiền ĐKKD nhà Cẩm Thanh",amount:3000000},
 {row:594,date:"2026-10-07",property:"general",category:"Nương Ôm",description:"Nương Ôm cảm ơn chi",amount:2000000},
 {row:595,date:"2026-10-07",property:"general",category:"Legal",description:"Giấy tờ Mô",amount:275000},
 {row:596,date:"2026-10-07",property:"general",category:"Legal",description:"Giấy tờ Mô",amount:145000},
 {row:597,date:"2026-10-07",property:"general",category:"Payroll",description:"Lương Cam tháng 9",amount:7000000},
 {row:598,date:"2026-10-07",property:"general",category:"Payroll",description:"Lương Duy Tháng 9",amount:10000000}
];
let sheetChanged=false;
for(const t of sheetUpdates){
 const id="sheet-tong-"+t.row;
 if(!state.transactions.some(x=>String(x.id)===id)){
  state.transactions.push({id,date:t.date,property:t.property,type:"Expense",category:t.category,description:t.description,amount:t.amount,source:"Google Sheets · Tổng · row "+t.row});
  sheetChanged=true;
 }
}
if(moTrau&&Number(moTrau.breakdown?.Legal)===26920409){
 moTrau.breakdown.Legal=34920409;
 localStorage.setItem(storageKey,JSON.stringify(state));
}
if(sheetChanged)localStorage.setItem(storageKey,JSON.stringify(state));

state.loans.forEach((loan,i)=>{if(!loan.id)loan.id="loan-"+i;if(!Array.isArray(loan.allocations))loan.allocations=[]});
const escapeHtml=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const loanAllocated=loan=>(loan.allocations||[]).reduce((sum,a)=>sum+Number(a.amount||0),0);
const propertyLoanBalance=propertyId=>trackedLoans().reduce((sum,loan)=>sum+(loan.allocations||[]).filter(a=>a.propertyId===propertyId).reduce((v,a)=>v+Number(a.amount||0),0),0);
const loanUnallocated=loan=>Math.max(0,Number(loan.outstanding||0)-loanAllocated(loan));

const propName=id=>state.properties.find(p=>p.id===id)?.name||"General";
const activeProps=()=>state.properties.filter(p=>p.status!=="Sold");
const costBasis=p=>Number(p.paid||0)+Number(p.outstanding||0);
const realizedProfit=()=>state.sales.reduce((s,x)=>s+Number(x.profit||0),0);
const trackedLoans=()=>state.loans.filter(l=>["Chị Tú","Chị Milan"].includes(String(l.name||"").trim()));
const totalDebt=()=>trackedLoans().reduce((s,l)=>s+Number(l.outstanding||0),0);
const totalInterestPaid=()=>trackedLoans().reduce((s,l)=>s+Number(l.interestPaid||0),0);

const vnLabel={
 Land:"Đất",Legal:"Pháp lý",Construction:"Xây dựng",Wood:"Gỗ",Contractor:"Nhà thầu",Equipment:"Trang thiết bị",Electrical:"Điện",Furniture:"Nội thất",Other:"Chi phí khác",OtherUnclassified:"Chi phí chưa phân loại",TotalInvestment:"Tổng vốn đầu tư",Payroll:"Lương nhân viên","Business registration":"Đăng ký kinh doanh",Renovating:"Đang cải tạo",Operating:"Đang hoạt động",Holding:"Đang nắm giữ",Sold:"Đã bán",House:"Nhà",Project:"Dự án",Bank:"Ngân hàng",Private:"Cá nhân",Equity:"Vốn chủ sở hữu",Debt:"Nợ vay",Expense:"Chi phí",Income:"Thu nhập","Capital Contribution":"Góp vốn","Loan In":"Nhận tiền vay","Loan Repayment":"Trả nợ vay",Transfer:"Chuyển khoản nội bộ",General:"Chi phí chung",Owner:"Chủ đầu tư",Rent:"Tiền thuê"
};
const vn=v=>vnLabel[String(v)]||String(v??"");
function kpi(label,value,sub){return `<div class="card kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div>`}
function statusClass(s){return s.toLowerCase().replace(/\s+/g,"-")}
function barRow(name,value,total){const pct=total?Math.max(2,value/total*100):0;return `<div class="bar-row"><span>${name}</span><div class="bar"><span style="width:${pct}%"></span></div><strong>${shortMoney(value)}</strong></div>`}

function propertyTable(list=state.properties){
 return `<div class="table-wrap"><table><thead><tr><th>Bất động sản</th><th>Trạng thái</th><th>Vị trí</th><th class="money">Đã trả</th><th class="money">Còn nợ</th><th class="money">Giá vốn</th><th></th></tr></thead><tbody>
 ${list.map(p=>`<tr class="click-row" data-property="${p.id}"><td><strong>${p.name}</strong><br><small>${vn(p.type)}</small></td><td><span class="badge ${statusClass(p.status)}">${vn(p.status)}</span></td><td>${p.location||"-"}</td><td class="money">${money(p.paid)}</td><td class="money">${money(p.outstanding)}</td><td class="money"><strong>${money(costBasis(p))}</strong></td><td><button class="small-btn" data-property="${p.id}">Xem</button></td></tr>`).join("")}
 </tbody></table></div>`;
}

function renderDashboard(){
 const active=activeProps(), activeCost=active.reduce((s,p)=>s+costBasis(p),0);
 const payables=active.reduce((s,p)=>s+Number(p.outstanding||0),0);
 const allocatedDebt=active.reduce((s,p)=>s+propertyLoanBalance(p.id),0);
 document.querySelector("#dashboard").innerHTML=`
 <div class="note"><strong>V2:</strong> portfolio model lấy cấu trúc và số liệu tổng hợp từ workbook. V3: phân bổ dư nợ theo từng tài sản trong Loans → Allocate. Khoản chưa phân bổ vẫn được giữ ở cấp danh mục; không tự suy đoán khoản vay thuộc nhà nào.</div>
 <div class="kpi-grid">
   ${kpi("Giá vốn tài sản đang giữ",shortMoney(activeCost),"Tài sản chưa bán")}
   ${kpi("Tổng dư nợ",shortMoney(totalDebt()),"Bank + private")}
   ${kpi("Công nợ phải trả",shortMoney(payables),"Nhà thầu / nhà cung cấp")}
   ${kpi("Tiền mặt hiện có",shortMoney(state.cashHeld),"Theo tổng kết workbook")}
   ${kpi("Lợi nhuận đã thực hiện",shortMoney(realizedProfit()),"Tài sản đã bán")}
 </div>
 <div class="section two-col">
  <div><div class="section-head"><div><h2>Danh mục đang sở hữu</h2><p>Bấm vào một tài sản để xem chi tiết.</p></div></div>${propertyTable(active)}</div>
  <div class="card chart-card"><h2>Vốn đã đầu tư</h2><p>Cost basis theo tài sản đang nắm giữ</p>${active.map(p=>barRow(p.name,costBasis(p),activeCost)).join("")}</div>
 </div>
 <div class="section">
  <div class="section-head"><div><h2>Cơ cấu nguồn vốn</h2><p>Tách Equity và Debt thay vì gộp thành “thu”.</p></div></div>
  <div class="source-grid">${state.capitalSources.map(s=>`<div class="card source-card"><span>${vn(s.type)}</span><strong>${shortMoney(s.amount)}</strong><small>${s.name}</small></div>`).join("")}</div>
 </div>`;
 bindPropertyRows();
}

function renderProperties(){
 const active=activeProps(), sold=state.properties.filter(p=>p.status==="Sold");
 document.querySelector("#properties").innerHTML=`
 <div class="section-head"><div><h2>Bất động sản đang sở hữu</h2><p>Mỗi tài sản là một project đầu tư.</p></div></div>${propertyTable(active)}
 <div class="section"><div class="section-head"><div><h2>Bất động sản đã bán</h2><p>Lưu lịch sử cost basis và realized profit.</p></div></div>${propertyTable(sold)}</div>`;
 bindPropertyRows();
}

const isoDate=d=>{const x=String(d||"");return /^\\d{4}-\\d{2}-\\d{2}$/.test(x)?x:""};
const calendarToday=()=>{const d=new Date(),local=new Date(d.getTime()-d.getTimezoneOffset()*60000);return local.toISOString().slice(0,7)};
const financeUi={month:calendarToday(),property:"all",type:"all",search:""};
function filteredTransactions(){
 return state.transactions.filter(t=>(financeUi.property==="all"||t.property===financeUi.property)&&(financeUi.type==="all"||t.type===financeUi.type)&&(!financeUi.search||[t.date,propName(t.property),t.type,t.category,t.description,t.source,t.amount].join(" ").toLocaleLowerCase("vi").includes(financeUi.search.toLocaleLowerCase("vi"))));
}
function downloadTransactionsCsv(){
 const columns=["Date","Property","Type","Category","Description","Amount (VND)","Source"];
 const rows=filteredTransactions().map(t=>[t.date,propName(t.property),t.type,t.category,t.description,Number(t.amount)||0,t.source||""]);
 const csv="\\uFEFF"+[columns,...rows].map(row=>row.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(",")).join("\\r\\n");
 const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
 const link=document.createElement("a");link.href=url;link.download="mo-finance-transactions.csv";document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function transactionControls(){
 return `<div class="tx-controls">
 <label>Bất động sản<select id="filterProperty"><option value="all">Tất cả bất động sản</option><option value="general">Chi phí chung / Danh mục</option>${state.properties.map(p=>`<option value="${escapeHtml(p.id)}" ${financeUi.property===p.id?"selected":""}>${escapeHtml(p.name)}</option>`).join("")}</select></label>
 <label>Loại giao dịch<select id="filterType">${["all","Expense","Income","Capital Contribution","Loan In","Loan Repayment","Transfer"].map(t=>`<option value="${t}" ${financeUi.type===t?"selected":""}>${t==="all"?"Tất cả loại giao dịch":({"Expense":"Chi phí","Income":"Thu nhập","Capital Contribution":"Góp vốn","Loan In":"Nhận tiền vay","Loan Repayment":"Trả nợ vay","Transfer":"Chuyển khoản nội bộ"}[t]||t)}</option>`).join("")}</select></label>
 <label>Tìm kiếm<input id="filterSearch" type="search" placeholder="Nội dung, số tiền..." value="${escapeHtml(financeUi.search)}"></label>
 <button type="button" class="ghost" id="exportTransactions">Xuất CSV</button></div>`;
}
function bindTransactionControls(){
 const prop=document.querySelector("#filterProperty"),type=document.querySelector("#filterType"),search=document.querySelector("#filterSearch"),exp=document.querySelector("#exportTransactions");
 if(prop){prop.value=financeUi.property;prop.onchange=()=>{financeUi.property=prop.value;renderTransactions()}}
 if(type){type.onchange=()=>{financeUi.type=type.value;renderTransactions()}}
 if(search){search.oninput=()=>{financeUi.search=search.value;const tbody=document.querySelector("#txRows");if(tbody)tbody.innerHTML=transactionRows(filteredTransactions())}}
 if(exp)exp.onclick=downloadTransactionsCsv;
}
function transactionRows(rows){
 return rows.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(t=>`<tr><td>${escapeHtml(t.date)}</td><td>${escapeHtml(propName(t.property))}</td><td><span class="badge">${escapeHtml(t.type)}</span></td><td>${escapeHtml(t.category)}</td><td>${escapeHtml(t.description)}</td><td>${escapeHtml(t.source||"-")}</td><td class="money">${money(t.amount)}</td></tr>`).join("")||'<tr><td colspan="7" class="empty">Không có giao dịch phù hợp</td></tr>';
}
function renderTransactions(){
 const rows=filteredTransactions();
 const spent=rows.filter(t=>t.type==="Expense").reduce((v,t)=>v+Number(t.amount||0),0);
 const income=rows.filter(t=>t.type==="Income").reduce((v,t)=>v+Number(t.amount||0),0);
 document.querySelector("#transactions").innerHTML=`<div class="section-head"><div><h2>Giao dịch</h2><p>Lọc, tìm kiếm và xuất danh sách giao dịch.</p></div></div>
 ${transactionControls()}
 <div class="tx-totals"><span><strong>${rows.length}</strong> giao dịch</span><span>Chi phí <strong>${money(spent)}</strong></span><span>Thu nhập <strong>${money(income)}</strong></span></div>
 <div class="table-wrap"><table><thead><tr><th>Ngày</th><th>Bất động sản</th><th>Loại</th><th>Danh mục</th><th>Nội dung</th><th>Nguồn</th><th class="money">Số tiền</th></tr></thead><tbody id="txRows">${transactionRows(rows)}</tbody></table></div>`;
 bindTransactionControls();
}
function renderCalendar(){
 const month=financeUi.month;
 const [year,mon]=month.split("-").map(Number);
 const start=new Date(year,mon-1,1),first=(start.getDay()+6)%7,days=new Date(year,mon,0).getDate();
 const monthRows=state.transactions.filter(t=>isoDate(t.date).startsWith(month)&&(financeUi.property==="all"||financeUi.property===t.property));
 const byDay={};for(const t of monthRows){const day=Number(t.date.slice(8,10));(byDay[day]??=[]).push(t)}
 const cells=Array.from({length:first},()=>'<div class="calendar-day muted-day" aria-hidden="true"></div>');
 for(let day=1;day<=days;day++){
   const entries=byDay[day]||[],expenses=entries.filter(t=>t.type==="Expense").reduce((v,t)=>v+Number(t.amount||0),0),income=entries.filter(t=>t.type==="Income").reduce((v,t)=>v+Number(t.amount||0),0);
   const iso=month+"-"+String(day).padStart(2,"0");
   cells.push(`<button type="button" class="calendar-day ${entries.length?"has-entries":""}" data-day="${iso}"><span class="calendar-number">${day}</span>${entries.length?`<small>${entries.length} giao dịch</small>`:""}${expenses?`<span class="calendar-expense">− ${shortMoney(expenses)}</span>`:""}${income?`<span class="calendar-income">+ ${shortMoney(income)}</span>`:""}</button>`);
 }
 document.querySelector("#calendar").innerHTML=`<div class="section-head"><div><h2>Lịch giao dịch</h2><p>Biến động thu chi theo giao dịch đã nhập, không phải số dư ngân hàng.</p></div></div>
 <div class="calendar-toolbar"><button type="button" class="ghost" id="calendarPrev" aria-label="Tháng trước">←</button><input type="month" id="calendarMonth" value="${month}" aria-label="Month"><button type="button" class="ghost" id="calendarNext" aria-label="Tháng sau">→</button><select id="calendarProperty"><option value="all">Tất cả bất động sản</option><option value="general">Chi phí chung / Danh mục</option>${state.properties.map(p=>`<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)}</option>`).join("")}</select></div>
 <div class="calendar-summary"><span>${monthRows.length} giao dịch</span><span>Chi phí: <strong>${money(monthRows.filter(t=>t.type==="Expense").reduce((v,t)=>v+Number(t.amount||0),0))}</strong></span><span>Thu nhập: <strong>${money(monthRows.filter(t=>t.type==="Income").reduce((v,t)=>v+Number(t.amount||0),0))}</strong></span></div>
 <div class="calendar-grid">${["T2","T3","T4","T5","T6","T7","CN"].map(d=>`<div class="calendar-weekday">${d}</div>`).join("")}${cells.join("")}</div><div class="card calendar-details" id="calendarDetails"><p>Chọn ngày để xem chi tiết giao dịch.</p></div>`;
 const prevNext=n=>{const d=new Date(year,mon-1+n,1);financeUi.month=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");renderCalendar()};
 document.querySelector("#calendarPrev").onclick=()=>prevNext(-1);
 document.querySelector("#calendarNext").onclick=()=>prevNext(1);
 document.querySelector("#calendarMonth").onchange=e=>{if(/^\\d{4}-\\d{2}$/.test(e.target.value)){financeUi.month=e.target.value;renderCalendar()}};
 const p=document.querySelector("#calendarProperty");p.value=financeUi.property;p.onchange=()=>{financeUi.property=p.value;renderTransactions()};
 document.querySelectorAll("[data-day]").forEach(button=>button.onclick=()=>{
  const date=button.dataset.day,entries=monthRows.filter(t=>t.date===date);
  document.querySelector("#calendarDetails").innerHTML=`<h3>${date} · ${entries.length} giao dịch</h3>${entries.length?'<div class="table-wrap"><table><thead><tr><th>Bất động sản</th><th>Loại</th><th>Nội dung</th><th class="money">Số tiền</th></tr></thead><tbody>'+entries.map(t=>`<tr><td>${escapeHtml(propName(t.property))}</td><td>${escapeHtml(t.type)}</td><td>${escapeHtml(t.description)}</td><td class="money">${money(t.amount)}</td></tr>`).join("")+'</tbody></table></div>':"<p>Ngày này chưa có giao dịch.</p>"}`;
 });
}

// Chỉ lưu giá trị từ bảng dư nợ, không đưa số tài khoản hay mã khách hàng lên GitHub công khai.
const chiTietVayChiTu=[
 [500000000,3726027],[1000000000,6753425],[670000000,4212739],
 [1350000000,8173972],[2500000000,16883562],[500000000,3260274],
 [800000000,6147945],[800000000,5402740],[780000000,5267671],
 [2700000000,18234246]
];
function renderChiTietVayChiTu(){
 const principal=chiTietVayChiTu.reduce((n,r)=>n+r[0],0);
 const interest=chiTietVayChiTu.reduce((n,r)=>n+r[1],0);
 return `<div class="section"><div class="section-head"><div><h2>Chi tiết khoản vay Chị Tú</h2><p>10 khoản dư nợ theo ảnh sao kê bạn cung cấp. Lãi đến hạn không phải lãi đã thanh toán.</p></div></div>
 <div class="table-wrap"><table><thead><tr><th>Khoản</th><th class="money">Dư nợ gốc</th><th class="money">Gốc đến hạn</th><th class="money">Gốc quá hạn</th><th class="money">Lãi đến hạn</th><th class="money">Tổng phải thu</th></tr></thead><tbody>
 ${chiTietVayChiTu.map((r,i)=>`<tr><td>Khoản ${i+1}</td><td class="money">${money(r[0])}</td><td class="money">0 ₫</td><td class="money">0 ₫</td><td class="money">${money(r[1])}</td><td class="money">${money(r[1])}</td></tr>`).join("")}
 <tr class="loan-total"><td><strong>Tổng cộng</strong></td><td class="money"><strong>${money(principal)}</strong></td><td class="money">0 ₫</td><td class="money">0 ₫</td><td class="money"><strong>${money(interest)}</strong></td><td class="money"><strong>${money(interest)}</strong></td></tr>
 </tbody></table></div><p style="color:var(--muted);font-size:12px;margin-top:9px">Ngày lập bảng sao kê chưa được cung cấp; số lãi đến hạn là số tại thời điểm chụp ảnh, không phải số dư lãi hiện tại.</p></div>`;
}
const chiTietVayChiMilan=[
 [1000000000,6753424],[800000000,5402740],[500000000,3376712],
 [995000000,6719657],[2800000000,17605480],[900000000,6078082],
 [500000000,3376712],[295000000,1992260]
];
function renderChiTietVayChiMilan(){
 const principal=chiTietVayChiMilan.reduce((n,r)=>n+r[0],0);
 const interest=chiTietVayChiMilan.reduce((n,r)=>n+r[1],0);
 return `<div class="section"><div class="section-head"><div><h2>Chi tiết khoản vay Chị Milan</h2><p>8 khoản dư nợ theo ảnh sao kê bạn cung cấp. Lãi đến hạn không phải lãi đã thanh toán.</p></div></div>
 <div class="table-wrap"><table><thead><tr><th>Khoản</th><th class="money">Dư nợ gốc</th><th class="money">Gốc đến hạn</th><th class="money">Gốc quá hạn</th><th class="money">Lãi đến hạn</th><th class="money">Tổng phải thu</th></tr></thead><tbody>
 ${chiTietVayChiMilan.map((r,i)=>`<tr><td>Khoản ${i+1}</td><td class="money">${money(r[0])}</td><td class="money">0 ₫</td><td class="money">0 ₫</td><td class="money">${money(r[1])}</td><td class="money">${money(r[1])}</td></tr>`).join("")}
 <tr class="loan-total"><td><strong>Tổng cộng</strong></td><td class="money"><strong>${money(principal)}</strong></td><td class="money">0 ₫</td><td class="money">0 ₫</td><td class="money"><strong>${money(interest)}</strong></td><td class="money"><strong>${money(interest)}</strong></td></tr>
 </tbody></table></div><p style="color:var(--muted);font-size:12px;margin-top:9px">Ngày lập bảng sao kê chưa được cung cấp; số lãi đến hạn là số tại thời điểm chụp ảnh, không phải số dư lãi hiện tại.</p></div>`;
}
function renderLoans(){
 const loans=trackedLoans();
 document.querySelector("#loans").innerHTML=`
 <div class="kpi-grid loan-summary">
  ${kpi("Tổng dư nợ ngân hàng",money(totalDebt()),"Chị Tú và Chị Milan")}
  ${loans.map(l=>kpi("Dư nợ "+l.name,money(l.outstanding),"Khoản vay ngân hàng")).join("")}
 </div>
 ${renderChiTietVayChiTu()}
 ${renderChiTietVayChiMilan()}
 `;
}

function openLoanAllocation(id){
 const loan=state.loans.find(l=>l.id===id);if(!loan)return;
 const dialog=document.querySelector("#loanAllocationDialog");
 const entries=loan.allocations||[];
 dialog.querySelector("#allocationTitle").textContent="Phân bổ · "+loan.name;
 dialog.querySelector("#allocationSummary").textContent="Dư nợ "+money(loan.outstanding)+" · Có thể phân bổ "+money(loanUnallocated(loan));
 const select=dialog.querySelector("#allocationProperty");
 select.innerHTML=state.properties.map(p=>`<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)}</option>`).join("");
 dialog.querySelector("#allocationAmount").value="";
 dialog.querySelector("#allocationError").textContent="";
 const listing=dialog.querySelector("#allocationRows");
 listing.innerHTML=entries.length?entries.map((a,i)=>`<div class="breakdown-row"><span>${escapeHtml(propName(a.propertyId))}</span><strong>${money(a.amount)}</strong><button type="button" class="small-btn" data-remove-allocation="${i}">Xóa</button></div>`).join(""):'<p class="empty">Chưa có phân bổ.</p>';
 listing.querySelectorAll("[data-remove-allocation]").forEach(b=>b.onclick=()=>{
   loan.allocations.splice(Number(b.dataset.removeAllocation),1);save();renderAll();openLoanAllocation(id);
 });
 dialog.querySelector("#allocationForm").onsubmit=e=>{
   e.preventDefault();
   const propertyId=select.value,amount=Number(dialog.querySelector("#allocationAmount").value);
   if(!Number.isSafeInteger(amount)||amount<=0||amount>loanUnallocated(loan)){
      dialog.querySelector("#allocationError").textContent="Nhập số tiền VND nguyên dương, không vượt quá dư nợ chưa phân bổ.";return;
   }
   const existing=loan.allocations.find(a=>a.propertyId===propertyId);
   if(existing)existing.amount+=amount;else loan.allocations.push({propertyId,amount});
   save();renderAll();openLoanAllocation(id);
 };
 if(!dialog.open)dialog.showModal();
}

function renderRentals(){
 document.querySelector("#rentals").innerHTML=`<div class="section-head"><div><h2>Quản lý cho thuê</h2><p>V2 đã chuẩn bị cấu trúc NOI theo từng property.</p></div></div>
 <div class="card empty">Chưa import được lịch sử doanh thu thuê từ workbook. Giao dịch Thu nhập/Chi phí có thể được thêm ngay từ nút “Thêm giao dịch”.</div>`;
}

function renderSales(){
 document.querySelector("#sales").innerHTML=`
 <div class="kpi-grid">${kpi("Lợi nhuận đã thực hiện",shortMoney(realizedProfit()),"Lợi nhuận từ dữ liệu gốc")}${kpi("Số tài sản đã bán",state.sales.length,"Tài sản đã ghi nhận bán")}</div>
 <div class="section"><div class="table-wrap"><table><thead><tr><th>Bất động sản</th><th class="money">Giá vốn</th><th class="money">Giá bán</th><th class="money">Lợi nhuận</th><th class="money">ROI</th></tr></thead><tbody>
 ${state.sales.map(s=>`<tr class="click-row" data-property="${s.propertyId}"><td><strong>${s.property}</strong></td><td class="money">${money(s.cost)}</td><td class="money">${money(s.price)}</td><td class="money">${money(s.profit)}</td><td class="money">${(s.profit/s.cost*100).toFixed(1)}%</td></tr>`).join("")}
 </tbody></table></div></div>`;
 bindPropertyRows();
}

function renderReports(){
 const moLuaProps=state.properties.filter(p=>["mo-lua-1","mo-lua-moi"].includes(p.id));
 const moLuaTotal=moLuaProps.reduce((n,p)=>n+Number(p.paid||0),0);
 const operationsSummary=`<div class="section"><div class="section-head"><div><h2>Nhóm Mô Lúa và chi phí vận hành</h2><p>Mô Lúa gồm Mô Lúa 1, Mô Lúa 2 và Mô Lúa 3. Các lô chưa xác định rõ giá trị được để chờ đối chiếu.</p></div></div><div class="breakdown card" style="padding:18px">
 <div class="breakdown-row"><span>Mô Lúa – phần đã xác định (Mô Lúa 1 + Mô Lúa mới)</span><strong>${money(moLuaTotal)}</strong></div>
 <div class="breakdown-row"><span>Nương Ôm – giá trị ghi nhận</span><strong>${money(state.properties.find(p=>p.id==="nuong-om")?.paid||0)}</strong></div>
 <div class="breakdown-row"><span>Lương nhân viên – tổng theo bảng đối chiếu</span><strong>${money(289550000)}</strong></div>
 </div></div>`;

 const activeCost=activeProps().reduce((s,p)=>s+costBasis(p),0);
 const categories={};
 activeProps().forEach(p=>Object.entries(p.breakdown||{}).forEach(([k,v])=>categories[k]=(categories[k]||0)+Number(v||0)));
 document.querySelector("#reports").innerHTML=operationsSummary+`
 <div class="two-col">
  <div class="card chart-card"><h2>Cơ cấu giá vốn</h2><p>Phân loại chi phí của các bất động sản đang sở hữu.</p>${Object.entries(categories).sort((a,b)=>b[1]-a[1]).map(([k,v])=>barRow(vn(k),v,activeCost)).join("")}</div>
  <div class="card chart-card"><h2>Tổng quan quản trị</h2><p>Những số cần tách riêng</p>
   <div class="breakdown"><div class="breakdown-row"><span>Vốn chủ đầu tư</span><strong>Vốn chủ sở hữu</strong></div><div class="breakdown-row"><span>Vay ngân hàng / cá nhân</span><strong>Nợ vay</strong></div><div class="breakdown-row"><span>Thu nhập cho thuê − chi phí vận hành</span><strong>NOI</strong></div><div class="breakdown-row"><span>Doanh thu bán − tổng giá vốn</span><strong>Lợi nhuận ròng</strong></div></div>
  </div>
 </div>`;
}

// Bảng chi tiết chỉ dùng để đối chiếu, không tự cộng lại vào giá vốn đã tổng hợp.
const moSenLedger=[{"date":"2025-04-27","description":"Millan chuyển khoản đặt cọc nhà Mô Sen","amount":300000000,"category":"Đất"},{"date":"2025-05-16","description":"Tú chuyển khoản đặt cọc nhà Mô Sen","amount":1100000000,"category":"Đất"},{"date":"2025-05-16","description":"Millan chuyển khoản đặt cọc nhà Mô Sen","amount":2040000000,"category":"Đất"},{"date":"2025-05-16","description":"Milan chuyển khoảnTiền đóng thuế nhà Mô sen khi sang tên","amount":3600000,"category":"Pháp lý"},{"date":"2025-07-03","description":"Millan ck thêm thuế phí cho Mô Sen (khi lấy sổ đỏ thì thuế phát sinh)","amount":1150000,"category":"Pháp lý"},{"date":"2025-07-08","description":"Milan chuyển khoản để thanh toán tiền làm cổng và hàng rào","amount":10000000,"category":"Xây dựng"},{"date":"2025-09-08","description":"Millan chuyển khoản làm Mô Sen anh Thanh","amount":50000000,"category":"Anh Thanh"},{"date":"2025-09-24","description":"Chuyển khoản tiền xây dựng Mô Sen","amount":50000000,"category":"Anh Thanh"},{"date":"2025-10-03","description":"Mô Sen chuyển khoản người sáng tạo","amount":10000000,"category":"Xây dựng"},{"date":"2025-10-03","description":"Mô Sen chuyển tiền xây dựng","amount":50000000,"category":"Anh Thanh"},{"date":"2025-10-07","description":"Các nhà Mô chuyển tiền xây dựng anh Thanh","amount":5000000,"category":"Anh Thanh"},{"date":"2025-10-17","description":"Các nhà Mô chuyển khoản tiền Xây dựng  anh Thanh","amount":50000000,"category":"Anh Thanh"},{"date":"2025-11-20","description":"Chi phí làm số mới Mô Sen","amount":614765,"category":"Pháp lý"},{"date":"2025-12-11","description":"Chuyển khoản tiền xây dựng Mô Sen","amount":50000000,"category":"Anh Thanh"},{"date":"2026-01-16","description":"Chuyển khoản tiền xây dựng Mô Sen","amount":100000000,"category":"Anh Thanh"},{"date":"2025-01-02","description":"Chuyển khoản tiền xây dựng Mô Sen","amount":80000000,"category":"Anh Thanh"},{"date":"2026-03-10","description":"Chuyển khoản tiền xây dựng Mô Sen","amount":100000000,"category":"Anh Thanh"},{"date":"2026-03-18","description":"Mô Sen chuyển tiền gỗ","amount":30000000,"category":"Gỗ"},{"date":"2026-03-23","description":"Mô Sen chuyển khoản tiền gỗ","amount":20000000,"category":"Gỗ"},{"date":"2026-03-28","description":"Mô Sen chuyển khoản tiền gỗ","amount":20000000,"category":"Gỗ"},{"date":"2026-03-29","description":"Mô Sen chuyển khoản tạm ứng sơn nhà","amount":20000000,"category":"Xây dựng"},{"date":"2026-01-04","description":"Chuyển khoản anh Thanh xây dựng","amount":100000000,"category":"Anh Thanh"},{"date":"2026-04-08","description":"Mô Sen chuyển khoản tiền sofa","amount":6897000,"category":"Xây dựng"},{"date":"2026-04-26","description":"Mô Sen chuyển khoản cửa kính","amount":10000000,"category":"Xây dựng"},{"date":"2026-04-30","description":"Mô Sen chuyển khoản lần 2 sơn","amount":20000000,"category":"Xây dựng"},{"date":"2026-05-08","description":"Mô Sen chuyển khoản","amount":3000000,"category":"Xây dựng"},{"date":"2026-05-08","description":"Mô Sen chuyển khoản hồ bơi","amount":20000000,"category":"Xây dựng"},{"date":"2026-05-09","description":"Mô Sen chuyển khoản thiết bị vệ sinh","amount":10000000,"category":"Xây dựng"},{"date":"2026-05-09","description":"Mô Sen chuyển khoản","amount":560000,"category":"Xây dựng"},{"date":"2026-05-12","description":"Mô Sen chuyển khoản rèm","amount":10000000,"category":"Xây dựng"},{"date":"2026-05-12","description":"Mô Sen chuyển khoản sofa","amount":6890000,"category":"Xây dựng"},{"date":"2026-05-12","description":"Mô Sen chuyển khoản","amount":228000,"category":"Xây dựng"},{"date":"2026-05-13","description":"Mô Sen chuyển khoản","amount":1003870,"category":"Xây dựng"},{"date":"2026-05-13","description":"Mô Sen chuyển khoản sinh nhật Bụt","amount":1000000,"category":"Xây dựng"},{"date":"2026-05-13","description":"Mô Sen chuyển khoản cửa","amount":15000000,"category":"Xây dựng"},{"date":"2026-05-14","description":"Mô Sen chuyển khoản","amount":884000,"category":"Xây dựng"},{"date":"2026-05-16","description":"Mô Sen chuyển khoản gỗ Tuấn","amount":30000000,"category":"Gỗ"},{"date":"2026-05-16","description":"Mô Sen chuyển khoản","amount":682000,"category":"Xây dựng"},{"date":"2026-05-16","description":"Mô Sen chuyển khoản ứng nguyên vật liệu điện","amount":10000000,"category":"Xây dựng"},{"date":"2026-05-17","description":"Mời anh Tuấn Ăn trưa","amount":1000000,"category":"Xây dựng"},{"date":"2026-05-17","description":"Mời anh Linh Ăn trưa","amount":500000,"category":"Xây dựng"},{"date":"2026-05-18","description":"Chuyển tiền vận chuyển ghế sofa","amount":1000000,"category":"Xây dựng"},{"date":"2026-05-18","description":"Mời cafe anh Thanh","amount":500000,"category":"Anh Thanh"},{"date":"2026-05-18","description":"Mô Sen thanh toán nguyên liệu điện hết","amount":13000000,"category":"Xây dựng"},{"date":"2026-05-19","description":"Mô Sen chuyển khoản nệm","amount":7000000,"category":"Xây dựng"},{"date":"2026-05-19","description":"Mô Sen chuyển khoản cửa kính lần 2","amount":10000000,"category":"Xây dựng"},{"date":"2026-05-21","description":"Mô Sen chuyển khoản thiết bị vệ sinh","amount":15000000,"category":"Xây dựng"},{"date":"2026-05-22","description":"Mô Sen mời anh Vàng cơm trưa","amount":500000,"category":"Xây dựng"},{"date":"2026-05-22","description":"Mô Sen chuyển khoản khóa","amount":950000,"category":"Xây dựng"},{"date":"2026-05-22","description":"Mô Sen chuyển khoản thạch cao máy hút mùi","amount":750000,"category":"Xây dựng"},{"date":"2026-05-24","description":"Mô Sen chuyển khoản điện","amount":1250000,"category":"Xây dựng"},{"date":"2026-05-25","description":"Mô Sen mời cà phê anh Hậu","amount":500000,"category":"Xây dựng"},{"date":"2026-05-25","description":"Mô Sen mời cà phê anh Tuấn","amount":500000,"category":"Xây dựng"},{"date":"2026-05-26","description":"Mô Sen thanh toán đá mài bếp và lavobo","amount":8000000,"category":"Xây dựng"},{"date":"2026-05-26","description":"Mô Sen chuyển khoản","amount":647000,"category":"Xây dựng"},{"date":"2026-05-26","description":"Mô Sen chuyển khoản","amount":100000,"category":"Xây dựng"},{"date":"2026-05-27","description":"Mô Sen chuyển khoản Shopee","amount":4969000,"category":"Xây dựng"},{"date":"2026-05-27","description":"Mô Sen chuyển khoản ga gối","amount":3800000,"category":"Xây dựng"},{"date":"2026-05-27","description":"Mô Sen chuyển khoản","amount":2892000,"category":"Xây dựng"},{"date":"2026-05-27","description":"Mô Sen chuyển khoản Shopee","amount":1369000,"category":"Xây dựng"},{"date":"2026-05-28","description":"Mô Sen chuyển khoản tạm ứng cây","amount":10000000,"category":"Xây dựng"},{"date":"2026-05-28","description":"Mô Sen chuyển khoản Shopee","amount":558000,"category":"Xây dựng"},{"date":"2026-05-29","description":"Mô Sen chuyển khoản","amount":4560000,"category":"Xây dựng"},{"date":"2026-05-29","description":"Mô Sen chuyển khoản","amount":3750000,"category":"Xây dựng"},{"date":"2026-05-30","description":"Mô Sen chuyển khoản","amount":383000,"category":"Xây dựng"},{"date":"2026-05-30","description":"Mô Sen chuyển khoản","amount":1500000,"category":"Xây dựng"},{"date":"2026-05-30","description":"Mô Sen chuyển khoản bồi dưỡng anh Tuấn làm chủ nhật","amount":1000000,"category":"Xây dựng"},{"date":"2026-05-30","description":"Mô Sen chuyển khoản tiền cây sa kê","amount":2800000,"category":"Xây dựng"},{"date":"2026-05-31","description":"Mô Sen chuyển khoản","amount":1138000,"category":"Xây dựng"},{"date":"2026-06-01","description":"Mô Sen chuyển khoản","amount":248000,"category":"Xây dựng"},{"date":"2026-06-02","description":"Mô Sen chuyển khoản thiết bị","amount":8559000,"category":"Xây dựng"},{"date":"2026-06-02","description":"Mô Sen chuyển khoản","amount":1954000,"category":"Xây dựng"},{"date":"2026-06-03","description":"Mô Sen chuyển khoản","amount":600000,"category":"Xây dựng"},{"date":"2026-06-03","description":"Mô Sen chuyển khoản máy giặt","amount":12020000,"category":"Xây dựng"},{"date":"2026-06-03","description":"Mô Sen chuyển khoản","amount":1646000,"category":"Xây dựng"},{"date":"2026-06-05","description":"Mô Sen chuyển khoản","amount":568000,"category":"Xây dựng"},{"date":"2026-06-05","description":"Mô Sen chuyển khoản tiền cơ khí","amount":6000000,"category":"Xây dựng"},{"date":"2026-06-05","description":"Mô Sen, Sông Biển gửi Bội","amount":3000000,"category":"Xây dựng"},{"date":"2026-06-07","description":"Mô Sen chuyển khoản","amount":682000,"category":"Xây dựng"},{"date":"2026-06-08","description":"Mô Sen chuyển khoản","amount":800000,"category":"Xây dựng"},{"date":"2026-06-10","description":"Mô Sen chuyển khoản","amount":1196000,"category":"Xây dựng"},{"date":"2026-06-11","description":"Mô Sen chuyển khoản","amount":476400,"category":"Xây dựng"},{"date":"2026-06-14","description":"Mô Sen chuyển khoản","amount":730000,"category":"Xây dựng"},{"date":"2026-06-15","description":"Mô Sen chuyển khoản","amount":798000,"category":"Xây dựng"},{"date":"2026-06-20","description":"Mô Sen chuyển khoản","amount":1000000,"category":"Xây dựng"},{"date":"2026-06-21","description":"Mô Sen chuyển khoản","amount":920000,"category":"Xây dựng"},{"date":"2026-06-24","description":"Mô Sen chuyển khoản","amount":171000,"category":"Xây dựng"},{"date":"2026-06-24","description":"Mô Sen chuyển khoản","amount":495000,"category":"Xây dựng"},{"date":"2026-06-26","description":"Mô Sen chuyển khoản","amount":191000,"category":"Xây dựng"},{"date":"2026-06-26","description":"Mô Sen chuyển khoản","amount":240000,"category":"Xây dựng"},{"date":"2026-06-27","description":"Mô Sen chuyển khoản","amount":155000,"category":"Xây dựng"},{"date":"2026-06-29","description":"Mô Sen chuyển khoản","amount":150000,"category":"Xây dựng"},{"date":"2026-07-02","description":"Mô Sen chuyển khoản","amount":2481000,"category":"Xây dựng"},{"date":"2026-07-02","description":"Mô Sen thanh toán nốt ga gối nệm","amount":6130000,"category":"Xây dựng"},{"date":"2026-07-03","description":"Mô Sen chuyển khoản","amount":294000,"category":"Xây dựng"},{"date":"2026-07-05","description":"Mô Sen chuyển khoản","amount":4000000,"category":"Xây dựng"},{"date":"2026-07-08","description":"Mô Sen chuyển khoản tiền sơn tường","amount":22754000,"category":"Xây dựng"},{"date":"2026-07-08","description":"Mô Sen chuyển khoản tiền cửa nhựa","amount":12700000,"category":"Xây dựng"},{"date":"2026-07-08","description":"Mô Sen chuyển khoản tiền điều hòa","amount":33920000,"category":"Xây dựng"},{"date":"2026-07-08","description":"Mô Sen chuyển khoản tiền rèm","amount":20000000,"category":"Xây dựng"},{"date":"2026-07-08","description":"Mô Sen chuyển khoản PCCC","amount":20000000,"category":"Xây dựng"},{"date":"2026-07-14","description":"Mô Sen thanh toán hết bể bơi","amount":18250000,"category":"Xây dựng"},{"date":"2026-07-14","description":"Mô Sen thanh toán tiền kính hết","amount":18000000,"category":"Xây dựng"},{"date":"2026-07-14","description":"Mô Sen thanh toán tiền cơ khí hết","amount":5162000,"category":"Xây dựng"},{"date":"2026-07-08","description":"Mô Sen thanh toán hết thiết bị vệ sinh","amount":14990000,"category":"Xây dựng"},{"date":"2026-08-20","description":"Chuyển khoản smart tools","amount":22350000,"category":"Xây dựng"},{"date":"2026-08-22","description":"Chuyển khoản tiền rèm","amount":11740000,"category":"Xây dựng"},{"date":"2026-08-27","description":"Chi phí đưa nhà vào so nha Mô Sen","amount":1000000,"category":"Pháp lý"},{"date":"2026-08-31","description":"Mô Sen chuyển khoản lọc nước","amount":3500000,"category":"Xây dựng"},{"date":"2026-09-04","description":"Các nhà chuyển khoản anh Thanh","amount":50000000,"category":"Anh Thanh"},{"date":"2026-09-17","description":"Làm sổ + đóng thuế đưa nhà vào sổ nhà Sen","amount":6485674,"category":"Pháp lý"},{"date":"2026-10-02","description":"Làm sổ + đóng thuế đưa nhà vào sổ nhà Sen","amount":1021930,"category":"Pháp lý"}];
function propertyLedgerRows(p){
 const source=p.id==="mo-sen"?moSenLedger:[];
 const existing=state.transactions.filter(t=>t.property===p.id);
 const makeKey=t=>[String(t.date||""),Number(t.amount||0),String(t.description||"").toLocaleLowerCase("vi").replace(/\\s+/g," ").trim()].join("|");
 const sourceKeys=new Set(source.map(makeKey));
 const extras=existing.filter(t=>!sourceKeys.has(makeKey(t))).map(t=>({date:t.date,description:t.description,amount:t.amount,category:vn(t.category),source:"Ứng dụng"}));
 return [...source.map(t=>({...t,source:"Bảng chi tiết"})),...extras].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
}
function renderPropertyLedger(p){
 const rows=propertyLedgerRows(p),sourceCount=p.id==="mo-sen"?moSenLedger.length:0;
 const heading=`<div class="section-head"><div><h2>Lịch sử thu chi chi tiết</h2><p>${sourceCount?"Đã đối chiếu từ bảng chi tiết Mô Sen.": "Các giao dịch đã ghi nhận trong ứng dụng."} Các khoản này đã nằm trong tổng hợp nếu có trong giá vốn; không cộng thêm lần nữa.</p></div></div>`;
 const items=rows.length?`<div class="table-wrap"><table><thead><tr><th>Ngày</th><th>Nội dung</th><th>Phân loại</th><th>Nguồn</th><th class="money">Số tiền</th></tr></thead><tbody>${rows.map(t=>`<tr><td>${escapeHtml(t.date)}</td><td>${escapeHtml(t.description)}</td><td>${escapeHtml(vn(t.category))}</td><td>${escapeHtml(t.source)}</td><td class="money">${money(t.amount)}</td></tr>`).join("")}</tbody></table></div>`:`<div class="empty">Chưa có bảng chi tiết cho tài sản này. Bạn có thể thêm giao dịch hoặc cung cấp bảng chi phí.</div>`;
 return `<div class="section property-ledger">${heading}<div class="tx-totals"><span><strong>${rows.length}</strong> dòng chi tiết</span><span>Giá trị các dòng (để đối chiếu): <strong>${money(rows.reduce((n,t)=>n+Number(t.amount||0),0))}</strong></span></div>${items}</div>`;
}
function openProperty(id){
 const p=state.properties.find(x=>x.id===id); if(!p)return;
 const sale=state.sales.find(s=>s.propertyId===id);
 const basis=costBasis(p);
 const detail=document.querySelector("#propertyDetail");
 detail.innerHTML=`
 <div class="property-head"><div><p class="eyebrow">BẤT ĐỘNG SẢN</p><h2>${p.name}</h2><div class="property-meta"><span class="badge ${statusClass(p.status)}">${vn(p.status)}</span><span>${vn(p.type)}</span><span>·</span><span>${p.location}</span><span>·</span><span>${p.description||""}</span></div></div><button class="icon-btn" id="closeProperty">×</button></div>
 <div class="property-body">
  <div class="detail-grid">
   <div class="mini-card"><span>Giá mua / Đất</span><strong>${money(p.purchase)}</strong></div>
   <div class="mini-card"><span>Đã thanh toán</span><strong>${money(p.paid)}</strong></div>
   <div class="mini-card"><span>Còn phải trả</span><strong>${money(p.outstanding)}</strong></div>
   <div class="mini-card"><span>Tổng giá vốn</span><strong>${money(basis)}</strong></div>
  </div>
  <div class="section"><div class="section-head"><div><h2>Chi tiết chi phí</h2><p>Phân loại chi phí từ bảng tính.</p></div></div>
   <div class="breakdown">${Object.entries(p.breakdown||{}).map(([k,v])=>`<div class="breakdown-row"><span>${vn(k)}</span><strong>${money(v)}</strong></div>`).join("")||'<div class="empty">Chưa có chi tiết</div>'}</div>
  </div>
  ${sale?`<div class="calc"><h3>Kết quả bán tài sản</h3><p>Tài sản đã bán.</p><div class="calc-result"><div class="result-box"><span>Giá bán</span><strong>${money(sale.price)}</strong></div><div class="result-box"><span>Giá vốn</span><strong>${money(sale.cost)}</strong></div><div class="result-box"><span>Lợi nhuận</span><strong>${money(sale.profit)}</strong></div><div class="result-box"><span>ROI</span><strong>${(sale.profit/sale.cost*100).toFixed(1)}%</strong></div></div></div>`:
  `<div class="calc"><h3>Nếu bán hôm nay thì sao?</h3><p>Nhập giá bán dự kiến và chi phí bán để xem tiền thực nhận và lợi nhuận.</p>
   <div class="calc-grid">
    <label>Giá bán dự kiến<input id="salePrice" type="number" step="1000000" value="${p.market||basis}"></label>
    <label>Chi phí bán (%)<input id="sellingPct" type="number" step="0.1" value="2"></label>
    <label>Tất toán khoản vay<input id="loanPayoff" type="number" step="1000000" value="${propertyLoanBalance(p.id)}"></label>
    <label>Lợi nhuận thuê lũy kế<input id="rentalProfit" type="number" step="1000000" value="${p.rentalProfit||0}"></label>
   </div>
   <p style="margin-top:10px">Số tiền tất toán mặc định bằng dư nợ đã phân bổ. Cần đối chiếu số tiền tất toán thực tế; điều chỉnh ở đây không thay đổi hồ sơ khoản vay.</p><div class="calc-result" id="calcResult"></div>
  </div>`}
  ${renderPropertyLedger(p)}
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
 <div class="result-box"><span>Chi phí bán</span><strong>${money(sellingCosts)}</strong></div>
 <div class="result-box"><span>Tiền còn lại sau trả nợ</span><strong>${money(cashAfterDebt)}</strong></div>
 <div class="result-box"><span>Lợi nhuận dự kiến</span><strong>${money(profit)}</strong></div>
 <div class="result-box"><span>Tỷ suất lợi nhuận trên giá vốn</span><strong>${basis?(profit/basis*100).toFixed(1):"0.0"}%</strong></div>`;
}

function bindPropertyRows(){
 document.querySelectorAll("[data-property]").forEach(el=>el.onclick=e=>{e.stopPropagation();openProperty(el.dataset.property)});
}

function renderAll(){renderProperties();renderTransactions();renderLoans();renderRentals();renderSales();renderReports()}
renderAll();

document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".nav-item,.view").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active");document.querySelector("#"+btn.dataset.view).classList.add("active");document.querySelector("#pageTitle").textContent=btn.textContent;
}));

const dialog=document.querySelector("#transactionDialog");
document.querySelector("#addTransactionBtn").onclick=()=>{
 const sel=document.querySelector("#txProperty");
 sel.innerHTML='<option value="general">Chi phí chung / Danh mục</option>'+state.properties.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
 document.querySelector("#txDate").value=new Date().toISOString().slice(0,10);dialog.showModal();
};
document.querySelector("#transactionForm").addEventListener("submit",e=>{
 if(e.submitter?.value==="cancel")return;
 e.preventDefault();
 state.transactions.push({id:Date.now(),date:txDate.value,property:txProperty.value,type:txType.value,category:txCategory.value.trim(),description:txDescription.value.trim(),amount:Number(txAmount.value),source:txSource.value.trim()});
 save();renderAll();dialog.close();e.target.reset();
});
