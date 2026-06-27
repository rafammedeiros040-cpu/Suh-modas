document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prod = e.target.closest('.produto');
      const id = prod.dataset.id;
      const name = prod.dataset.name;
      const price = Number(prod.dataset.price);
      const size = prod.querySelector('.tamanho')?.value || '';
      addToCart({ id, name, price, size, qty: 1 });
      updateCartBadge();
      e.target.textContent = 'Adicionado';
      setTimeout(()=> e.target.textContent = 'Adicionar ao carrinho', 900);
    });
  });
  updateCartBadge();
});

function updateCartBadge() {
  const items = getCartItems();
  const totalQty = items.reduce((s, it) => s + it.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = totalQty;
}
