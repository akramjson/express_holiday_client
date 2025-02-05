import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../../assets";
import useTickets from "../../../../hooks/Tickets/View/useTickets";
import { ticketSchematype } from "../../../../types/Tickets/schema";
import { TicketsCard, TicketsTabs } from "../../../Client/Tickets";
import { Button } from "../../../UI";

export type TabType = "open" | "closed" | "inprogress" | "resolved" | "all";
export type Tab = {
  id: TabType;
  label: string;
  icon?: string;
};

const SkeletonTicketCard = () => (
  <div className="animate-pulse bg-gray-200 p-4 rounded-md h-20 w-full mb-2"></div>
);

const Tickets = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const limit = 3;
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

  return (
    <div>
      <div className="">
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
              <TicketsCard key={ticket.ticket_id} ticket={ticket} />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button
          onClick={() => navigate("tickets")}
          variant={"outline"}
          className="w-52 capitalize"
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default Tickets;
