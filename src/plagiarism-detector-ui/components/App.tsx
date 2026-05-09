import React, { useState, useEffect, useMemo } from "react";
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

/**
 * Main App Component
 * Root component for the plagiarism detection UI
 */
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-blue-600" size={28} />
                <span className="text-xl font-bold">Code Plagiarism Detector</span>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>

        <div className="flex gap-6 p-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          {sidebarOpen && (
            <div className="w-64 bg-gray-50 dark:bg-slate-800 p-4 rounded-lg h-fit sticky top-24">
              <nav className="space-y-2">
                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                <NavItem icon={<FileCode size={20} />} label="Comparisons" />
                <NavItem icon={<Database size={20} />} label="History" />
                <NavItem icon={<Activity size={20} />} label="Statistics" />
                <NavItem icon={<Settings size={20} />} label="Settings" />
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * NavItem Component
 */
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      active
        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

/**
 * Dashboard Component
 */
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Comparisons" value="1,248" icon={<Code2 />} />
        <StatCard title="Plagiarism Found" value="87" icon={<ShieldAlert />} />
        <StatCard title="Clean Files" value="1,161" icon={<CheckCircle2 />} />
        <StatCard title="Success Rate" value="93.2%" icon={<BarChart3 />} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Recent Comparisons">
          <ComparisonsList />
        </Card>
        <Card title="Detection Methods">
          <MethodsChart />
        </Card>
      </div>
    </div>
  );
};

/**
 * StatCard Component
 */
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className="text-blue-600 dark:text-blue-400 opacity-75">{icon}</div>
    </div>
  </div>
);

/**
 * Card Component
 */
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

/**
 * ComparisonsList Component
 */
const ComparisonsList: React.FC = () => (
  <div className="space-y-3">
    {[
      { name: "utils.ts", similarity: 78, verdict: "Suspected" },
      { name: "api.ts", similarity: 45, verdict: "Clean" },
      { name: "main.ts", similarity: 92, verdict: "Plagiarism" }
    ].map((item, i) => (
      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded">
        <div className="flex items-center gap-2">
          <FileCode size={16} />
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{item.similarity}%</span>
          <Badge variant={item.verdict as any}>{item.verdict}</Badge>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Badge Component
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: "Clean" | "Suspected" | "Plagiarism";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "Clean" }) => {
  const variantClass = {
    Clean: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Suspected: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Plagiarism: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${variantClass[variant]}`}>
      {children}
    </span>
  );
};

/**
 * MethodsChart Component
 */
const MethodsChart: React.FC = () => {
  const data = [
    { name: "AST", value: 45 },
    { name: "Similarity", value: 30 },
    { name: "Pattern", value: 25 }
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name} ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default App;
