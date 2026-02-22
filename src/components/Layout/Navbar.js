import React from 'react';

const Navbar = ({ onHome, setShowAbout, setShowHelp }) => (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50 print-hidden">
        <div className="flex items-center gap-4">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/2560px-ABB_logo.svg.png"
                alt="ABB Logo"
                className="h-6 md:h-8 object-contain cursor-pointer"
                onClick={onHome}
            />
            <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600 ml-8">
                <button onClick={onHome} className="hover:text-[#FF0000]">Home</button>
                <button onClick={() => setShowAbout(true)} className="hover:text-[#FF0000]">About the Tool</button>
                <button onClick={() => setShowHelp(true)} className="hover:text-[#FF0000]">Help / Support</button>
            </div>
        </div>
        <div className="text-xs text-gray-400 font-mono">ABB LV Drives Pro</div>
    </nav>
);

export default Navbar;
