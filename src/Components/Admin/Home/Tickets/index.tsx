import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../../assets";
import useTickets from "../../../../hooks/Tickets/View/useTickets";
import { ticketSchematype } from "../../../../types/Tickets/schema";
import { TicketsCard, TicketsTabs } from "../../../Client/Tickets";
import { Button } from "../../../UI";

export type TabType = "open" | "closed" | "inprogress" | "all";
export type Tab = {
  id: TabType;
  label: string;
  icon?: string;
};
const Tickets = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { data: tickets, isPending, isError } = useTickets();

  const getFilteredTickets = () => {
    if (activeTab === "all") return tickets?.data?.slice(0, 3);

    return tickets?.data?.slice(0, 3)?.filter((ticket: ticketSchematype) => {
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

  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full mx-auto p-6">
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
        <div className="flex justify-end mt-1">
          <Button
            variant={"ghost"}
            className="capitalize w-[200px] font-medium"
            onClick={() => navigate("/dashboard/tickets")}
          >
            view more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
