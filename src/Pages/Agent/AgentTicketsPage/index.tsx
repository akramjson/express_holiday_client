import { useState } from "react";
import { assets } from "../../../assets";
import { TicketsTabs } from "../../../Components/Client/Tickets";
import { Button } from "../../../Components/UI";
import useTickets from "../../../hooks/Tickets/View/useTickets";
import { ticketSchematype } from "../../../types/Tickets/schema";
import AgentTicketsCard from "./AgentTicketsCard";

export type TabType = "open" | "closed" | "inprogress" | "resolved" | "all";
export type Tab = {
  id: TabType;
  label: string;
  icon?: string;
};

const SkeletonTicketCard = () => (
  <div className="animate-pulse bg-gray-200 p-4 rounded-md h-20 w-full mb-2"></div>
);

const AgentTicketsPage = () => {
  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const limit = 5;
  const { data: tickets, isPending } = useTickets({
    offset,
    limit,
  });

  const getFilteredTickets = () => {
    if (activeTab === "all") return tickets?.data || [];

    return (
      tickets?.data?.filter((ticket: ticketSchematype) => {
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
      }) || []
    );
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
    setOffset(0); // Reset pagination when switching tabs
  };

  const next = () => {
    if (tickets?.data?.length === limit) {
      setOffset(offset + limit);
    }
  };

  const prev = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <div>
      <div className="w-[60%] mx-auto p-6">
        <TicketsTabs tabs={tabs} activeTab={activeTab} selectTab={selectTab} />

        {/* Tickets List */}
        <div className="bg-white rounded-md shadow-sm border-[1px] p-4">
          {isPending ? (
            Array.from({ length: limit }).map((_, idx) => (
              <SkeletonTicketCard key={idx} />
            ))
          ) : !filteredTickets.length ? (
            <div className="text-center text-gray-500 py-8">
              No tickets found for this status
            </div>
          ) : (
            filteredTickets.map((ticket: any) => (
              <AgentTicketsCard key={ticket.ticket_id} ticket={ticket} />
            ))
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="solid"
            className="w-[200px] capitalize"
            onClick={prev}
            disabled={offset === 0}
          >
            Previous
          </Button>
          <Button
            variant="solid"
            className="w-[200px] capitalize"
            onClick={next}
            disabled={tickets?.data?.length < limit}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentTicketsPage;
