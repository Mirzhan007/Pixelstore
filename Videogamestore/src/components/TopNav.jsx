import React from 'react';
import { Button } from "@/components/ui/button";

export default function TopNav({ cartCount, user, onLogout, currentPage, setCurrentPage }) {
  return (
      <header className="flex h-20 items-center justify-between border-b px-6 bg-slate-900 text-white shadow-md">

        {/* Das Logo (Klickbar, führt zum Shop) */}
        <div className="flex items-center gap-4">
          <h1
              className="text-2xl font-black text-indigo-400 cursor-pointer"
              onClick={() => setCurrentPage('shop')}
          >
            🕹️ PixelStore
          </h1>
        </div>

        {/* Die Menü-Buttons */}
        <div className="flex items-center gap-6">

          {/* SHOP BUTTON */}
          <Button
              variant="ghost"
              className={`text-lg font-bold transition-colors hover:text-indigo-400 hover:bg-slate-800 ${currentPage === 'shop' ? 'text-indigo-400' : 'text-slate-300'}`}
              onClick={() => setCurrentPage('shop')}
          >
            Shop
          </Button>

          {/* WARENKORB BUTTON */}
          <Button
              variant="ghost"
              className={`text-lg font-bold flex gap-2 transition-colors hover:text-indigo-400 hover:bg-slate-800 ${currentPage === 'cart' ? 'text-indigo-400' : 'text-slate-300'}`}
              onClick={() => setCurrentPage('cart')}
          >
            Warenkorb
            {/* Runder Zähler für die Anzahl der Spiele */}
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs font-black">
            {cartCount}
          </span>
          </Button>

          <div className="h-8 w-[1px] bg-slate-700 mx-2" />

          {/* NUTZER & LOGOUT */}
          <div className="flex items-center gap-3">
          <span className="text-green-400 font-bold">
            {user ? `● ${user.name}` : ''}
          </span>
            <Button variant="outline" size="sm" onClick={onLogout} className="text-black border-none hover:bg-slate-200 font-bold">
              Logout
            </Button>
          </div>

        </div>
      </header>
  );
}