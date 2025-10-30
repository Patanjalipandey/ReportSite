
import Logo from "../assets/truebuddy.png";
import { useState } from "react";
export default function ReportPreview({ reportData }) {
    const [showEmailModal, setShowEmailModal] = useState(false);




    const grouped = {};
    reportData.rows.forEach(r => {
        if (!grouped[r.section]) grouped[r.section] = [];
        grouped[r.section].push(r);
    });



    return (
        <>
            <div id="print-area" className="bg-white rounded-xl shadow overflow-hidden">
                <header className="bg-gradient-to-r from-cyan-700 to-blue-500 p-6 text-white flex gap-4">
                    <div className="bg-white/10 rounded-lg shadow flex items-center justify-center h-20 w-36 overflow-hidden mt-3">
                        <img
                            src={Logo}
                            alt="True Buddy Logo"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl mt-1 mb-1 drop-shadow-md tracking-wide uppercase font-bold"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                            {reportData.title}
                        </h1>

                        <p className="text-sm text-blue-50 mt-1">
                            <span className="font-semibold">Period:</span> {reportData.period}
                        </p>

                        <div className="mt-2">
                            <span className="px-2 py-1 bg-white/25 text-white rounded-md text-xs font-semibold shadow-sm backdrop-blur-sm border border-white/20">
                                {reportData.compiled}
                            </span>
                        </div>
                    </div>
                </header>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Object.keys(grouped).map((section) => (
                        <section key={section} className="bg-white border rounded-lg p-4">
                            <h2 className="text-center text-sm font-extrabold text-white bg-gradient-to-r from-cyan-700 to-blue-500 px-3 py-1 rounded-md shadow mb-3 tracking-wide uppercase">
                                {section}
                            </h2>

                            {grouped[section].map((item, i) => (
                                <div key={i} className="border-b py-2">
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-xs text-gray-600">{item.meta}</p>
                                    <p className="text-sm">{item.summary}</p>
                                    {item.source && (
                                        <a href={item.source} target="_blank" className="text-cyan-700 text-xs">
                                            Source
                                        </a>
                                    )}
                                </div>
                            ))}

                        </section>
                    ))}
                </div>

                <div className="flex justify-end p-4 gap-2 print:hidden">
                    <button className="bg-cyan-700 text-white px-3 py-2 rounded shadow" onClick={() => window.print()}>
                        Print / Save as PDF
                    </button>
                </div>

                <footer className="bg-gradient-to-r from-cyan-700 to-blue-500 text-white p-4 flex justify-between text-xs">
                    <div>Prepared by <strong>True Buddy Consulting Pvt Ltd</strong> · Period: {reportData.period}</div>
                    <div>Contact: contact@tbcpl.co.in</div>
                </footer>
            </div>
        </>


    );
}
