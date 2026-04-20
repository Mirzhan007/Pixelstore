// Datei: src/api/games.js
export const getGames = async () => {
    try {
        // ÄNDERUNG: Port ist jetzt 3001 statt 3000!
        const response = await fetch('http://localhost:3001/games');
        if (!response.ok) throw new Error('Netzwerkantwort war nicht ok');
        return await response.json();
    } catch (error) {
        console.error("API Fehler beim Laden der Spiele:", error);
        return [];
    }
};