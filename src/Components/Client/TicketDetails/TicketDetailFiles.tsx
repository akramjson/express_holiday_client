import CardStaus from "./CardStaus";
import TicketFiles from "./TicketFiles";

type TicketDetailFilesProps = {
  ticket: any;
};

const TicketDetailFiles = ({ ticket }: TicketDetailFilesProps) => {
  return (
    <div className="w-[40%] flex flex-col gap-5">
      <div className="h-[350px] w-full flex flex-col shadow-sm bg-white overflow-y-auto">
        <CardStaus ticket={ticket} />
      </div>
      <div className="h-[150px] w-full flex flex-col shadow-sm bg-white overflow-y-auto">
        <TicketFiles ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketDetailFiles;
