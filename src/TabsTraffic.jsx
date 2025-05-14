import { useState } from "react";

const TRANSPORTS = {
  "Vue générale": ["RER", "A", "C", "D", "M", "1", "2", "4", "7", "14", "T8", "T9", "T10", "T12", "K", "P", "BUS"],
  RER: ["RER", "A", "C", "D"],
  Transilien: ["K", "P"],
  Metro: ["1", "2", "4", "7", "14"],
  Tram: ["T8", "T9", "T10", "T12"],
  Bus: ["BUS"]
};

const COLORS = {
  RER: "bg-white text-black border border-black",
  A: "bg-red-600 text-white",
  C: "bg-yellow-400 text-black",
  D: "bg-green-600 text-white",
  M: "bg-gray-800 text-white",
  "1": "bg-yellow-400 text-black",
  "2": "bg-blue-400 text-white",
  "4": "bg-purple-400 text-white",
  "7": "bg-pink-300 text-black",
  "14": "bg-purple-700 text-white",
  T8: "bg-gray-100 border-b-4 border-gray-500",
  T9: "bg-gray-100 border-b-4 border-blue-600",
  T10: "bg-gray-100 border-b-4 border-yellow-500",
  T12: "bg-gray-100 border-b-4 border-pink-600",
  K: "bg-yellow-300 text-black",
  P: "bg-orange-400 text-black",
  BUS: "border-b-4 border-black text-black"
};

export default function TabsTraffic() {
  const [selectedTab, setSelectedTab] = useState("Vue générale");
  const tabs = Object.keys(TRANSPORTS);
  const lines = TRANSPORTS[selectedTab];

  return (
    <div className="p-4">
      <div className="bg-red-800 rounded-t-lg p-2 flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${
              selectedTab === tab ? "bg-red-600 text-white" : "bg-red-900 text-white opacity-70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 shadow-md rounded-b-lg">
        <div className="flex flex-wrap gap-4 items-center">
          {lines.map((line) => (
            <div
              key={line}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${
                COLORS[line] || "bg-gray-200"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
