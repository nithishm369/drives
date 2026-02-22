import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, MessageSquare, Send } from 'lucide-react';
import { callGemini } from '../../utils/api';

const AIAssistant = ({ step }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', text: 'Hello! I am your ABB Technical Assistant. Ask me anything about drive selection, harmonics, or installation.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);
        try {
            const response = await callGemini(
                "", // API Key parameter
                `User Question: ${userMsg}`,
                "You are an ABB Drives expert. Answer questions concisely about ACS880 drives, motors, and electrical engineering. Keep answers under 100 words."
            );
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to the network." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] fab-chat flex flex-col items-end">
            {isOpen && (
                <div className="bg-white rounded-lg shadow-2xl w-80 mb-4 overflow-hidden border border-gray-200 flex flex-col animate-slide-up" style={{height: '400px'}}>
                    <div className="bg-[#FF0000] p-3 text-white font-bold flex justify-between items-center">
                        <span className="flex items-center gap-2"><Bot size={18}/> Expert Chat</span>
                        <button onClick={() => setIsOpen(false)}><X size={18}/></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-red-100 text-red-900 rounded-br-none' : 'bg-white border shadow-sm text-gray-800 rounded-bl-none'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-xs text-gray-400 italic">Thinking...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-2 border-t bg-white flex gap-2">
                        <input
                            className="flex-1 border rounded px-2 py-1 text-sm outline-none focus:border-[#FF0000]"
                            placeholder="Ask about drives..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} disabled={loading} className="bg-[#FF0000] text-white p-2 rounded hover:bg-red-700 disabled:opacity-50">
                            <Send size={16}/>
                        </button>
                    </div>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#FF0000] hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
                {isOpen ? <X size={24}/> : <MessageSquare size={24}/>}
            </button>
        </div>
    );
};

export default AIAssistant;
