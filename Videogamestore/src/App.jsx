import React, { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import GameCard from './components/MenuItemCard';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import GameItemDetailPage from './pages/GameItemDetailPage';
import StorePage from './pages/StorePage';
import * as cartApi from './api/cart';
import { getGames } from './api/games';

export default function App() {
    // --- 1. STATES (Zustände) ---
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('shop'); // 'shop', 'cart' oder 'detail'
    const [selectedGame, setSelectedGame] = useState(null);
    const [games, setGames] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // --- 2. EFFEKTE (Daten laden) ---
    useEffect(() => {
        if (user) {
            loadInitialData();
        }
    }, [user]);

    const loadInitialData = async () => {
        try {
            const gameData = await getGames();
            setGames(gameData);
            const cartData = await cartApi.getCart();
            setCart(cartData);
        } catch (err) {
            console.error("Fehler beim Laden:", err);
        }
    };

    // --- 3. HANDLER (Logik) ---
    const handleAdd = async (game) => {
        setSuccess(false);
        await cartApi.addToCart(game);
        const updatedCart = await cartApi.getCart();
        setCart(updatedCart);
    };

    const handleRemove = async (id) => {
        await cartApi.removeFromCart(id);
        const updatedCart = await cartApi.getCart();
        setCart(updatedCart);
    };

    const handleCheckout = () => {
        setSuccess(true);
        setCart([]);
        // In echt würde hier ein API-Call zum Leeren der db.json stehen
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentPage('shop');
    };

    // --- 4. CONDITIONAL RENDERING (Login-Check) ---
    if (!user) {
        return <LoginPage onLogin={handleLogin} />;
    }

    // --- 5. HAUPT-RETURN (Das eigentliche Interface) ---
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <TopNav
                cartCount={cart.length}
                user={user}
                onLogout={() => setUser(null)}
                currentPage={currentPage}
                setCurrentPage={(page) => {
                    setCurrentPage(page);
                    setSelectedGame(null); // Reset, wenn man navigiert
                }}
            />

            <main className="max-w-5xl mx-auto p-6 mt-6">

                {/* SEITE: SHOP */}
                {currentPage === 'shop' && (
                    <StorePage
                        games={games}
                        onAdd={handleAdd}
                        onSelectGame={(game) => {
                            setSelectedGame(game);
                            setCurrentPage('detail');
                        }}
                        onError={setError}
                        error={error}
                    />
                )}

                {/* SEITE: DETAILANSICHT */}
                {currentPage === 'detail' && selectedGame && (
                    <GameItemDetailPage
                        game={selectedGame}
                        onAdd={handleAdd}
                        onBack={() => setCurrentPage('shop')}
                    />
                )}

                {/* SEITE: WARENKORB */}
                {currentPage === 'cart' && (
                    <CartPage
                        cart={cart}
                        user={user}
                        onRemove={handleRemove}
                        onCheckout={handleCheckout}
                        success={success}
                        onBack={() => setCurrentPage('shop')}
                    />
                )}

            </main>
        </div>
    );
} // <--- Diese Klammer schließt die App-Funktion korrekt ab!