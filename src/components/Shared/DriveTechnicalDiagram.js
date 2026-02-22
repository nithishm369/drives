import React from 'react';

const DriveTechnicalDiagram = ({ type }) => {
    const isCombined = type && type.includes('Inverter + DSU');
    const isCabinet = type && (type.includes('Cabinet') || type.includes('LC'));
    const isModule = type && (type.includes('Module') && !type.includes('Cabinet'));

    if (isCombined) {
        return (
            <div className="w-full h-48 bg-white border border-gray-300 rounded flex items-center justify-center relative overflow-hidden">
                <div className="flex gap-1 shadow-2xl p-2 bg-gray-50 rounded">
                    <div className="w-24 h-32 border-2 border-gray-600 bg-gray-100 flex flex-col items-center p-1 relative">
                        <div className="text-[8px] font-bold text-gray-500 mb-1">DSU</div>
                        <div className="w-full h-4 bg-gray-300 border border-gray-500 mb-1"></div>
                        <div className="w-full flex-1 bg-gray-200 grid grid-cols-2 gap-1 p-1">
                            <div className="bg-gray-400 h-full w-full"></div>
                            <div className="bg-gray-400 h-full w-full"></div>
                        </div>
                    </div>
                    <div className="h-4 w-4 bg-gray-800 self-center"></div>
                    <div className="w-24 h-32 border-2 border-gray-600 bg-gray-100 flex flex-col items-center p-1 relative">
                        <div className="text-[8px] font-bold text-gray-500 mb-1">INU</div>
                        <div className="w-full h-4 bg-gray-300 border border-gray-500 mb-1"></div>
                        <div className="w-full flex-1 bg-gray-200 grid grid-cols-1 gap-1 p-1">
                            <div className="bg-gray-400 h-full w-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 font-bold">MULTIDRIVE SYSTEM</div>
            </div>
        );
    }
    if (isModule) {
        return (
            <div className="w-full h-48 bg-white border border-gray-300 rounded flex items-center justify-center relative overflow-hidden">
                <div className="w-32 h-40 border-2 border-gray-800 bg-gray-100 flex flex-col items-center p-2 relative shadow-lg">
                    <div className="w-full h-4 bg-gray-300 border border-gray-600 mb-1"></div>
                    <div className="w-full flex-1 bg-gray-200 border border-gray-400 grid grid-cols-1 gap-1 p-1">
                        <div className="w-full h-1 bg-gray-400"></div>
                        <div className="w-full h-1 bg-gray-400"></div>
                        <div className="w-full h-1 bg-gray-400"></div>
                    </div>
                    <div className="absolute bottom-2 font-mono text-[8px] font-bold">R10/R11 MODULE</div>
                </div>
            </div>
        );
    }
    if (isCabinet) {
        return (
            <div className="w-full h-48 bg-white border border-gray-300 rounded flex items-center justify-center relative overflow-hidden">
                <div className="flex shadow-2xl">
                    <div className="w-16 h-40 bg-gray-800 border-r border-gray-600 relative">
                        <div className="absolute top-4 left-4 w-8 h-4 bg-gray-400"></div>
                    </div>
                    <div className="w-24 h-40 bg-gray-800 relative border-r border-gray-600">
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-700 border border-gray-600 grid grid-cols-1 gap-2 p-1">
                            <div className={`w-full h-1 ${type.includes('Liquid') ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                        </div>
                    </div>
                    <div className="w-16 h-40 bg-gray-800 relative">
                        <div className="absolute bottom-4 left-4 w-8 h-8 grid grid-cols-2 gap-1">
                            <div className="bg-gray-600 rounded-full"></div>
                            <div className="bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 font-bold">{type.includes('Liquid') ? 'ACS880-17LC' : 'ACS880 CABINET'}</div>
            </div>
        );
    }
    return (
        <div className="w-full h-48 bg-white border border-gray-300 rounded flex items-center justify-center relative overflow-hidden">
            <div className="w-24 h-36 bg-white border-2 border-gray-800 rounded-lg relative shadow-xl flex flex-col items-center">
                <div className="w-12 h-8 bg-blue-50 border border-blue-200 mt-4 rounded-sm flex items-center justify-center">
                    <div className="w-8 h-4 bg-blue-200"></div>
                </div>
                <div className="w-full h-4 mt-2 flex justify-center gap-1">
                    <div className="w-2 h-2 bg-red-600"></div>
                    <div className="w-8 h-2 bg-gray-800"></div>
                </div>
                <div className="w-20 flex-1 bg-gray-100 border-x border-gray-300 mt-2 mb-2 flex flex-col justify-end p-2 gap-1">
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                </div>
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 font-mono">ACS880-01</div>
        </div>
    );
};

export default DriveTechnicalDiagram;
