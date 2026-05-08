import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  FileCode,
  Settings,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Sun,
  Activity,
  Code2,
  Database,
  Search,
  ChevronRight,
  Menu,
  X,
  Loader2,
  BarChart3,
  Terminal
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { GoogleGenAI, Type } from "@google/genai";

// --- Types ---
async (params:type) => {
  interface CodeEntry {
    id: string;
    sourceCode: string;
    suspiciousCode: string;
    similarity: number;
    verdict: "Plagiarism Detected" | "Clean" | "Suspected";
    method: string;
    timestamp: string;
    astAnalysis?: string;
  }
  
}
interface ModelInfo {
  name: string;
  displayName: string;
  description: string;
}

// --- Mock Data Generator ---
const generateMockData = (): CodeEntry[] => {
  const methods = ["Variable Renaming", "Reordering", "Logic Change", "Exact Copy", "Boilerplate"];
  const verdicts = ["Plagiarism Detected", "Clean", "Suspected"];
  const data: CodeEntry[] = [];

  for (let i = 0; i < 20; i++) {
    const similarity = Math.floor(Math.random() * 100);
    let verdict: "Plagiarism Detected" | "Clean" | "Suspected";
    if (similarity > 80) verdict = "Plagiarism Detected";
    else if (similarity > 40) verdict = "Suspected";
    else verdict = "Clean";

    data.push({
      id: `mock-${i}`,
      sourceCode: `def calculate_sum(a, b):\n    return a + b`,
      suspiciousCode: `def calc_add(x, y):\n    return x + y`,
      similarity,
      verdict,
      method: methods[Math.floor(Math.random() * methods.length)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
      astAnalysis: "Mock analysis: AST structures match perfectly despite variable renaming."
    });
  }
  return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 mb-2 rounded-xl transition-all duration-200 group ${
      active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`}
  >
    <Icon size={20} className={`mr-3 transition-transform group-hover:scale-110 ${active ? "animate-pulse" : ""}`} />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-70" />}
  </button>
);

const Card = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ verdict }: { verdict: string }) => {
  const styles = {
    "Plagiarism Detected": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    "Clean": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    "Suspected": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  };
  const icon = {
    "Plagiarism Detected": ShieldAlert,
    "Clean": CheckCircle2,
    "Suspected": AlertTriangle
  };
  const IconComponent = icon[verdict as keyof typeof icon] || Activity;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[verdict as keyof typeof styles] || "bg-gray-100 text-gray-700"}`}>
      <IconComponent size={12} className="mr-1.5" />
      {verdict}
    </span>
  );
};

// --- Main Application ---

const App = () => {
  // State
  const [activeTab, setActiveTab] = useState<"dashboard" | "detector" | "training" | "settings">("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Data State
  const [trainingData] = useState<CodeEntry[]>(generateMockData());
  const [testData, setTestData] = useState<CodeEntry[]>([]);
  
  // Settings State
  const apiKey = process.env.API_KEY || "";
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // Analysis State
  const [sourceCode, setSourceCode] = useState("");
  const [suspiciousCode, setSuspiciousCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Effects
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // --- Handlers ---

  const handleFetchModels = async () => {
    if (!apiKey) return alert("API Key not found in environment.");
    setIsLoadingModels(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const data = await response.json();
      if (data.models) {
        setModels(data.models.filter((m: any) => m.name.includes("gemini")));
      } else {
        alert("Failed to fetch models or invalid key.");
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      alert("Error fetching models.");
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      setActiveTab("settings");
      return alert("API Key not configured in environment.");
    }
    if (!sourceCode.trim() || !suspiciousCode.trim()) return alert("Please provide both code snippets.");

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `
        You are an advanced Code Plagiarism Detection Engine specializing in Abstract Syntax Tree (AST) analysis.
        Your task is to compare two code snippets and detect plagiarism that goes beyond simple copy-pasting.
        
        Focus on:
        1. Structural Logic: Do the control flow graphs match?
        2. Algorithmic Equivalence: Is the underlying logic identical despite renaming variables or reordering independent blocks?
        3. AST Similarity: Would the ASTs of these snippets be isomorphic or near-isomorphic?
        
        Ignore:
        1. Variable/Function names (unless semantic meaning is preserved in a suspicious way).
        2. Comments and whitespace.
        3. Language-specific syntax sugar if the logic remains the same.

        Return a JSON response strictly adhering to this schema:
        {
          "similarityScore": number (0-100),
          "verdict": "Plagiarism Detected" | "Suspected" | "Clean",
          "method": "Variable Renaming" | "Reordering" | "Logic Change" | "Exact Copy" | "None",
          "astAnalysis": "Detailed explanation of AST comparison...",
          "keySimilarities": ["point 1", "point 2"],
          "keyDifferences": ["point 1", "point 2"]
        }
      `;

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: [
          {
            role: "user",
            parts: [
              { text: `Source Code:\n${sourceCode}\n\nSuspicious Code:\n${suspiciousCode}` }
            ]
          }
        ],
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text;
      if (!resultText) throw new Error("No response from model");

      const resultJson = JSON.parse(resultText);

      const newEntry: CodeEntry = {
        id: `test-${Date.now()}`,
        sourceCode,
        suspiciousCode,
        similarity: resultJson.similarityScore,
        verdict: resultJson.verdict,
        method: resultJson.method,
        timestamp: new Date().toISOString(),
        astAnalysis: resultJson.astAnalysis
      };

      setTestData(prev => [newEntry, ...prev]);
      setAnalysisResult(resultJson);

    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please check your API key and quota.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Views ---

  const DashboardView = () => {
    const allData = [...testData, ...trainingData];
    const total = allData.length;
    const detected = allData.filter(d => d.verdict === "Plagiarism Detected").length;
    const clean = allData.filter(d => d.verdict === "Clean").length;
    const avgSim = Math.round(allData.reduce((acc, d) => acc + d.similarity, 0) / total) || 0;

    const pieData = [
      { name: "Plagiarized", value: detected, color: "#ef4444" },
      { name: "Suspected", value: allData.filter(d => d.verdict === "Suspected").length, color: "#f59e0b" },
      { name: "Clean", value: clean, color: "#10b981" },
    ];

    const chartData = allData.slice(0, 10).map(d => ({
      name: d.id.split('-')[1],
      similarity: d.similarity,
      verdict: d.verdict
    })).reverse();

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Analyses", value: total, icon: Activity, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
            { label: "Plagiarism Detected", value: detected, icon: ShieldAlert, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/20" },
            { label: "Clean Codebase", value: clean, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/20" },
            { label: "Avg. Similarity", value: `${avgSim}%`, icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/20" },
          ].map((stat, i) => (
            <Card key={i} className="flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">Recent Analysis Trends</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="similarity" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">Verdict Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const DetectorView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-12 xl:col-span-8 space-y-6">
        <Card className="border-t-4 border-t-indigo-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-gray-100">
              <Code2 className="mr-3 text-indigo-500" />
              Code Comparison Engine
            </h2>
            <div className="flex gap-2">
              <button 
                 onClick={() => {
                   setSourceCode(`function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`);
                   setSuspiciousCode(`const fact = (num) => {\n  return num === 0 ? 1 : num * fact(num - 1);\n};`);
                 }}
                 className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                Load Sample JS
              </button>
              <button 
                 onClick={() => {
                    setSourceCode(`def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`);
                    setSuspiciousCode(`def sort_list(items):\n    length = len(items)\n    for x in range(length):\n        for y in range(0, length-x-1):\n            if items[y] > items[y+1]:\n                temp = items[y]\n                items[y] = items[y+1]\n                items[y+1] = temp`);
                 }}
                 className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                Load Sample Python
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Original / Source Code</label>
              <div className="relative">
                <textarea
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm code-scroll resize-none transition-all"
                  placeholder="// Paste original code here..."
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-slate-800 text-xs rounded opacity-50">Source</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Suspicious Code</label>
              <div className="relative">
                <textarea
                  value={suspiciousCode}
                  onChange={(e) => setSuspiciousCode(e.target.value)}
                  className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm code-scroll resize-none transition-all"
                  placeholder="// Paste suspicious code here..."
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-slate-800 text-xs rounded opacity-50">Target</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`flex items-center px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all ${
                isAnalyzing ? "bg-indigo-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Analyzing AST Structure...
                </>
              ) : (
                <>
                  <Search className="mr-2" size={20} />
                  Run Deep Analysis
                </>
              )}
            </button>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-4 space-y-6">
        {analysisResult ? (
          <Card className="h-full border-l-4 border-l-emerald-500 animate-in slide-in-from-right-8 duration-500">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Terminal className="mr-2 text-emerald-500" />
              Analysis Report
            </h3>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-gray-50 dark:bg-slate-900 rounded-xl">
                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Similarity Score</div>
                <div className={`text-5xl font-black ${
                  analysisResult.similarityScore > 80 ? "text-red-500" : 
                  analysisResult.similarityScore > 50 ? "text-amber-500" : "text-emerald-500"
                }`}>
                  {analysisResult.similarityScore}%
                </div>
                <div className="mt-2">
                  <Badge verdict={analysisResult.verdict} />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Detection Method</h4>
                <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-sm font-medium">
                  {analysisResult.method || "Structure Analysis"}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">AST Logic Analysis</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  {analysisResult.astAnalysis}
                </p>
              </div>

              {analysisResult.keySimilarities && (
                <div>
                   <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Matches</h4>
                   <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-4 space-y-1">
                      {analysisResult.keySimilarities.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
                   </ul>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card className="h-full flex flex-col items-center justify-center text-center p-8 opacity-70 border-dashed border-2 border-gray-200 dark:border-slate-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Activity size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Ready for Analysis</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-2">
              Paste code snippets to begin the deep AST structural comparison.
            </p>
          </Card>
        )}
      </div>
    </div>
  );

  const TrainingDataView = () => (
    <div className="animate-in fade-in duration-500">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <Database className="mr-3 text-indigo-500" />
            Historical Data Registry
          </h2>
          <span className="text-sm text-gray-500">{(trainingData.length + testData.length)} Records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 text-sm">
                <th className="pb-3 pl-4 font-medium">ID</th>
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">Similarity</th>
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {[...testData, ...trainingData].map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors text-sm">
                  <td className="py-3 pl-4 font-mono text-gray-600 dark:text-gray-400">{entry.id}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{new Date(entry.timestamp).toLocaleDateString()}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full mr-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            entry.similarity > 80 ? 'bg-red-500' : entry.similarity > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`} 
                          style={{ width: `${entry.similarity}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{entry.similarity}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{entry.method}</td>
                  <td className="py-3">
                    <Badge verdict={entry.verdict} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const SettingsView = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <Card className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center mb-4">
            <Settings className="mr-3 text-indigo-500" />
            Configuration
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Configure the AI model connection for AST analysis.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Google Gemini API Key</label>
            <div className="flex gap-3">
              <div className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 italic flex items-center">
                 Using API Key from Environment
              </div>
              <button
                onClick={handleFetchModels}
                disabled={isLoadingModels || !apiKey}
                className="px-6 py-2.5 bg-gray-900 dark:bg-slate-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors font-medium text-sm flex items-center whitespace-nowrap"
              >
                {isLoadingModels ? <Loader2 className="animate-spin" size={18} /> : "Fetch Models"}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Key is loaded from process.env.API_KEY
            </p>
          </div>

          {models.length > 0 && (
             <div className="animate-in slide-in-from-top-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {models.map((m: any) => (
                  <option key={m.name} value={m.name.replace('models/', '')}>
                    {m.displayName} ({m.name.replace('models/', '')})
                  </option>
                ))}
              </select>
             </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Application Info</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <span className="block text-gray-500 text-xs uppercase">Engine</span>
              <span className="font-medium">Google Gemini</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <span className="block text-gray-500 text-xs uppercase">Methodology</span>
              <span className="font-medium">Abstract Syntax Tree (AST)</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <span className="block text-gray-500 text-xs uppercase">Version</span>
              <span className="font-medium">1.0.0-prototype</span>
            </div>
             <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <span className="block text-gray-500 text-xs uppercase">Environment</span>
              <span className="font-medium">Client-Side Only</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className={`flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans`}>
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 ease-in-out z-30 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-slate-800">
          {sidebarOpen ? (
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight">
              <ShieldAlert className="mr-2" />
              <span>CodeGuard</span>
            </div>
          ) : (
             <ShieldAlert className="mx-auto text-indigo-600 dark:text-indigo-400" />
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <nav>
            <div className={`text-xs font-semibold text-gray-400 uppercase mb-4 pl-4 ${!sidebarOpen && 'hidden'}`}>Analytics</div>
            <SidebarItem 
              icon={LayoutDashboard} 
              label={sidebarOpen ? "Dashboard" : ""} 
              active={activeTab === "dashboard"} 
              onClick={() => setActiveTab("dashboard")} 
            />
            <SidebarItem 
              icon={FileCode} 
              label={sidebarOpen ? "Detector" : ""} 
              active={activeTab === "detector"} 
              onClick={() => setActiveTab("detector")} 
            />
            
            <div className={`mt-8 text-xs font-semibold text-gray-400 uppercase mb-4 pl-4 ${!sidebarOpen && 'hidden'}`}>Data & Config</div>
            <SidebarItem 
              icon={Database} 
              label={sidebarOpen ? "Data Registry" : ""} 
              active={activeTab === "training"} 
              onClick={() => setActiveTab("training")} 
            />
            <SidebarItem 
              icon={Settings} 
              label={sidebarOpen ? "Settings" : ""} 
              active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")} 
            />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
          <div className={`bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white ${!sidebarOpen && 'hidden'}`}>
             <h4 className="font-bold text-sm mb-1">Pro Feature</h4>
             <p className="text-xs opacity-90 mb-3">Enable Cross-Language Detection</p>
             <button className="w-full py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition">Upgrade Plan</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center px-4 py-1.5 bg-gray-100 dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">System Operational</span>
             </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px]">
               <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-bold">
                  JS
               </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {activeTab === 'dashboard' && 'Analysis Dashboard'}
                {activeTab === 'detector' && 'Plagiarism Detector'}
                {activeTab === 'training' && 'Training & Test Data'}
                {activeTab === 'settings' && 'System Settings'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                 {activeTab === 'dashboard' && 'Real-time overview of code integrity checks.'}
                 {activeTab === 'detector' && 'Advanced AST-based code similarity analysis engine.'}
                 {activeTab === 'training' && 'Manage historical benchmarks and user submissions.'}
                 {activeTab === 'settings' && 'Configure API keys and model parameters.'}
              </p>
            </div>

            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "detector" && <DetectorView />}
            {activeTab === "training" && <TrainingDataView />}
            {activeTab === "settings" && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);