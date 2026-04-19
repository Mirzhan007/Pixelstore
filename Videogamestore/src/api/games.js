export const getGames = async () => {
    const res = await fetch('http://localhost:3000/games');
    return res.json();
};