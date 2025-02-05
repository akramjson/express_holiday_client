import PasangerCard from "./PasangerCard";

type TicketResponseCardProps = {
  ticket: any;
};

const TicketResponseCard = ({ ticket }: TicketResponseCardProps) => {
  console.log(ticket, "data");

  const renderResponses = (res) => {
    switch (res.input.type) {
      case "text":
      case "textarea":
        return (
          <div className="flex flex-col">
            <h2 className="capitalize text-[#8A8A8A] font-medium">
              {res?.input?.label}
            </h2>
            <h4 className="font-medium capitalize max-h-[140px]">
              {res.response}
            </h4>
          </div>
        );

      case "array":
        if (res.input.label && Array.isArray(res.response)) {
          const isPassagers = res.input.label
            .toLowerCase()
            .includes("passagers");
          return (
            <div className="flex flex-col gap-3">
              <h2 className="capitalize text-[#8A8A8A] font-medium">
                {res.input.label}
              </h2>
              {isPassagers ? (
                <div className="flex flex-wrap gap-4">
                  {res.response.map((group, groupIndex) => (
                    <PasangerCard
                      group={group}
                      key={groupIndex}
                      groupIndex={groupIndex}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {res.response.map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="p-4 bg-gray-100 rounded-lg shadow-md"
                    >
                      {group.map((item, index) => (
                        <div key={index} className="mb-2">
                          <h4 className="font-medium capitalize">
                            {item.input.label}:
                          </h4>
                          <p className="text-sm text-gray-700">
                            {item.response}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="w-[60%] overflow-y-hidden p-10 h-[500px] bg-white shadow-lg rounded-md flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl capitalize font-semibold">
          {ticket?.category}
        </h2>
        <div className="flex flex-col gap-4">
          {ticket?.responses?.map((res) => (
            <div key={res.input_id}>{renderResponses(res)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketResponseCard;
