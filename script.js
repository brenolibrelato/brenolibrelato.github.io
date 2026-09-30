// Tab switching: shows the matching panel and hides the others,
// without reloading the page. Each tab has its own URL (#projects,
// #about, #contact), so it can be shared, reloaded and reached with
// the browser's Back/Forward buttons. Home lives at the plain URL.
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const panelsContainer = document.querySelector('.tab-panels');
const siteTitle = document.title;

function tabFromHash() {
  const name = location.hash.slice(1);
  return document.querySelector(`.tab-panel[id="${CSS.escape(name)}"]`) ? name : 'home';
}

function activateTab(tabName) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabName);
  });

  // Tab name from the link's own text, leaving out the ↗ arrow span
  const label = document.querySelector(`.tab-btn[data-tab="${tabName}"]`).firstChild.textContent.trim();
  document.title = tabName === 'home' ? siteTitle : `${label} — ${siteTitle}`;

  // Start each tab at the top (the panel area on desktop, the page on mobile)
  panelsContainer.scrollTop = 0;
  window.scrollTo(0, 0);
}

// Any in-page link to a tab (nav, Contact, "View projects") switches tabs
// and adds a history entry instead of jumping to the section.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const tabName = link.getAttribute('href').slice(1);
  if (!document.getElementById(tabName)?.classList.contains('tab-panel')) return;

  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return; // new tab/window
    event.preventDefault();
    if (tabName !== tabFromHash()) {
      history.pushState(null, '', tabName === 'home' ? location.pathname + location.search : `#${tabName}`);
    }
    activateTab(tabName);
  });
});

// Back/Forward buttons and manually edited URLs
window.addEventListener('popstate', () => activateTab(tabFromHash()));

// Gives each cell of a panel its position (--i), so the CSS can
// reveal the cells one after another when the tab opens.
tabPanels.forEach((panel) => {
  panel.querySelectorAll('.cell').forEach((cell, i) => {
    cell.style.setProperty('--i', i);
  });
});

// Opens the tab named in the URL (e.g. a shared link to #projects)
activateTab(tabFromHash());

// The browser jumps to the #section once the page loads, which on mobile
// would scroll the top bar out of view; keep the page at the top instead.
window.addEventListener('load', () => window.scrollTo(0, 0));

// Updates the year in the footer automatically
document.getElementById('year').textContent = new Date().getFullYear();
