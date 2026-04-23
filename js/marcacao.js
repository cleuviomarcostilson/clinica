const SERVICES = [
  'Consulta de Optometria',
  'Exame de Vista',
  'Adaptação de Lentes',
  'Consulta Pediátrica'
];

function maskDate(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 4) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  else if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
  input.value = v;
}

function maskPhone(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.startsWith('244')) v = v.slice(3);
  v = v.slice(0, 9);
  const p1 = v.slice(0, 3);
  const p2 = v.slice(3, 6);
  const p3 = v.slice(6, 9);
  input.value = `+244 ${p1}${p2 ? ' ' + p2 : ''}${p3 ? ' ' + p3 : ''}`.trim();
}

function isValidDate(value) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [d, m, y] = value.split('/').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

function validateForm(data) {
  const errors = {};
  if (!data.nome_completo || data.nome_completo.trim().length < 3) errors.nome = 'Nome inválido.';
  if (!/^\+244\s?\d{3}\s?\d{3}\s?\d{3}$/.test(data.telefone || '')) errors.telefone = 'Use +244 XXX XXX XXX';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Email inválido.';
  if (!data.tipo_servico) errors.servico = 'Selecione um serviço.';
  if (!isValidDate(data.data_consulta || '')) errors.data = 'Data inválida (DD/MM/AAAA).';
  return errors;
}

function setFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
}

function loadServicosOptions() {
  const select = document.getElementById('tipo_servico');
  if (!select) return;
  select.innerHTML = '<option value="">Selecione o serviço...</option>' +
    SERVICES.map((nome) => `<option value="${nome}">${nome}</option>`).join('');
}

function bindMasks() {
  const phone = document.getElementById('telefone');
  const date = document.getElementById('data_consulta');
  if (phone) {
    if (!phone.value) phone.value = '+244 ';
    phone.addEventListener('input', () => maskPhone(phone));
  }
  if (date) date.addEventListener('input', () => maskDate(date));
}

function buildWhatsappMessage(data) {
  const lines = [
    `Olá, meu nome é ${data.nome_completo}.`,
    `Gostaria de marcar uma consulta de ${data.tipo_servico} para o dia ${data.data_consulta} às ${data.hora_consulta}.`,
    `Telefone: ${data.telefone}`
  ];
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.mensagem) lines.push(`Mensagem: ${data.mensagem}`);
  return encodeURIComponent(lines.join('\n'));
}

function bindForm() {
  const form = document.getElementById('formMarcacao');
  const btnSubmit = document.getElementById('btnSubmit');
  const spinner = btnSubmit?.querySelector('.btn-spinner');
  const btnText = btnSubmit?.querySelector('span');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      nome_completo: form.nome_completo.value.trim(),
      telefone: form.telefone.value.trim(),
      email: form.email.value.trim(),
      tipo_servico: form.tipo_servico.value,
      data_consulta: form.data_consulta.value.trim(),
      hora_consulta: form.hora_consulta.value,
      mensagem: form.mensagem.value.trim()
    };

    const errors = validateForm(data);
    setFieldError('err-nome', errors.nome);
    setFieldError('err-telefone', errors.telefone);
    setFieldError('err-email', errors.email);
    setFieldError('err-servico', errors.servico);
    setFieldError('err-data', errors.data);

    if (Object.keys(errors).length) return;

    btnSubmit.disabled = true;
    if (spinner) spinner.style.display = 'inline-flex';
    if (btnText) btnText.textContent = 'Abrindo WhatsApp...';

    const message = buildWhatsappMessage(data);
    const phone = '244923456789';
    window.location.href = `https://wa.me/${phone}?text=${message}`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindMasks();
  loadServicosOptions();
  bindForm();
});