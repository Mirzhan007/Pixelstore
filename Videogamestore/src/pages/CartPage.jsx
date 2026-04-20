import React from 'react';
import { Button } from "@/components/ui/button";

export default function CartPage({ cart, onRemove, onCheckout, success, onBack, user }) {
    // DAS SICHERHEITSNETZ: Falls 'cart' kein Array ist (z.B. wegen eines Serverfehlers),
    // nutzen wir einfach eine leere Liste []. So kann .reduce() niemals abstürzen!
    const safeCart = Array.isArray(cart) ? cart : [];

    // Preise sicher zusammenrechnen
    const total = safeCart.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2);

    return (
        <div className="p-8 max-w-3xl mx-auto animate-in slide-in-from-right-8 duration-300">

            <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-slate-200 font-bold text-slate-600">
                ← Zurück zum Store
            </Button>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <h2 className="text-3xl font-black mb-6 text-slate-800">Dein Inventar (Warenkorb) 🎒</h2>

                {success ? (
                    <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
                        <span className="text-6xl block mb-4">🚀</span>
                        <p className="text-green-800 font-black text-2xl mb-2">Download gestartet!</p>
                        <p className="text-green-600">Die Keys wurden in das Konto von {user?.name || "dir"} gelegt. Viel Spaß beim Zocken!</p>
                    </div>
                ) : safeCart.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                        <span className="text-5xl block mb-4">🕸️</span>
                        <p className="text-slate-500 font-medium text-lg">Dein Rucksack ist komplett leer.</p>
                        <Button onClick={onBack} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                            Jetzt Spiele entdecken
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Wir nutzen hier unser Sicherheitsnetz "safeCart" anstelle von "cart" */}
                        {safeCart.map((item, index) => (
                            <div key={item.id || index} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">

                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=100&q=80"}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-700 text-lg">{item.title}</h3>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{item.genre}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="font-black text-indigo-600 text-xl">{Number(item.price).toFixed(2)} €</span>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="bg-red-500 hover:bg-red-600 font-bold px-4"
                                        // WICHTIG: Die ID wird jetzt sicher gelöscht!
                                        onClick={() => onRemove(item.id)}
                                    >
                                        ❌ Löschen
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div className="border-t-2 border-slate-100 pt-6 mt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-2xl font-bold text-slate-500">Gesamtsumme:</span>
                                <span className="text-3xl font-black text-slate-800">{total} €</span>
                            </div>
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-xl font-black rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                                onClick={onCheckout}
                            >
                                Jetzt zahlungspflichtig kaufen 💳
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}