const PRODUCTS = [
  { nome: 'Óculos Ray-Ban Classic', descricao: 'Armação clássica em acetato com proteção UV400.', preco: 45000, imagem_url: 'https://images.unsplash.com/photo-1511499767150-a4d1f42523f7?w=400' },
  { nome: 'Lentes Anti-Reflexo', descricao: 'Lentes de alta qualidade com tratamento anti-reflexo.', preco: 25000, imagem_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400' },
  { nome: 'Óculos de Sol Polarizados', descricao: 'Proteção total contra raios UV com lentes polarizadas.', preco: 35000, imagem_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400' },
  { nome: 'Armação Titanium Ultraleve', descricao: 'Armação super leve com acabamento premium.', preco: 62000, imagem_url: 'https://images.unsplash.com/photo-1526656892012-7b336603ed46?w=400' },
  { nome: 'Lentes Progressivas Premium', descricao: 'Lentes progressivas para visão multifocal com conforto superior.', preco: 55000, imagem_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400' }
];

function renderProdutos(items) {
  const listEl = document.getElementById('produtosLista');
  const noResults = document.getElementById('noResults');
  if (!listEl) return;

  if (!items.length) {
    listEl.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }

  if (noResults) noResults.style.display = 'none';
  listEl.innerHTML = items.map((p) => `
    <article class="produto-item">
      <div class="img">
        ${p.imagem_url ? `<img src="${p.imagem_url}" alt="${p.nome}"/>` : '<i class="fas fa-glasses"></i>'}
      </div>
      <div class="body">
        <h3>${p.nome}</h3>
        <span class="preco">${formatAOA(p.preco)}</span>
      </div>
    </article>
  `).join('');
}

function loadProdutosPage() {
  renderProdutos(PRODUCTS);
}

function bindSearch() {
  const input = document.getElementById('searchProduto');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) =>
      [p.nome, p.descricao].join(' ').toLowerCase().includes(term)
    );
    renderProdutos(filtered);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadProdutosPage();
  bindSearch();
});