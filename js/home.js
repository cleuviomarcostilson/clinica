const SERVICES = [
  { nome: 'Consulta de Optometria', descricao: 'Avaliação completa da refração e saúde visual.', preco: 5000 },
  { nome: 'Exame de Vista', descricao: 'Medição precisa da capacidade de visão de longe e de perto.', preco: 3000 },
  { nome: 'Adaptação de Lentes', descricao: 'Ajuste personalizado de lentes de contacto.', preco: 4500 },
  { nome: 'Consulta Pediátrica', descricao: 'Cuidados visuais especializados para crianças.', preco: 4200 }
];

const PRODUCTS = [
  { nome: 'Óculos Ray-Ban Classic', descricao: 'Armação clássica em acetato com proteção UV400.', preco: 45000, imagem_url: 'https://images.unsplash.com/photo-1511499767150-a4d1f42523f7?w=400' },
  { nome: 'Lentes Anti-Reflexo', descricao: 'Lentes de alta qualidade com tratamento anti-reflexo.', preco: 25000, imagem_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400' },
  { nome: 'Óculos de Sol Polarizados', descricao: 'Proteção total contra raios UV com lentes polarizadas.', preco: 35000, imagem_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400' },
  { nome: 'Armação Titanium Ultraleve', descricao: 'Armação super leve com acabamento premium.', preco: 62000, imagem_url: 'https://images.unsplash.com/photo-1526656892012-7b336603ed46?w=400' }
];

function loadHomeData() {
  const servicosEl = document.getElementById('servicosDestaque');
  const produtosEl = document.getElementById('produtosDestaque');
  if (!servicosEl || !produtosEl) return;

  const servicos = SERVICES.slice(0, 3);
  const produtos = PRODUCTS.slice(0, 4);

  servicosEl.innerHTML = servicos.map((s) => `
    <article class="servico-card">
      <div class="servico-card-icon"><i class="fas fa-stethoscope"></i></div>
      <h3>${s.nome}</h3>
      <p>${s.descricao}</p>
      <div class="servico-preco">${formatAOA(s.preco)}</div>
    </article>
  `).join('');

  produtosEl.innerHTML = produtos.map((p) => `
    <article class="produto-card">
      <div class="produto-img">
        ${p.imagem_url ? `<img src="${p.imagem_url}" alt="${p.nome}"/>` : `<div class="produto-img-placeholder"><i class="fas fa-glasses"></i></div>`}
      </div>
      <div class="produto-body">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <div class="produto-preco">${formatAOA(p.preco)}</div>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadHomeData);