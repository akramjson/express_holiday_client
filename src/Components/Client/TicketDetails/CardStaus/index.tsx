import { useEffect, useState } from "react";
import { assets } from "../../../../assets";
import useEditTicket from "../../../../hooks/Tickets/Edit/useEditTicket";
import ChangeStatus from "../ChangeStatus";

type CardStausProps = {
  ticket: any;
};
const CardStaus = ({ ticket }: CardStausProps) => {
  console.log(ticket, "ticket");

  const [selectedStatus, setSelectedStauts] = useState(ticket?.status);
  console.log(selectedStatus, "selected status");

  const [isOpen, setIsOpen] = useState(false);
  const editTicketMutation = useEditTicket(ticket?.ticket_id);

  useEffect(() => {
    if (ticket?.status !== selectedStatus) {
      setSelectedStauts(ticket?.status);
    }
  }, [ticket?.status]);
  const changeStatus = (status: string) => {
    editTicketMutation.mutate(
      { status: status },
      {
        onSuccess: () => {
          setSelectedStauts(status); // Update the UI immediately
          setIsOpen(false); // Close the dropdown
        },
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-[#15822C]";
      case "Closed":
        return "bg-[#002379]";
      case "Inprogress":
        return "bg-[#7F5E0C]";
      default:
        return "bg-gray-500";
    }
  };

  const items = [
    {
      label: "Ticket Number",
      value: `#Ticket #${ticket?.ticket_id}`,
    },
    {
      label: "Created at",
      value: ticket?.created_at,
    },
    {
      label: "Category",
      value: ticket?.category,
    },
    {
      label: "Last Update at",
      value: ticket?.updated_at,
    },
  ];

  return (
    <div className="py-10 px-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Ticket Details</h2>
        <div className="flex items-center gap-3 relative">
          <span
            className={`min-w-[50px] text-center px-4 capitalize text-lg font-medium text-white flex items-center gap-2 rounded-full ${getStatusColor(
              selectedStatus
            )}`}
          >
            {selectedStatus || "Unknown"}
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <assets.arrowDownIcon />
            </button>
          </span>
          {isOpen && (
            <ChangeStatus
              changeStauts={changeStatus}
              ticket={ticket}
              getStatusColor={getStatusColor}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <h2 className="capitalize text-[#8A8A8A] font-medium">
              {item.label}
            </h2>
            <h4 className="capitalize font-semibold">{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStaus;
