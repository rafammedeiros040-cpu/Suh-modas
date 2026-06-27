const CART_KEY = 'suh_cart_v1';

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '{}'); }
  catch (e) { return {}; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = loadCart();
  const key = item.id + (item.size ? '-' + item.size : '');
  if (cart[key]) cart[key].qty += item.qty || 1;
  else cart[key] = { id: key, baseId: item.id, name: item.name, price: Number(item.price), size: item.size || '', qty: item.qty || 1 };
  saveCart(cart);
}

function removeFromCart(key) {
  const cart = loadCart();
  delete cart[key];
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

function getCartItems() {
  const cart = loadCart();
  return Object.values(cart);
}
