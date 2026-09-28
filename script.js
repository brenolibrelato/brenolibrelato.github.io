// Tab switching: shows the matching panel and hides the others,
// without reloading or scrolling the page.
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const tabLinks = document.querySelectorAll('[data-tab-link]');
const panelsContainer = document.querySelector('.tab-panels');

function activateTab(tabName) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabName);
  });
  panelsContainer.scrollTop = 0;
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

// Buttons inside panels that also navigate to another tab
// (e.g. "View projects" on Home jumps to the Projects tab)
tabLinks.forEach((link) => {
  link.addEventListener('click', () => activateTab(link.dataset.tabLink));
});

// Gives each cell of a panel its position (--i), so the CSS can
// reveal the cells one after another when the tab opens.
tabPanels.forEach((panel) => {
  panel.querySelectorAll('.cell').forEach((cell, i) => {
    cell.style.setProperty('--i', i);
  });
});

// Updates the year in the footer automatically
document.getElementById('year').textContent = new Date().getFullYear();
