const API_URL = 'http://localhost:3000/cart';

export const getCart = () => fetch(API_URL).then(res => res.json());
export const addToCart = (game) => fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...game, cartId: Date.now() })
});
export const removeFromCart = (id) => fetch(`${API_URL}/${id}`, { method: 'DELETE' });