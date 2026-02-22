import React, { useState } from 'react';
import { User, Lock, AlertTriangle } from 'lucide-react';

const LoginPage = ({ onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.toLowerCase().endsWith('@in.abb.com')) {
            setError('Access Restricted: Only @in.abb.com email addresses are allowed.');
            return;
        }
        setError('');
        onLogin();
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center page-transition relative overflow-hidden bg-gray-100">
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80')] bg-drift filter grayscale"></div>
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border-t-4 border-[#FF0000] z-10 relative">
                <div className="text-center mb-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/2560px-ABB_logo.svg.png" className="h-8 mx-auto mb-4" alt="ABB" />
                    <h2 className="text-xl font-bold text-gray-800">Drives Pro Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">ABB Email ID</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                            <input
                                type="email"
                                className="w-full pl-10 p-3 border rounded focus:border-[#FF0000] outline-none bg-gray-50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@in.abb.com"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                            <input
                                type="password"
                                className="w-full pl-10 p-3 border rounded focus:border-[#FF0000] outline-none bg-gray-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-600 text-xs font-bold bg-red-50 p-2 rounded flex items-center gap-2">
                            <AlertTriangle size={12}/> {error}
                        </div>
                    )}
                    <button type="submit" className="w-full bg-[#FF0000] text-white py-3 rounded font-bold hover:bg-red-700 transition-colors">
                        Login
                    </button>
                </form>
                <button onClick={onBack} className="w-full mt-4 text-gray-500 text-sm hover:underline">Cancel</button>
            </div>
        </div>
    );
};

export default LoginPage;
