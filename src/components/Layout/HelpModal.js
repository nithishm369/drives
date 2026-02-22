import React from 'react';
import { X, HelpCircle, Mail } from 'lucide-react';

const HelpModal = ({ onClose }) => (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4 modal-overlay">
        <div className="bg-white rounded-lg p-8 max-w-lg w-full relative shadow-2xl animate-slide-up">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <X size={24}/>
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="text-[#FF0000]" /> Help & Support
            </h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Local ABB Support Contacts</h3>
                    <div className="space-y-3">
                        {[
                            { name: "Bhavik Kothari", email: "BHAVIK.KOTHARI@IN.ABB.COM" },
                            { name: "Amol Bhalerao", email: "amol.bhalerao@in.abb.com" },
                            { name: "Bipin Kumar", email: "bipin.kumar1@in.abb.com" }
                        ].map((contact, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                                <Mail size={18} className="text-[#FF0000]" />
                                <div>
                                    <div className="font-bold text-sm">{contact.name}</div>
                                    <div className="text-xs text-blue-600 font-mono">{contact.email}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HelpModal;
