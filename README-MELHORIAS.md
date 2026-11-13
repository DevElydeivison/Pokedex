# Pokédex — versão modernizada

## Novidades
- Layout responsivo, identidade visual escura e cards com animações e cores de tipos.
- Busca instantânea por nome ou número, filtro de tipo e ordenação.
- Detalhes de cada Pokémon com medidas corretas (API: decímetros / 10 = metros; hectogramas / 10 = kg), habilidades e atributos base.
- Comparador de dois Pokémon com seis atributos, total de atributos, altura e peso. Valores superiores ficam destacados.
- Coleção dos 151 Pokémon de Kanto, com paginação visual de 24 cards.

## Como executar
Abra a pasta em um servidor HTTP local (ex.: extensão Live Server do VS Code) e acesse `index.html`. Não é necessário instalar dependências. É preciso conexão com a internet para consultar a PokéAPI e carregar as fontes/imagens.

## Observações
A comparação é de atributos base, não uma simulação de combate. O carregamento consulta a API em lotes; uma conexão lenta pode levar alguns segundos. Os dados de Pokémon são mantidos em cache na sessão.
