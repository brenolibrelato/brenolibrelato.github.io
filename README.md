# Seu Portfólio — Guia Rápido

Este é um site estático simples: só HTML, CSS e um pouco de JavaScript.
Não precisa instalar nada para editar — basta um editor de texto (recomendo
o [VS Code](https://code.visualstudio.com/), gratuito).

## Estrutura dos arquivos

- `index.html` — todo o conteúdo e a estrutura das seções (Home, Projetos, Sobre, Contato)
- `styles.css` — todo o visual (cores, espaçamento, layout)
- `script.js` — o menu mobile e o ano automático no rodapé
- `assets/` — coloque aqui suas imagens, foto de perfil e currículo em PDF

## O que editar primeiro

1. **Busca e substitui no `index.html`**: procure por tudo escrito entre
   colchetes ou em texto de exemplo (como "Seu Nome", "[seu curso]",
   "seuemail@exemplo.com") e troque pelo seu conteúdo real.
2. **Projetos**: cada projeto é um bloco `<article class="project-card">`.
   Já tem 3 prontos (código, acadêmico, design) — edite o texto, troque a
   imagem `src="https://placehold.co/..."` por `assets/nome-da-imagem.jpg`
   depois de colocar sua imagem na pasta `assets/`, e ajuste os links.
   Para adicionar mais projetos, copie e cole um bloco inteiro
   `<article class="project-card">...</article>`.
3. **Foto e currículo**: coloque `foto.jpg` e `curriculo.pdf` dentro de
   `assets/` e ajuste os caminhos no `index.html` (`assets/foto.jpg` e
   `assets/curriculo.pdf`).
4. **Cores**: no topo do `styles.css` existe um bloco `:root` com as
   variáveis de cor (`--color-primary` etc). Mudando ali, a cor muda no
   site inteiro.

## Como ver o site no seu computador

Abra o arquivo `index.html` direto no navegador (duplo clique) para uma
prévia rápida. Para uma experiência mais próxima da real (com recarregamento
automático), instale a extensão **Live Server** no VS Code, clique com o
botão direito em `index.html` e escolha "Open with Live Server".

## Como publicar de graça no GitHub Pages

1. Crie uma conta no [GitHub](https://github.com) se ainda não tiver.
2. Crie um novo repositório (pode se chamar `portfolio` ou
   `seu-usuario.github.io` para ficar num link mais limpo).
3. Suba estes arquivos para o repositório (pelo site do GitHub mesmo, com
   "Add file" → "Upload files", ou via linha de comando com `git`).
4. No repositório, vá em **Settings → Pages**.
5. Em "Source", selecione a branch `main` e a pasta `/root`, depois salve.
6. Em alguns minutos seu site estará no ar em
   `https://seu-usuario.github.io/nome-do-repositorio/`.

## Próximos passos sugeridos

- Trocar as imagens de placeholder por prints e fotos reais.
- Revisar todos os textos de exemplo.
- Testar o site no celular (redimensione a janela do navegador ou acesse
  pelo próprio celular depois de publicado).
- Adicionar o link do site no seu LinkedIn e currículo.
