import { Tab, TabType } from "../../../../Pages/Client/ClientTickets";

type TicketTabsProps = {
  tabs: Tab[];
  activeTab: TabType;
  selectTab: (tab: TabType) => void;
};

const TicketsTabs = ({ activeTab, tabs, selectTab }: TicketTabsProps) => {
  return (
    <div className="flex gap-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 text-sm flex items-center gap-2 font-medium rounded-md transition-colors ${
            activeTab === tab.id
              ? "text-[#1640D6] font-bold underline"
              : "text-gray-500 hover:bg-gray-50"
          } duration-300 ease-linear`}
          onClick={() => selectTab(tab.id)}
        >
          <img src={tab.icon} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TicketsTabs;
