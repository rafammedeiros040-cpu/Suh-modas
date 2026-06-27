document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  const form=document.getElementById('checkout-form');
  if(form) form.addEventListener('submit', onSubmit);
});

function renderOrderSummary() {
  const items = getCartItems();
  const container = document.getElementById('order-summary');
  if (!container) return;
  container.innerHTML = '';
  if (items.length === 0) container.innerHTML = '<p>Seu carrinho está vazio.</p>';
  else items.forEach(it => {
    const p = document.createElement('p');
    p.textContent = `${it.name} - Tamanho: ${it.size || '-'} - Qtd: ${it.qty} - R$ ${(it.price * it.qty).toFixed(2)}`;
    container.appendChild(p);
  });
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const totalEl = document.getElementById('order-total');
  if (totalEl) totalEl.textContent = total.toFixed(2);
}

function onSubmit(e) {
  e.preventDefault();
  const items = getCartItems();
  if (items.length === 0) { alert('Seu carrinho está vazio.'); return; }
  alert('Pedido confirmado! Será enviado via WhatsApp.');
}
