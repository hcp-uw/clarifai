import { DocumentIcon, EyeIcon, ResetIcon, ShieldIcon } from "./Icons";
import "./globals.css";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/dropdown";

function App() {
  const [factChecking, setFactChecking] = useState(false);
  const [adBlocker, setAdBlocker] = useState(false);
  const [contentSummary, setContentSummary] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [colorTheme, setColorTheme] = useState("light");

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-bold">ClarifAI</h1>
      <hr className="mt-2 mb-2 text-default" />

      <motion.div
        animate={{
          opacity: accessibility ? 0 : 1,
          height: accessibility ? 0 : "auto",
          marginBottom: accessibility ? 0 : 16,
        }}
        initial={{
          opacity: 1,
          height: "auto",
          marginBottom: 16,
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        <h3 className="mb-2">Core Features</h3>

        <ul className="space-y-6 pl-4">
          <li className="flex gap-2 items-start justify-between">
            <div className="flex gap-4">
              <div className="w-6 h-6 shrink-0">
                <ShieldIcon />
              </div>
              <div>
                <h3 className="font-medium text-black">Fact Checking</h3>
                <p className="text-sm text-gray-600">
                  Identify and Correct Misinformation
                </p>
              </div>
            </div>
            <Switch
              size="sm"
              checked={factChecking}
              onChange={(e) => setFactChecking(e.target.checked)}
            />
          </li>
          <li className="flex gap-2 items-start justify-between">
            <div className="flex gap-4">
              <div className="w-6 h-6 shrink-0">
                <EyeIcon />
              </div>
              <div>
                <h3 className="font-medium text-black">Ad Blocker</h3>
                <p className="text-sm text-gray-600">
                  Block intrusive advertisements
                </p>
              </div>
            </div>
            <Switch
              size="sm"
              checked={adBlocker}
              onChange={(e) => setAdBlocker(e.target.checked)}
            />
          </li>
          <li className="flex gap-2 items-start justify-between">
            <div className="flex gap-4">
              <div className="w-6 h-6 shrink-0">
                <DocumentIcon />
              </div>
              <div>
                <h3 className="font-medium text-black">Content Summary</h3>
                <p className="text-sm text-gray-600">Generate AI summaries</p>
              </div>
            </div>
            <Switch
              size="sm"
              checked={contentSummary}
              onChange={(e) => setContentSummary(e.target.checked)}
            />
          </li>
        </ul>
      </motion.div>

      <motion.div
        className="flex gap-2 items-start justify-between"
        initial={{ opacity: 1, y: 0, marginTop: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          marginTop: accessibility ? 0 : 8,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex gap-4">
          <div>
            <h3 className="font-medium">Show Accessibility Options</h3>
          </div>
        </div>
        <Switch
          size="sm"
          checked={accessibility}
          onChange={(e) => setAccessibility(e.target.checked)}
        />
      </motion.div>

      <motion.div
        animate={{
          opacity: accessibility ? 1 : 0,
          height: accessibility ? "auto" : 0,
          marginBottom: 0,
        }}
        initial={{
          opacity: 0,
          height: 0,
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    size="sm"
                    className="w-9/10 brand-color font-medium"
                  >
                    Select Font Family
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Font Family Options">
                  <DropdownItem key="12">Atkinson Hyperlegible</DropdownItem>
                  <DropdownItem key="14">Lexend</DropdownItem>
                  <DropdownItem key="16">OpenDyslexic</DropdownItem>
                  <DropdownItem key="18">Inter</DropdownItem>
                  <DropdownItem key="20">Georgia</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    size="sm"
                    className="w-9/10 brand-color font-medium"
                  >
                    Select Font Size
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Font Size Options" className="w-50">
                  <DropdownItem key="12">12px</DropdownItem>
                  <DropdownItem key="14">14px</DropdownItem>
                  <DropdownItem key="16">16px</DropdownItem>
                  <DropdownItem key="18">18px</DropdownItem>
                  <DropdownItem key="20">20px</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-1">Color Theme</label>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setColorTheme("light")}
                className={`flex-1 py-1 text-sm rounded transition-all ${colorTheme === "light" ? "border-2 border-blue-500 bg-white" : "border border-gray-300 bg-gray-50"}`}
              >
                Light
              </button>
              <button
                onClick={() => setColorTheme("warm")}
                className={`flex-1 py-1 text-sm rounded transition-all ${colorTheme === "warm" ? "border-2 border-blue-500 bg-amber-100" : "border border-gray-300 bg-gray-50"}`}
              >
                Warm
              </button>
              <button
                onClick={() => setColorTheme("dark")}
                className={`flex-1 py-1 text-sm rounded transition-all ${colorTheme === "dark" ? "border-2 border-blue-500 bg-gray-900 text-white" : "border border-gray-300 bg-gray-50"}`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <label className="font-medium text-sm">Font Color</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="color-picker-rounded w-8 h-8 cursor-pointer border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between items-centermt-4 mt-4 mb-3">
            <label className="font-medium text-sm">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="color-picker-rounded w-8 h-8 cursor-pointer border border-gray-300 rounded"
            />
          </div>
        </div>
      </motion.div>

      <div className="grow"></div>

      <div className="flex gap-2 items-start justify-between mt-2">
        <div className="flex gap-4">
          <div>
            <h3 className="font-medium">Session Metrics</h3>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-blue-100 bg-opacity-50 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Ads Blocked</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Fact Checks</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Summaries Generated</span>
            <span>0</span>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4 bg-gray-200 text-gray-800">
        <ResetIcon /> Reset to Default
      </Button>
    </div>
  );
}

export default App;
