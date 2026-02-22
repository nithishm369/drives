import React, { useState } from 'react';
import { ChevronLeft, Download, Cpu, Zap, Sparkles, Book, File, CheckCircle } from 'lucide-react';
import { DriveLogicEngine } from '../../utils/engine';
import { callGemini } from '../../utils/api';
import DriveTechnicalDiagram from '../Shared/DriveTechnicalDiagram';

const ReportPage = ({ drive, inputs, details, onBack, apiKey }) => {
    const cableData = DriveLogicEngine.suggestCable(drive.Input_Current_a, inputs.cableLength);
    const harmonicData = DriveLogicEngine.analyzeHarmonics(drive.harmonics_type, drive.Input_Current_a);
    const airflow = DriveLogicEngine.calculateAirflow(drive.heat_dissipation_w, drive.type);

    const [aiAdvice, setAiAdvice] = useState(null);
    const [loadingAdvice, setLoadingAdvice] = useState(false);

    const generateAiAdvice = async () => {
        setLoadingAdvice(true);
        const prompt = `
            Act as a senior ABB Drives field engineer.
            PROJECT: ${details.projectName} at ${details.location}.
            DRIVE DATA: ${drive.id}, Frame: ${drive.frame}, Power: ${drive.power_kw} kW.
            INSTALLATION: Cable Length ${inputs.cableLength}m, Recommended Cable ${cableData.crossSection} mm2.
            Please provide technical summary, 3 installation watch-outs, and a safety note.
        `;
        try {
            const result = await callGemini(apiKey, prompt, "You are an expert field engineer. Format output with HTML tags for a report.");
            setAiAdvice(result);
        } catch (e) {
            setAiAdvice("Error generating advice. Please check connection.");
        } finally {
            setLoadingAdvice(false);
        }
    };

    const voltageMin = Math.round(drive.voltage * 0.9);
    const voltageMax = Math.round(drive.voltage * 1.1);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8 print:p-0 print:bg-white page-transition">
            <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center print-hidden">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-700 font-bold hover:text-[#FF0000]">
                    <ChevronLeft /> Back to Selection
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-[#FF0000] px-6 py-2 rounded text-white font-bold hover:bg-red-700 shadow-lg">
                    <Download size={16} /> Print Report
                </button>
            </div>
            <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-2xl print:shadow-none p-12 relative text-sm text-gray-800">
                <div className="flex justify-between items-end border-b-4 border-[#FF0000] pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Drive Technical Report</h1>
                        <p className="text-gray-500">Compliance: IEC 61800-3 / IEC 61000-3-12</p>
                    </div>
                    <div className="text-right">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/2560px-ABB_logo.svg.png" className="h-8 mb-2 ml-auto" />
                        <div className="text-gray-400 text-xs font-bold">{details.projectName}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="col-span-2 bg-gray-50 p-6 rounded border border-gray-200">
                        <h2 className="text-lg font-bold text-[#FF0000] mb-4 flex items-center gap-2"><Cpu size={20} /> Configuration</h2>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                            <div className="flex justify-between border-b pb-1"><span>Family:</span><span className="font-bold">{drive.family}</span></div>
                            <div className="flex justify-between border-b pb-1"><span>ID:</span><span className="font-mono font-bold">{drive.id}</span></div>
                            <div className="flex justify-between border-b pb-1"><span>Power:</span><span>{drive.power_kw} kW</span></div>
                            <div className="flex justify-between border-b pb-1"><span>Noise:</span><span>{drive.noise_dba} dBA</span></div>
                        </div>
                    </div>
                    <div className="col-span-1 border rounded p-2 flex items-center justify-center bg-white">
                        <DriveTechnicalDiagram type={drive.type} />
                    </div>
                </div>
                {/* AI Brief Section */}
                <div className="mb-8 border-t-2 border-dashed border-gray-300 pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            <Sparkles className="text-[#FF0000]" /> Field Engineer's Brief
                        </h3>
                        {!aiAdvice && !loadingAdvice && (
                            <button onClick={generateAiAdvice} className="bg-[#FF0000] text-white px-4 py-2 rounded text-xs font-bold shadow-sm">
                                Generate Brief
                            </button>
                        )}
                    </div>
                    {aiAdvice && (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 ai-content" dangerouslySetInnerHTML={{ __html: aiAdvice }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
