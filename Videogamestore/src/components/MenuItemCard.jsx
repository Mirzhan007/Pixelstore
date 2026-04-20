import React from 'react';
import { Button } from "@/components/ui/button"; // Den Button haben wir sicher, der funktioniert!

export default function MenuItemCard({ item, onAdd }) {
  // Sicherheits-Check
  if (!item) return null;

  return (
      <div className="flex flex-col h-full overflow-hidden bg-white border border-slate-200 rounded-xl hover:shadow-xl transition-all duration-300">

        {/* BILD DES SPIELS */}
        <div className="h-48 overflow-hidden bg-slate-100">
          <img
              src={item.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80"}
              alt={item.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* INFOS (TITEL, PREIS, GENRE) */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="text-xl font-black text-slate-800 leading-tight">
              {item.title}
            </h3>
            <span className="font-bold text-indigo-600 text-lg whitespace-nowrap">
                  {Number(item.price).toFixed(2)} €
                </span>
          </div>

          <p className="font-medium text-slate-500 uppercase tracking-wider text-xs mb-4">
            {item.genre}
          </p>

          {/* KAUFEN BUTTON */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <Button
                onClick={onAdd}
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold transition-colors shadow-md"
            >
              In den Warenkorb
            </Button>
          </div>
        </div>
      </div>
  );
}