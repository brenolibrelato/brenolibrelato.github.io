// Troca de abas: mostra o painel correspondente e esconde os outros,
// sem recarregar ou rolar a página.
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const tabLinks = document.querySelectorAll('[data-tab-link]');

function activateTab(tabName) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabName);
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

// Botões dentro dos painéis que também navegam para outra aba
// (ex: "Ver projetos" na Home leva para a aba Projetos)
tabLinks.forEach((link) => {
  link.addEventListener('click', () => activateTab(link.dataset.tabLink));
});

// Atualiza o ano no rodapé automaticamente
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// CAMPO DE TECLAS: espalha teclas de teclado aleatoriamente
// pela coluna da direita e "pressiona" uma a cada 1,5s.
// =========================================================
const KEYS = [
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M',
  '1', '2', '3', 'Enter',
  '+', '-', '<', '>', '|', '\\', '{', '}', '(', ')', '[', ']', '=', ';', ':', '_',
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildKeysField() {
  const field = document.getElementById('keysField');
  if (!field) return [];

  // Divide a área em uma grade "invisível" e depois embaralha tanto a
  // ordem das teclas quanto as células, aplicando um deslocamento
  // aleatório (jitter) e uma rotação aleatória em cada uma — o
  // resultado visual não segue nenhuma grade ou padrão perceptível.
  const cols = 5;
  const rows = 10;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ col: c, row: r });
    }
  }

  const shuffledCells = shuffle(cells);
  const keyElements = [];

  KEYS.forEach((label, i) => {
    const cell = shuffledCells[i];
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    const jitterX = (Math.random() - 0.5) * cellWidth * 0.7;
    const jitterY = (Math.random() - 0.5) * cellHeight * 0.7;

    const left = (cell.col + 0.5) * cellWidth + jitterX;
    const top = (cell.row + 0.5) * cellHeight + jitterY;
    const rotation = (Math.random() - 0.5) * 40; // -20deg a 20deg

    const keyEl = document.createElement('div');
    keyEl.className = 'key' + (label.length > 1 ? ' wide' : '');
    keyEl.textContent = label;
    keyEl.style.left = `${left}%`;
    keyEl.style.top = `${top}%`;

    const baseTransform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    keyEl.dataset.baseTransform = baseTransform;
    keyEl.style.transform = baseTransform;

    field.appendChild(keyEl);
    keyElements.push(keyEl);
  });

  return keyElements;
}

function pressRandomKey(keyElements) {
  if (!keyElements.length) return;
  const keyEl = keyElements[Math.floor(Math.random() * keyElements.length)];

  keyEl.classList.add('pressed');
  keyEl.style.transform = `${keyEl.dataset.baseTransform} scale(0.88)`;

  setTimeout(() => {
    keyEl.classList.remove('pressed');
    keyEl.style.transform = keyEl.dataset.baseTransform;
  }, 180);
}

const keyElements = buildKeysField();
setInterval(() => pressRandomKey(keyElements), 1500);
