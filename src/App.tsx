import './App.css'

function App() {

    //const [numAds, setNumAds] = useState(0)
    //const [numFacts, setNumFacts] = useState(0)

    //function incNumAds() {
    //    setNumAds(numAds + 1)
    //}

    //function incNumFacts() {
    //    setNumFacts(numFacts + 1)
    //}

    return (
        <>
            <div className="w-96 bg-white border-l border-gray-200 shadow-lg h-fit sticky top-0">
                <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex items-center justify-between"><h2
                    className="text-sm text-blue-900 font-bold">ClarifAI</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close panel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-x w-5 h-5" aria-hidden="true">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-6"><h3 className="text-sm text-blue-900 mb-3">Core Features</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="mt-0.5 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" className="lucide lucide-shield w-4 h-4"
                                         aria-hidden="true">
                                        <path
                                            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-900">Fact Checking</div>
                                    <div className="text-xs text-gray-500">Identify and correct misinformation</div>
                                </div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div
                                        className="bg-gray-400 relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                                </label>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="mt-0.5 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" className="lucide lucide-eye w-4 h-4"
                                         aria-hidden="true">
                                        <path
                                            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-900">Ad Blocker</div>
                                    <div className="text-xs text-gray-500">Block intrusive advertisements</div>
                                </div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div
                                        className="bg-gray-400 relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                                </label>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="mt-0.5 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" className="lucide lucide-file-text w-4 h-4"
                                         aria-hidden="true">
                                        <path
                                            d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                                        <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                                        <path d="M10 9H8"></path>
                                        <path d="M16 13H8"></path>
                                        <path d="M16 17H8"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-900">Content Summary</div>
                                    <div className="text-xs text-gray-500">Generate AI summaries</div>
                                </div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div
                                        className="bg-gray-400 relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3"><h3
                            className="text-sm text-blue-900">Visual Accessibility</h3>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer"/>
                                <div
                                    className="bg-gray-400 relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                            </label>
                        </div>
                    </div>
                    <div className="mb-6"><h3 className="text-sm text-blue-900 mb-3">Session Metrics</h3>
                        <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
                            <div className="flex justify-between items-center"><span className="text-sm text-gray-700">Ads Blocked</span><span
                                className="text-blue-600">12</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-gray-700">Fact Checks</span><span
                                className="text-blue-600">3</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-gray-700">Summaries Generated</span><span
                                className="text-blue-600">1</span></div>
                        </div>
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-rotate-ccw w-4 h-4" aria-hidden="true">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </>
    )
}

export default App
