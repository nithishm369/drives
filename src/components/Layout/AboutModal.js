import React from 'react';
import { X } from 'lucide-react';

const AboutModal = ({ onClose }) => (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4 modal-overlay">
        <div className="bg-white rounded-lg p-8 max-w-lg w-full relative shadow-2xl animate-slide-up">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <X size={24}/>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#FF0000]">About ABB LV Drives Pro</h2>
            <p className="text-gray-600 mb-4">
                This tool simplifies the selection process for ABB ACS880 industrial drives.
                It accesses a technical database of catalog values to recommend the best drive based on:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
                <li>Motor Power & Voltage (0.55 kW to 6000 kW)</li>
                <li>Cable Length (Auto-oversizing for long cables)</li>
                <li>Harmonic Performance Requirements</li>
                <li>Support for Air Cooled variants</li>
                <li>Info: Currently, Tool has been made for Light duty Drives</li>
            </ul>
            <div className="bg-gray-100 p-4 rounded text-sm text-gray-500">
                Data is based on standard ABB Hardware Manuals. Always verify with official DriveSize software for critical engineering.
            </div>
        </div>
    </div>
);

export default AboutModal;
