import React from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center">
        <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-gray-200 rounded-full animate-spin-slow"></div>
            <div className="w-24 h-24 border-4 border-[#FF0000] border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            <Zap className="text-[#FF0000] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 animate-pulse">Processing Drive Data...</h2>
        <p className="text-gray-500 mt-2">Accessing ABB Technical Database</p>
    </div>
);

export default LoadingScreen;
