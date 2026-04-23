const SERVICES = [
  { nome: 'Consulta de Optometria', descricao: 'Avaliação completa da refração e saúde visual.', preco: 5000 },
  { nome: 'Exame de Vista', descricao: 'Medição precisa da capacidade de visão de longe e de perto.', preco: 3000 },
  { nome: 'Adaptação de Lentes', descricao: 'Ajuste personalizado de lentes de contacto.', preco: 4500 },
  { nome: 'Consulta Pediátrica', descricao: 'Cuidados visuais especializados para crianças.', preco: 4200 }
];

function loadServicosPage() {
  const listEl = document.getElementById('servicosLista');
  if (!listEl) return;

  listEl.innerHTML = SERVICES.map((s) => `
    <article class="servico-item">
      <div class="top">
        <h3>${s.nome}</h3>
        <span class="preco">${formatAOA(s.preco)}</span>
      </div>
      <p>${s.descricao}</p>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadServicosPage);