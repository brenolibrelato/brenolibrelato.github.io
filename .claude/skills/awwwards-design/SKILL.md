---
name: awwwards-design
description: Padrão de qualidade visual inspirado nos critérios do Awwwards (design, usabilidade, criatividade, conteúdo). Use sempre que criar ou alterar layout, seções, cards, cores, tipografia, animações ou qualquer parte visual do portfólio.
---

# Design nível Awwwards

O Awwwards avalia sites em quatro notas: **Design (40%)**, **Usabilidade (30%)**,
**Criatividade (20%)** e **Conteúdo (10%)**. O prêmio de desenvolvedor olha ainda
semântica, animações, acessibilidade, performance e responsividade. Toda mudança
visual neste site deve melhorar (ou no mínimo não piorar) essas notas.

Use o Awwwards como padrão de qualidade, nunca como fonte para copiar: não
reproduza layouts, textos, imagens ou identidade de sites premiados.

## Restrições deste projeto

- HTML, CSS e JavaScript puros, sem build e sem framework. Publicado no GitHub Pages.
- Cores, fonte e raio sempre pelas variáveis em `:root` no `styles.css`. Nova cor
  vira nova variável; nunca valores soltos no meio do CSS.
- Identidade atual: tema escuro, destaque lima `--color-primary` (#8cb81a, texto escuro `--color-on-primary` sobre ele), fonte Inter,
  navegação por abas sem scroll. Evolua essa identidade; não troque por outra sem o
  Breno pedir.

## Referência: Sincro (sincro.es, indicado no Awwwards)

O layout segue a *estrutura* do Sincro, adaptada ao tema escuro:

- **Grade de linhas finas**: tudo é `.row` (4 colunas iguais) com `.cell` separadas por
  bordas de 1px `--color-line`. Células mais largas com `.span-2` / `.span-3`. Novo
  conteúdo entra como nova linha/célula dessa grade, alinhada às colunas existentes.
- **Um só peso de fonte (400)**: hierarquia só por tamanho (`--fs-display`, `--fs-title`,
  `--fs-lead`, `--fs-body`, `--fs-small`). Nada de negrito.
  Tipos grandes com `letter-spacing` negativo.
- **Blocos sólidos de destaque** (`.cta-block`) em lima, com seta `↗` no canto superior
  direito, para as ações principais.
- Índices pequenos (`.index`: 01, 02…) só na lista de projetos; o Breno não quer
  números nas seções nem faixa de estatísticas na Home.
- Cantos quase retos (`--radius: 2px`).
- Células entram em sequência ao abrir uma aba (animação `rise`, atraso por `--i`).
- Todo texto do site em inglês.

## Design (40%)

- **Hierarquia tipográfica forte**: poucos tamanhos, bem distintos. Títulos grandes
  (peso 400, contraste pelo tamanho), texto de apoio em `--color-text-muted`. Use as
  variáveis `--fs-*`, que já escalam com `clamp()`.
- **Espaço em branco é elemento de design**: prefira espaçamento generoso a encher a tela.
  Use uma escala consistente (ex.: 4, 8, 12, 16, 24, 32, 48, 64px).
- **Grid e alinhamento**: tudo alinhado a um eixo claro; nada "quase alinhado".
- **Cor com contenção**: uma cor de destaque, usada só onde há ação ou ênfase.
- **Detalhes acabados**: estados de hover/focus/active em tudo que é clicável,
  bordas e raios consistentes, sem elementos com aparência padrão do navegador.

## Usabilidade (30%)

- Navegação óbvia: o usuário sempre sabe em que aba está e como voltar.
- Alvos de clique com pelo menos 44×44px no mobile.
- Contraste de texto mínimo 4.5:1 (WCAG AA); cuidado com texto cinza sobre fundo escuro.
- Foco visível no teclado (`:focus-visible`) em botões, abas e links.
- Links externos com `target="_blank"` levam `rel="noopener"`.
- Testar sempre em largura < 900px (breakpoint do projeto) e em ~375px.

## Criatividade (20%)

- Um elemento memorável bem executado vale mais que vários efeitos. Aqui esse papel
  é da tipografia gigante sobre a grade de linhas; novos efeitos devem reforçá-la,
  não competir com ela.
- Microinterações sutis: transições de 150–300ms, easing suave (`ease`, `cubic-bezier`),
  movimento curto (poucos px). Nada que atrase o usuário.
- Respeitar `prefers-reduced-motion`: desligar ou reduzir animações não essenciais.

## Conteúdo (10%)

- Textos curtos, específicos e com números concretos (ex.: "500+ computers").
- Cada projeto: o problema, o que foi feito, a tecnologia, e link real (sem `#`).
- Nada de placeholder publicado; se não está pronto, não aparece.

## Técnica (critérios de desenvolvedor)

- HTML semântico: `nav`, `section`, `article`, `h1`–`h3` em ordem, `button` para ações.
- Animar só `transform` e `opacity` (performance); evitar animar `width`, `top`, `left`.
- Sem dependências externas além da fonte do Google Fonts.
- Imagens com `alt`, dimensões definidas e `loading="lazy"` quando abaixo da dobra.
- Meta tags: `title`, `description` e, se possível, Open Graph para compartilhamento.

## Antes de concluir uma mudança visual

1. Conferir desktop e mobile (< 900px).
2. Navegar só com Tab: todo elemento clicável recebe foco visível?
3. Contraste dos textos novos está OK?
4. Alguma cor, tamanho ou espaçamento fora das variáveis/escala? Corrigir.
5. Dizer ao Breno qual critério (design, usabilidade, criatividade, conteúdo) a mudança melhora.
