export default function visAccessMenu() {
    return (
        <div className="mb-6">
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <div><label className="block text-xs text-gray-700 mb-2">Font
                    Family</label><select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black">
                    <option value="system-ui">System Default</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="'Courier New'">Courier New</option>
                    <option value="Verdana">Verdana</option>
                </select></div>
                <div><label className="block text-xs text-gray-700 mb-2">Font Size: 16px</label><input
                    type="range" min="12" max="24" className="w-full" value="16"/></div>
                <div><label className="block text-xs text-gray-700 mb-3">Color Theme</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <button
                            className="py-4 px-2 rounded-lg border-2 text-xs transition-all border-blue-600 ring-2 ring-blue-200 bg-white">
                            <span className="text-gray-900">Light</span></button>
                        <button
                            className="py-4 px-2 rounded-lg border-2 text-xs transition-all border-gray-300 hover:border-gray-400 bg-[#f4ecd8]"><span
                            className="text-gray-900">Warm</span></button>
                        <button
                            className="py-4 px-2 rounded-lg border-2 text-xs transition-all border-gray-300 hover:border-gray-400 bg-[#1f2937]"><span
                            className="text-white">Dark</span></button>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-blue-200">
                        <div
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 transition-colors">
                            <span className="text-xs text-gray-700">Font Color</span>
                            <div className="relative w-8 h-8">
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-gray-300 pointer-events-none bg-[#000000]"></div>
                                <input id="fontColorPicker" type="color"
                                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                       value="#000000"/></div>
                        </div>
                        <div
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 transition-colors">
                            <span className="text-xs text-gray-700">Background Color</span>
                            <div className="relative w-8 h-8">
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-gray-300 pointer-events-none bg-[#ffffff]"></div>
                                <input id="backgroundColorPicker" type="color"
                                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                       value="#ffffff"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}