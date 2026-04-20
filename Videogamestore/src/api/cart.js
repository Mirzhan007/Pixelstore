// WICHTIG: Wir nutzen Port 3001 für deine Datenbank!
const API_URL = 'http://localhost:3001/cart';

export const getCart = async () => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Sicherheits-Check: Wir zwingen das Programm, IMMER eine Liste zurückzugeben.
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Fehler beim Laden des Warenkorbs:", error);
        return [];
    }
};

export const addToCart = async (game) => {
    // DER BUGFIX: Wir trennen die originale 'id' vom restlichen Spiel.
    // Dadurch speichert die Datenbank das Spiel und erfindet selbst eine neue, sichere ID für den Warenkorb!
    const { id, ...gameOhneOriginalId } = game;

    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameOhneOriginalId)
    });
};

export const removeFromCart = async (id) => {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};