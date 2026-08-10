const defaults = {
  services: [
    {
      title: "VAT & Tax Consultancy",
      text: "VAT registration, monthly returns, corporate tax planning and compliance support.",
      icon: "▤",
    },
    {
      title: "Accounts & Audit Support",
      text: "Accurate accounts preparation, financial statements and audit assistance.",
      icon: "◈",
    },
    {
      title: "Company Registration",
      text: "RJSC registration, annual returns and company compliance services.",
      icon: "▣",
    },
    {
      title: "ERP Solutions",
      text: "Professional websites, domains, hosting and business automation.",
      icon: "⌘",
    },
  ],
  courses: [
    {
      title: "Corporate Taxation",
      text: "Practical tax planning, returns, TDS and VDS for professionals.",
    },
    {
      title: "ERP, Accounting & Excel",
      text: "Hands-on training in software, reports and financial workflows.",
    },
    {
      title: "Corporate Training",
      text: "Custom programmes for finance, HR and operations teams.",
    },
  ],
};
function data(key) {
  return JSON.parse(
    localStorage.getItem("vertex_" + key) || JSON.stringify(defaults[key]),
  );
}
function save(key, value) {
  localStorage.setItem("vertex_" + key, JSON.stringify(value));
}
function renderCards(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = data(key)
    .map(
      (x, i) =>
        `<article class="card"><div class="icon">${x.icon || "◉"}</div><h3>${x.title}</h3><p>${x.text}</p><a href="contact.html">Ask about this service →</a></article>`,
    )
    .join("");
}
function renderList(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = data("services")
    .map(
      (x, i) =>
        `<article class="list-row"><small>0${i + 1}/</small><h3>${x.title}</h3><p>${x.text}</p><a href="contact.html">↗</a></article>`,
    )
    .join("");
}
function renderCourses(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = data("courses")
    .map(
      (x) =>
        `<article class="card"><div class="icon">◎</div><h3>${x.title}</h3><p>${x.text}</p><a href="contact.html">Ask about training →</a></article>`,
    )
    .join("");
}
function nav() {
  const links = document.querySelector(".links");
  if (links && !links.querySelector('[href="useful-links.html"]')) {
    const contact = links.querySelector('[href="contact.html"]');
    const item = document.createElement("a");
    item.href = "useful-links.html";
    item.textContent = "Useful Links";
    contact ? links.insertBefore(item, contact) : links.appendChild(item);
  }
  document
    .querySelector(".mobile-toggle")
    ?.addEventListener("click", () =>
      document.querySelector(".links").classList.toggle("open"),
    );
}
function login() {
  const form = document.getElementById("loginForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("user").value,
      p = document.getElementById("pass").value;
    if (u === "demo@vertex.com" && p === "demo123") {
      localStorage.setItem("vertex_demo", "yes");
      location.href = "demo-dashboard.html";
    } else
      document.getElementById("loginError").textContent =
        "Incorrect demo user ID or password.";
  });
}
function guard() {
  if (localStorage.getItem("vertex_demo") !== "yes")
    location.href = "https://bangladesh.manager.io/businesses";
  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("vertex_demo");
    location.href = "https://bangladesh.manager.io/businesses";
  });
}
function admin() {
  const sf = document.getElementById("serviceForm"),
    cf = document.getElementById("courseForm");
  if (!sf) return;
  const show = () => {
    const list = (key, id) =>
      (document.getElementById(id).innerHTML = data(key)
        .map(
          (x, i) =>
            `<div class="admin-item"><span>${x.title}</span><button class="delete" onclick="removeItem('${key}',${i})">Delete</button></div>`,
        )
        .join(""));
    list("services", "serviceItems");
    list("courses", "courseItems");
  };
  sf.addEventListener("submit", (e) => {
    e.preventDefault();
    let a = data("services");
    a.push({ title: sf.title.value, text: sf.text.value, icon: "◉" });
    save("services", a);
    sf.reset();
    document.getElementById("saved").classList.add("show");
    show();
  });
  cf.addEventListener("submit", (e) => {
    e.preventDefault();
    let a = data("courses");
    a.push({ title: cf.title.value, text: cf.text.value });
    save("courses", a);
    cf.reset();
    document.getElementById("saved").classList.add("show");
    show();
  });
  show();
}
function removeItem(key, i) {
  let a = data(key);
  a.splice(i, 1);
  save(key, a);
  admin();
}
function dashboardDemo() {
  const box = document.getElementById("demoContent"),
    menu = document.getElementById("dashMenu");
  if (!box || !menu) return;
  const views = {
    dashboard: {
      title: "Business overview",
      tag: "Good morning, Demo User",
      k: [
        ["Monthly sales", "৳ 1,245,300"],
        ["VAT payable", "৳ 84,200"],
        ["Inventory value", "৳ 2,801,000"],
      ],
      label: "REVENUE PERFORMANCE / LAST 6 MONTHS",
      note: "This is a safe demonstration dashboard. No real company data is stored here.",
    },
    sales: {
      title: "Sales management",
      tag: "Sales / This month",
      k: [
        ["Total sales", "৳ 1,245,300"],
        ["Invoices", "128"],
        ["Due collection", "৳ 192,450"],
      ],
      label: "SALES PERFORMANCE",
      note: "Demo sales list and values for presentation only.",
    },
    purchases: {
      title: "Purchase management",
      tag: "Purchases / This month",
      k: [
        ["Total purchases", "৳ 768,500"],
        ["Purchase orders", "54"],
        ["Bills due", "৳ 86,100"],
      ],
      label: "PURCHASE ACTIVITY",
      note: "Demo purchase information for presentation only.",
    },
    inventory: {
      title: "Inventory overview",
      tag: "Stock / Live status",
      k: [
        ["Stock value", "৳ 2,801,000"],
        ["Low-stock items", "7"],
        ["Active SKUs", "426"],
      ],
      label: "INVENTORY MOVEMENT",
      note: "Demo inventory figures for presentation only.",
    },
    accounts: {
      title: "Accounts & finance",
      tag: "Accounts / Current period",
      k: [
        ["Cash balance", "৳ 523,400"],
        ["Receivables", "৳ 192,450"],
        ["Payables", "৳ 86,100"],
      ],
      label: "CASH FLOW OVERVIEW",
      note: "Demo financial overview for presentation only.",
    },
    vat: {
      title: "VAT & tax centre",
      tag: "VAT / Current return",
      k: [
        ["Output VAT", "৳ 124,300"],
        ["Input VAT", "৳ 40,100"],
        ["VAT payable", "৳ 84,200"],
      ],
      label: "VAT POSITION",
      note: "Use the live system with verified source records before filing.",
    },
    hr: {
      title: "HR & payroll",
      tag: "People / Current month",
      k: [
        ["Employees", "48"],
        ["Payroll amount", "৳ 1,720,000"],
        ["Attendance", "96.4%"],
      ],
      label: "PAYROLL & ATTENDANCE",
      note: "Demo HR information for presentation only.",
    },
    reports: {
      title: "Reports centre",
      tag: "Reports / Ready to export",
      k: [
        ["Financial reports", "12"],
        ["VAT reports", "6"],
        ["Sales reports", "18"],
      ],
      label: "REPORTING ACTIVITY",
      note: "Choose a report category in the live product to export data.",
    },
  };
  const render = (key) => {
    const v = views[key];
    box.innerHTML = `<p class="eyebrow" style="color:#087ea4">${v.tag}</p><h1>${v.title}</h1><div class="dash-kpis">${v.k.map((x, i) => `<div style="border-color:${i === 1 ? "#f4ae31" : i === 2 ? "#3e9f82" : "#087ea4"}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join("")}</div><div class="software-preview" style="margin-top:25px;max-width:760px"><header>${v.label}</header><div class="chart" style="height:240px"></div></div><div class="notice" style="max-width:760px">${v.note}</div>`;
  };
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      menu.querySelectorAll("a").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
      render(a.dataset.view);
    }),
  );
  render("dashboard");
}
document.addEventListener("DOMContentLoaded", () => {
  nav();
  renderCards("homeServices", "services");
  renderList("servicesList");
  renderCourses("homeCourses");
  renderCourses("coursesList");
  login();
  if (document.body.dataset.guard === "demo") guard();
  dashboardDemo();
  admin();
  if (!document.body.dataset.noWhatsapp)
    document.body.insertAdjacentHTML(
      "beforeend",
      '',
    );
});
