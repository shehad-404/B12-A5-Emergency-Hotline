// ---------- State ----------
let hearts = 0;
let coins = 100;       // default coin
let copies = 0;

// ---------- Data (at least 6) ----------
const services = [
  { id: 1, icon: "🛡️", name: "জাতীয় জরুরি সেবা", en: "National Emergency Number", number: "999", category: "All" },
  { id: 2, icon: "👮",  name: "পুলিশ হেল্পলাইন",   en: "Police Helpline Number",   number: "999", category: "Police" },
  { id: 3, icon: "🚒",  name: "ফায়ার সার্ভিস",     en: "Fire Service Number",      number: "999", category: "Fire" },
  { id: 4, icon: "🚑",  name: "অ্যাম্বুলেন্স",     en: "Ambulance Service",        number: "1994-999999", category: "Health" },
  { id: 5, icon: "👶",  name: "নারী ও শিশু সহায়তা", en: "Women & Child Helpline",  number: "109", category: "Help" },
  { id: 6, icon: "🏛️", name: "দুর্নীতি দমন",       en: "Anti-Corruption Helpline", number: "106", category: "Govt." },
  { id: 7, icon: "⚡",  name: "বিদ্যুৎ হেল্পলাইন",  en: "Electricity Helpline",     number: "16216", category: "Electricity" },
  { id: 8, icon: "🤝", name: "BRAC হেল্পলাইন",     en: "Brac Helpline",            number: "16445", category: "NGO" },
  { id: 9, icon: "🚆",  name: "রেলওয়ে হেল্পলাইন",  en: "Bangladesh Railway",       number: "163", category: "Travel" },
];

// ---------- DOM refs ----------
const cardsContainer = document.getElementById("cardsContainer");
const heartsCountEl  = document.getElementById("heartsCount");
const coinsCountEl   = document.getElementById("coinsCount");
const copyCountEl    = document.getElementById("copyCount");
const historyList    = document.getElementById("historyList");
const clearBtn       = document.getElementById("clearHistoryBtn");

// ---------- Render Cards ----------
function renderCards() {
  const frag = document.createDocumentFragment();

  services.forEach(svc => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card service-card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div class=" align-items-center gap-2">
              <span class="icon-box  fs-4 ${svc.id === 2 ? 'police-icon' : ''}">${svc.icon}</span>
              <div>
                <h6 class="mb-0">${svc.en}</h6>
                <small class="text-muted">${svc.name}</small>
              </div>
            </div>
            <button class="btn btn-link p-0 text-secondary btn-heart" title="Love it" data-id="${svc.id}">
              <i class="bi bi-heart"></i>
            </button>
          </div>

          <div class="mb-2 fw-bold service-number">${svc.number}</div>
          <span class="badge badge-soft align-self-start">${svc.category}</span>

          <div class="mt-auto pt-3 d-flex gap-2">
            <button class="btn btn-copy btn-sm d-flex align-items-center gap-1 flex-fill"
                    data-number="${svc.number}">
              <i class="bi bi-clipboard"></i> Copy
            </button>
            <button class="btn btn-success btn-sm d-flex align-items-center gap-1 flex-fill btn-call"
                    data-id="${svc.id}">
              <i class="bi bi-telephone"></i> Call
            </button>
          </div>
        </div>
      </div>
    `;

    frag.appendChild(col);
  });

  cardsContainer.appendChild(frag);
}

// ---------- Helper UI updaters ----------
function updateHeaderCounts() {
  heartsCountEl.textContent = hearts;
  coinsCountEl.textContent  = coins;
  copyCountEl.textContent   = copies;
}

function nowTime() {
  // Local time with seconds, e.g., 11:36:58 AM
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function addHistoryItem(name, number) {
  const item = document.createElement("div");
  item.className = "list-group-item list-group-item-action";
  item.innerHTML = `
    <div class="d-flex justify-content-between">
      <div>
        <div class="fw-semibold">${name}</div>
        <div class="text-muted">${number}</div>
      </div>
      <small class="text-muted ms-3">${nowTime()}</small>
    </div>
  `;
  historyList.prepend(item);
}

// ---------- Clipboard (with fallback) ----------
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback (for some insecure origins)
    const temp = document.createElement("input");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(temp);
    return ok;
  }
}

// ---------- Event Handlers ----------
cardsContainer.addEventListener("click", async (e) => {
  const heartBtn = e.target.closest(".btn-heart");
  const callBtn  = e.target.closest(".btn-call");
  const copyBtn  = e.target.closest(".btn-copy");

  // Heart
  if (heartBtn) {
    hearts++;
    heartBtn.innerHTML = `<i class="bi bi-heart-fill text-danger"></i>`;
    updateHeaderCounts();
    return;
  }

  // Call
  if (callBtn) {
    const id = Number(callBtn.dataset.id);
    const svc = services.find(s => s.id === id);
    if (!svc) return;

    if (coins < 20) {
      alert("Not enough coins to place a call. Each call costs 20 coins.");
      return;
    }

    coins -= 20;
    updateHeaderCounts();

    alert(`Calling ${svc.en} (${svc.number})`);
    addHistoryItem(svc.en, svc.number);
    return;
  }

  // Copy
  if (copyBtn) {
    const number = copyBtn.dataset.number;
    const ok = await copyToClipboard(number);
    if (ok) {
      copies++;
      updateHeaderCounts();
      alert(`Copied: ${number}`);
    } else {
      alert("Failed to copy. Please copy manually.");
    }
  }
});

// Clear history
clearBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});

// ---------- Init ----------
renderCards();
updateHeaderCounts();
