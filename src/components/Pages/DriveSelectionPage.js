import React from 'react';
import { Filter, Search, AlertTriangle, ChevronRight } from 'lucide-react';

const DriveSelectionPage = ({ inputs, setInputs, onCalculate, matches, onBack, setStep, hasSearched, setHasSearched }) => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col page-transition">
            <div className="bg-white border-b shadow-sm p-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="font-bold text-xl text-[#FF0000]">ABB Product Selection</div>
                    <div className="text-sm text-gray-500 uppercase">Drive selection is done on the light duty</div>
                </div>
            </div>
            <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded shadow h-fit lg:col-span-1">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Filter size={18} /> Parameters</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Drive Family</label>
                            <select className="w-full border p-2 rounded mt-1 outline-none focus:border-[#FF0000]" value={inputs.family} onChange={e => setInputs({...inputs, family: e.target.value})}>
                                <option value="All">All ACS880 Variants</option>
                                <option value="ACS880-01">ACS880-01 (Wall-mounted)</option>
                                <option value="ACS880-07">ACS880-07 (Cabinet)</option>
                                <option value="Multidrive">Multidrive (Inverter + DSU/ISU)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Voltage</label>
                            <select className="w-full border p-2 rounded mt-1 outline-none focus:border-[#FF0000]" value={inputs.voltage} onChange={e => setInputs({...inputs, voltage: Number(e.target.value)})}>
                                <option value={400}>400V (380-415V)</option>
                                <option value={500}>500V (380-500V)</option>
                                <option value={690}>690V (525-690V)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Motor Power (kW)</label>
                            <input type="number" className="w-full border p-2 rounded mt-1 outline-none focus:border-[#FF0000]" value={inputs.powerKw} onChange={e => setInputs({...inputs, powerKw: Number(e.target.value)})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Cable Length (m)</label>
                            <input type="number" className="w-full border p-2 rounded mt-1 outline-none focus:border-[#FF0000]" value={inputs.cableLength} onChange={e => setInputs({...inputs, cableLength: Number(e.target.value)})} placeholder="e.g. 50" />
                            {inputs.cableLength > 100 && (
                                <div className="text-[10px] text-orange-600 mt-1 font-bold">
                                    {inputs.cableLength >= 300
                                        ? "Warning: Extreme cable length >= 300m. Selection will be heavily oversized."
                                        : "Warning: Long cable > 100m. Selection will be oversized."}
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => { setHasSearched(true); onCalculate(); }} className="w-full bg-[#FF0000] text-white py-3 rounded mt-4 hover:bg-red-700 text-sm font-bold flex items-center justify-center gap-2">
                                <Search size={16} /> Search / Calculate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 space-y-4">
                    {!hasSearched ? (
                        <div className="bg-white p-12 text-center rounded border-2 border-dashed border-gray-300">
                            <Search className="mx-auto text-gray-300 h-16 w-16 mb-4" />
                            <h3 className="font-bold text-lg text-gray-500">Ready to Select</h3>
                            <p className="text-gray-400">Enter parameters and click Search to view ABB Hardware Manual data.</p>
                        </div>
                    ) : matches.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded">
                            <AlertTriangle className="mx-auto text-yellow-500 h-12 w-12 mb-2" />
                            <h3 className="font-bold text-lg">No Drives Found</h3>
                            <p className="text-gray-500">Try changing the voltage or family type.</p>
                        </div>
                    ) : (
                        matches.map((drive) => {
                            const isRecommended = drive.id === matches[0].id;
                            return (
                                <div key={drive.id} className={`bg-white p-6 rounded shadow border-l-4 transition-all hover:shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 ${isRecommended ? 'border-[#FF0000]' : 'border-gray-300'}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-lg">{drive.family}</h4>
                                            {isRecommended && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">BEST MATCH</span>}
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{drive.frame}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{drive.type} • {drive.ip_class}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                            <div><span className="text-gray-400 block">Power</span><span className="font-bold">{drive.power_kw} kW</span></div>
                                            <div><span className="text-gray-400 block">Input Current</span><span className="font-bold">{drive.Input_Current_a} A</span></div>
                                            <div><span className="text-gray-400 block">Heat Dissipation</span><span className="font-bold">{drive.heat_dissipation_w} W</span></div>
                                            <div><span className="text-gray-400 block">Noise</span><span className="font-bold">{drive.noise_dba} dBA</span></div>
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(5, drive)} className="bg-gray-900 text-white px-6 py-2 rounded font-bold hover:bg-[#FF0000] whitespace-nowrap transition-colors">
                                        Generate Report
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="p-4 bg-white border-t flex justify-between max-w-7xl mx-auto w-full">
                <button onClick={onBack} className="text-gray-600 font-bold">Back</button>
            </div>
        </div>
    );
};

export default DriveSelectionPage;
