import { useState } from "react";
import { assets } from "../../../assets";
import { TicketsCard, TicketsTabs } from "../../../Components/Client/Tickets";
import { Button } from "../../../Components/UI";
import useTickets from "../../../hooks/Tickets/View/useTickets";
import { ticketSchematype } from "../../../types/Tickets/schema";
import { exportActivitiesToExcel } from "../../../utils/Excel/exportActivitiesToExcel ";

export type TabType = "open" | "closed" | "inprogress" | "all";
export type Tab = {
  id: TabType;
  label: string;
  icon?: string;
};
const AgentTicketsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { data: tickets, isPending, isError } = useTickets();

  const getFilteredTickets = () => {
    if (activeTab === "all") return tickets?.data;

    return tickets?.data?.filter((ticket: ticketSchematype) => {
      const ticketStatus = ticket?.status?.toLowerCase();
      switch (activeTab) {
        case "open":
          return ticketStatus === "open" || ticketStatus === "opened";
        case "inprogress":
          return ticketStatus === "inprogress";
        case "closed":
          return ticketStatus === "closed";
        default:
          return true;
      }
    });
  };

  const tabs: Tab[] = [
    { id: "all", label: "All Tickets", icon: assets.ticket },
    { id: "open", label: "Open" },
    { id: "inprogress", label: "In Progress" },
    { id: "closed", label: "Closed" },
  ];

  const filteredTickets = getFilteredTickets();

  const selectTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="w-[80%] mx-auto p-6">
        <div className="flex items-center justify-between">
          <TicketsTabs
            tabs={tabs}
            activeTab={activeTab}
            selectTab={selectTab}
          />
          <Button
            onClick={() => exportActivitiesToExcel(tickets.data)}
            variant={"ghost"}
            className="h-[35px] w-[200px] capitalize font-medium"
          >
            export tickets
          </Button>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-md shadow-sm border-[1px] ">
          {!Array.isArray(filteredTickets) || filteredTickets.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No tickets found for this status
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <TicketsCard key={ticket.id} ticket={ticket} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentTicketsPage;
