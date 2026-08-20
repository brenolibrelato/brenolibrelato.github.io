// Menu mobile: abre e fecha a navegação em telas pequenas
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha o menu ao clicar em um link (útil no mobile)
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Atualiza o ano no rodapé automaticamente
document.getElementById('year').textContent = new Date().getFullYear();
