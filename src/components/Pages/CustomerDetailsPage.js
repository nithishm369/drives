import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

const CustomerDetailsPage = ({ details, setDetails, onNext, onBack }) => (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col page-transition">
        <div className="max-w-3xl mx-auto w-full py-12 px-6 flex-1">
            <div className="bg-white p-8 rounded shadow-lg border-t-4 border-[#FF0000]">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="text-[#FF0000]" /> Project Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Project Name</label>
                        <input type="text" className="w-full border p-3 rounded outline-none focus:border-[#FF0000]" value={details.projectName} onChange={e => setDetails({...details, projectName: e.target.value})} placeholder="e.g. Rolling Mill Upgrade" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name</label>
                        <input type="text" className="w-full border p-3 rounded outline-none focus:border-[#FF0000]" value={details.customer} onChange={e => setDetails({...details, customer: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                        <input type="date" className="w-full border p-3 rounded outline-none focus:border-[#FF0000]" value={details.date} onChange={e => setDetails({...details, date: e.target.value})} />
                    </div>
                    <div className="col-span-2 border-t pt-4 mt-2">
                        <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase">Location Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Project Location</label>
                                <input type="text" className="w-full border p-3 rounded outline-none focus:border-[#FF0000]" value={details.location} onChange={e => setDetails({...details, location: e.target.value})} placeholder="Site Name / Plant" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                <input type="text" className="w-full border p-3 rounded outline-none focus:border-[#FF0000]" value={details.city} onChange={e => setDetails({...details, city: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                                <input type="text" className="w-full border p-3 rounded outline-none focus:border-[#FF0000]" value={details.country} onChange={e => setDetails({...details, country: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-between">
                    <button onClick={onBack} className="text-gray-600 font-bold hover:text-black">Back</button>
                    <button onClick={onNext} className="bg-[#FF0000] text-white px-8 py-3 rounded hover:bg-red-700 font-bold flex items-center gap-2">
                        Next <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default CustomerDetailsPage;
