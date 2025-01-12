import { Library, Activity, User, Settings } from "lucide-react";

const sidebarItems = [
  { id: "library", icon: Library, label: "Step Library" },
  { id: "dashboard", icon: User, label: "Dashboard" },
  { id: "analytics", icon: Activity, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
] as const;

interface NavigationSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isDarkMode: boolean;
}

const NavigationSidebar = ({
  activeTab,
  onTabChange,
  isDarkMode,
}: NavigationSidebarProps) => {
  return (
    <div
      className={`w-64 p-4 border-r ${
        isDarkMode
          ? "bg-[#2a2a2a] border-[#3a3a3a]"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="space-y-2">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 w-full p-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? isDarkMode
                    ? "bg-[#3a3a3a] text-gray-100"
                    : "bg-gray-100 text-gray-900"
                  : isDarkMode
                    ? "text-gray-400 hover:bg-[#3a3a3a] hover:text-gray-100"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { sidebarItems };
export default NavigationSidebar;
