import React from 'react';
import MenuItemCard from '@/components/MenuItemCard';

export default function StorePage({ games, onAdd, onSelectGame, error, onError }) {
  // Wenn die Spiele noch nicht geladen sind, zeige eine Lade-Nachricht
  if (!games || games.length === 0) {
    return <p className="text-slate-500 p-8">Spiele werden geladen...</p>;
  }

  return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-3xl font-black mb-8 text-slate-800 uppercase tracking-tight">
          Alle Games
        </h2>

        {/* Positive Fehlerkultur (Anzeige von Fehlern wie dem Glurak-Witz) */}
        {error && (
            <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6 text-amber-900 flex justify-between rounded shadow-sm">
              <span className="font-medium">{error}</span>
              <button onClick={() => onError(null)}>✕</button>
            </div>
        )}

        {/* Das Grid-Layout für die Spiele */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map(game => (
              <div
                  key={game.id}
                  onClick={() => onSelectGame(game)}
                  className="cursor-pointer transform hover:-translate-y-1 transition-transform"
              >
                {/* Unsere Spiele-Karte */}
                <MenuItemCard
                    item={game}
                    onAdd={(e) => {
                      // Verhindert, dass sich die Detailseite öffnet, wenn man nur auf "Kaufen" klickt
                      if (e && e.stopPropagation) e.stopPropagation();
                      onAdd(game);
                    }}
                />
              </div>
          ))}
        </div>
      </div>
  );
}