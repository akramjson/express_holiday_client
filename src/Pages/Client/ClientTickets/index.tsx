import { useState } from "react";
import { assets } from "../../../assets";
import { TicketsCard, TicketsTabs } from "../../../Components/Client/Tickets";
import useTickets from "../../../hooks/Tickets/View/useTickets";
import { ticketSchematype } from "../../../types/Tickets/schema";

export type TabType = "open" | "closed" | "inprogress" | "resolved" | "all";
export type Tab = {
  id: TabType;
  label: string;
  icon?: string;
};
const ClientTicketsPage = () => {
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
        case "resolved":
          return ticketStatus === "resolved";
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
    { id: "resolved", label: "Resolved" },
  ];

  const filteredTickets = getFilteredTickets();

  const selectTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="w-[60%] mx-auto p-6">
        <TicketsTabs tabs={tabs} activeTab={activeTab} selectTab={selectTab} />

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

export default ClientTicketsPage;
