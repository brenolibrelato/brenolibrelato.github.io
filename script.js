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

// Home intro: types a phrase letter by letter, erases it with "backspace"
// and types the next one, in a loop. Edit the phrases here.
const typewriterPhrases = [
  'Technology enthusiast, driven by discovery, always learning.',
  'I like understanding how things work, and making them work better.',
  'Curious by default. Always tinkering.',
  'Always one more tab open, one more thing to learn.',
  "I like technology best when it makes someone's day easier.",
  'Building the future, one commit at a time.',
];

const typewriter = document.querySelector('.typewriter');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typewriter && !reduceMotion) {
  const span = (className, text = '') => {
    const el = document.createElement('span');
    el.className = className;
    el.textContent = text;
    return el;
  };

  // Screen readers get one calm sentence instead of letters changing
  const spoken = span('visually-hidden', typewriterPhrases[0]);
  // Invisible copies of every phrase hold the cell at the tallest height
  const sizers = typewriterPhrases.map((phrase) => {
    const sizer = span('typewriter-sizer', phrase);
    sizer.setAttribute('aria-hidden', 'true');
    return sizer;
  });
  const line = span('typewriter-line');
  line.setAttribute('aria-hidden', 'true');
  const text = span('typewriter-text');
  line.append(text, span('typewriter-caret'));

  typewriter.replaceChildren(spoken, ...sizers, line);
  typewriter.classList.add('is-ready');

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // Small random variation so it feels like a person typing
  const jitter = (base) => base + Math.random() * base * 0.8;

  (async () => {
    for (let i = 0; ; i = (i + 1) % typewriterPhrases.length) {
      const phrase = typewriterPhrases[i];

      typewriter.classList.add('is-typing');
      for (let n = 1; n <= phrase.length; n++) {
        text.textContent = phrase.slice(0, n);
        await wait(jitter(45));
      }
      typewriter.classList.remove('is-typing');
      await wait(2200);

      typewriter.classList.add('is-typing');
      for (let n = phrase.length - 1; n >= 0; n--) {
        text.textContent = phrase.slice(0, n);
        await wait(28);
      }
      typewriter.classList.remove('is-typing');
      await wait(500);
    }
  })();
}
