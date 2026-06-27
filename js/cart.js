// Chave usada no localStorage
const CART_KEY = 'suh_cart_v1';

// Carregar carrinho
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '{}'); }
  catch (e) { return {}; }
}

// Salvar carrinho
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Adicionar item ao carrinho
function addToCart(item) {
  const cart = loadCart();
  const key = item.id + (item.size ? '-' + item.size : '');
  if (cart[key]) {
    cart[key].qty += item.qty || 1;
  } else {
    cart[key] = {
      id: key,
      baseId: item.id,
      name: item.name,
      price: Number(item.price),
      size: item.size || '',
      qty: item.qty || 1,
      image: item.image || '' // garante que a foto vá para o checkout
    };
  }
  saveCart(cart);
}

// Remover item do carrinho
function removeFromCart(key) {
  const cart = loadCart();
  delete cart[key];
  saveCart(cart);
}

// Limpar carrinho
function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// Obter itens do carrinho
function getCartItems() {
  const cart = loadCart();
  return Object.values(cart);
}

// Atualizar badge do carrinho (quantidade total)
function updateCartBadge() {
  const items = getCartItems();
  const totalQty = items.reduce((s, it) => s + it.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = totalQty;
}

// Ativar botões "Adicionar ao carrinho" no catálogo
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prod = e.target.closest('.produto');
      const id = prod.dataset.id;
      const name = prod.dataset.name;
      const price = Number(prod.dataset.price);
      const size = prod.querySelector('.tamanho')?.value || '';
      const image = prod.querySelector('img')?.src || '';

      addToCart({ id, name, price, size, qty: 1, image });
      updateCartBadge();

      e.target.textContent = 'Adicionado';
      setTimeout(() => e.target.textContent = 'Adicionar ao carrinho', 900);
    });
  });
  updateCartBadge();
});
