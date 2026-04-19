// src/pages/GameItemDetailPage.jsx
import React from 'react';
import { Button } from "@/components/ui/button";

export default function GameItemDetailPage({ game, onAdd, onBack }) {
  if (!game) return null;

  return (
      <div className="max-w-4xl mx-auto p-6 animate-in slide-in-from-bottom-10 duration-500">
        <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-slate-200">
          ← Zurück zum Store
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
          {/* Linke Seite: Bild */}
          <div className="overflow-hidden rounded-2xl shadow-lg h-[400px]">
            <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Rechte Seite: Infos */}
          <div className="flex flex-col justify-between">
            <div>
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
              {game.genre}
            </span>
              <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4 leading-tight">
                {game.title}
              </h1>
              <p className="text-slate-600 leading-relaxed mb-6">
                {/* Falls keine Beschreibung in der db.json ist, nutzen wir diesen Standardtext */}
                {game.description || "Tauche ein in ein unvergessliches Abenteuer. Dieses Spiel bietet atemberaubende Grafik, fesselndes Gameplay und eine Story, die dich nicht mehr loslassen wird."}
              </p>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-500 font-medium">Preis</span>
                <span className="text-3xl font-black text-indigo-600">
                {game.price.toFixed(2)} €
              </span>
              </div>
              <Button
                  onClick={() => onAdd(game)}
                  className="w-full py-6 bg-slate-900 hover:bg-indigo-600 text-white font-black text-lg rounded-xl shadow-xl transition-all"
              >
                In den Warenkorb legen 🎒
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}