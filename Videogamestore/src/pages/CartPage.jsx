import React from 'react';
import { Button } from "@/components/ui/button";

export default function CartPage({ cart, onRemove, onCheckout }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Dein Inventar (Warenkorb)</h2>
            {cart.length === 0 ? <p>Dein Rucksack ist leer.</p> : (
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.cartId} className="flex justify-between items-center border-b pb-2">
                            <span>{item.title}</span>
                            <div className="flex items-center gap-4">
                                <span className="font-bold">{item.price} €</span>
                                <Button variant="destructive" size="sm" onClick={() => onRemove(item.id)}>Löschen</Button>
                            </div>
                        </div>
                    ))}
                    <div className="text-xl font-bold pt-4 text-right">Gesamt: {total} €</div>
                    <Button className="w-full bg-green-600" onClick={onCheckout}>Jetzt kaufen</Button>
                </div>
            )}
        </div>
    );
}