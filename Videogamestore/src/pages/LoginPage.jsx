import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage({ onLogin }) {
    const [user, setUser] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === '1234') onLogin(user);
        else alert("Falscher Discord-Code! Nutze 1234");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl text-black space-y-4 w-80">
                <h2 className="text-2xl font-bold text-center text-indigo-600">PixelStore Login</h2>
                <Input placeholder="Spielername" onChange={e => setUser(e.target.value)} />
                <Input placeholder="Discord Code (1234)" onChange={e => setCode(e.target.value)} />
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Spiel starten</Button>
            </form>
        </div>
    );
}