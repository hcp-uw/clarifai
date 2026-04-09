import { DocumentIcon, EyeIcon, ResetIcon, ShieldIcon } from "./Icons";
import "./globals.css";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/dropdown";

// ─── Helper: send a message to the active tab's content script ───────────────
function sendToPage(msg: object) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    if (tabId !== undefined) {
      chrome.tabs.sendMessage(tabId, msg);
    }
  });
}

function App() {
  const [factChecking, setFactChecking] = useState(false);
  const [adBlocker, setAdBlocker] = useState(false);
  const [contentSummary, setContentSummary] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [colorTheme, setColorTheme] = useState("light");
  const [fontFamily, setFontFamily] = useState("Select Font Family");
  const [fontSize, setFontSize] = useState("Select Font Size");
  const [activeTab, setActiveTab] = useState("features");

  function handleThemeChange(theme: string) {
    setColorTheme(theme);
    chrome.storage.local.set({ colorTheme: theme });
    sendToPage({ type: "SET_THEME", value: theme });
  }

  function handleFontFamily(key: string) {
    const fontMap: Record<string, string> = {
      atkinson: "Atkinson Hyperlegible",
      lexend: "Lexend",
      opendyslexic: "OpenDyslexic",
      inter: "Inter",
      georgia: "Georgia",
    };
    const font = fontMap[key] ?? key;
    setFontFamily(font);
    chrome.storage.local.set({ fontFamily: font });
    sendToPage({ type: "SET_FONT_FAMILY", value: font });
  }

  function handleFontSize(key: string) {
    const size = key + "px";
    setFontSize(size);
    chrome.storage.local.set({ fontSize: size });
    sendToPage({ type: "SET_FONT_SIZE", value: size });
  }

  function handleReset() {
    setColorTheme("light");
    setFontColor("#000000");
    setBgColor("#ffffff");
    setFontFamily("Select Font Family");
    setFontSize("Select Font Size");
    chrome.storage.local.clear();
    sendToPage({ type: "RESET" });
  }

  useEffect(() => {
    chrome.storage.local.get(
      ["colorTheme", "fontColor", "bgColor", "fontFamily", "fontSize"],
      (saved) => {
        if (saved.colorTheme) setColorTheme(saved.colorTheme as string);
        if (saved.fontColor) setFontColor(saved.fontColor as string);
        if (saved.bgColor) setBgColor(saved.bgColor as string);
        if (saved.fontFamily) setFontFamily(saved.fontFamily as string);
        if (saved.fontSize) setFontSize(saved.fontSize as string);
      },
    );
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-bold">ClarifAI</h1>
      <hr className="mt-2 mb-2 text-default" />

      <div className="flex gap-0 mb-3 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("features")}
          className={`flex-1 py-2 text-sm font-medium transition-colors border-b-2 text-center ${activeTab === "features"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("accessibility")}
          className={`flex-1 py-2 text-sm font-medium transition-colors border-b-2 text-center ${activeTab === "accessibility"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
        >
          Settings
        </button>
      </div>

      {activeTab === "features" && (
        <div className="space-y-4 min-h-48">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setFactChecking(!factChecking)}
              className={`py-3 px-3 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${factChecking
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
                }`}
            >
              <div className="w-6 h-6">
                <ShieldIcon />
              </div>
              <span className="font-medium text-xs text-center leading-tight">
                Fact Check
              </span>
            </button>

            <button
              onClick={() => setAdBlocker(!adBlocker)}
              className={`py-3 px-3 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${adBlocker
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
                }`}
            >
              <div className="w-6 h-6">
                <EyeIcon />
              </div>
              <span className="font-medium text-xs text-center leading-tight">
                Ad Blocker
              </span>
            </button>

            <button
              onClick={() => setContentSummary(!contentSummary)}
              className={`py-3 px-3 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${contentSummary
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
                }`}
            >
              <div className="w-6 h-6">
                <DocumentIcon />
              </div>
              <span className="font-medium text-xs text-center leading-tight">
                Summary
              </span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">0</span>
              <span className="text-xs text-gray-600">Ads Blocked</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">0</span>
              <span className="text-xs text-gray-600">Fact Checks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">0</span>
              <span className="text-xs text-gray-600">Summaries</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "accessibility" && (
        <div className="space-y-3 text-sm min-h-48">
          <div className="grid grid-cols-2 gap-2">
            {/* ── Font Family Dropdown ── */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full brand-color font-medium text-xs"
                >
                  {fontFamily}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Font Family Options"
                onAction={(key) => handleFontFamily(String(key))}
              >
                <DropdownItem key="atkinson">
                  Atkinson Hyperlegible
                </DropdownItem>
                <DropdownItem key="lexend">Lexend</DropdownItem>
                <DropdownItem key="opendyslexic">OpenDyslexic</DropdownItem>
                <DropdownItem key="inter">Inter</DropdownItem>
                <DropdownItem key="georgia">Georgia</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* ── Font Size Dropdown ── */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full brand-color font-medium text-xs"
                >
                  {fontSize}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Font Size Options"
                onAction={(key) => handleFontSize(String(key))}
              >
                <DropdownItem key="12">12px</DropdownItem>
                <DropdownItem key="14">14px</DropdownItem>
                <DropdownItem key="16">16px</DropdownItem>
                <DropdownItem key="18">18px</DropdownItem>
                <DropdownItem key="20">20px</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* ── Theme Buttons ── */}
          <div>
            <label className="block font-medium text-xs mb-2">Theme</label>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => handleThemeChange("light")}
                className={`flex-1 py-1 text-xs rounded transition-all ${colorTheme === "light"
                  ? "border-2 border-blue-500 bg-white"
                  : "border border-gray-300 bg-gray-50"
                  }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("warm")}
                className={`flex-1 py-1 text-xs rounded transition-all ${colorTheme === "warm"
                  ? "border-2 border-blue-500 bg-amber-100"
                  : "border border-gray-300 bg-gray-50"
                  }`}
              >
                Warm
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`flex-1 py-1 text-xs rounded transition-all ${colorTheme === "dark"
                  ? "border-2 border-blue-500 bg-gray-900 text-white"
                  : "border border-gray-300 bg-gray-50"
                  }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* ── Font Color Picker ── */}
          <div className="flex justify-between items-center gap-2">
            <label className="font-medium text-xs">Font Color</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => {
                setFontColor(e.target.value);
                chrome.storage.local.set({ fontColor: e.target.value });
                sendToPage({ type: "SET_FONT_COLOR", value: e.target.value });
              }}
              className="color-picker-rounded w-8 h-8 cursor-pointer border border-gray-300 rounded"
            />
          </div>

          {/* ── Background Color Picker ── */}
          <div className="flex justify-between items-center gap-2">
            <label className="font-medium text-xs">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => {
                setBgColor(e.target.value);
                chrome.storage.local.set({ bgColor: e.target.value });
                sendToPage({ type: "SET_BG_COLOR", value: e.target.value });
              }}
              className="color-picker-rounded w-8 h-8 cursor-pointer border border-gray-300 rounded"
            />
          </div>
        </div>
      )}

      <div className="grow"></div>

      {/* ── Reset Button ── */}
      <Button
        className="w-full mt-4 bg-gray-200 text-gray-800"
        onPress={handleReset}
      >
        <ResetIcon /> Reset to Default
      </Button>
    </div>
  );
}

export default App;
