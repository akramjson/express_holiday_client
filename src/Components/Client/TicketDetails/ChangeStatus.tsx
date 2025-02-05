type ChangeStatusProps = {
  ticket: any;
  getStatusColor: any;
  changeStauts: any;
};

const ChangeStatus = ({
  ticket,
  getStatusColor,
  changeStauts,
}: ChangeStatusProps) => {
  const status = ["Open", "Closed", "Inprogress"];
  return (
    <div className="absolute top-10 right-0 rounded-md p-2 bg-white shadow-2xl border-2 flex flex-col gap-2 min-h-[70px] min-w-[140px]">
      {status.map((item, index) => (
        <button
          key={index}
          onClick={() => changeStauts(item)}
          className={`min-w-[50px] text-center px-4 capitalize text-lg font-medium text-white flex items-center gap-2 rounded-full ${getStatusColor(
            item
          )}`}
        >
          {item || "Unknown"}
        </button>
      ))}
    </div>
  );
};

export default ChangeStatus;
