import { assets } from "../../../../assets";
import useAgentsTable from "../../../../hooks/Agents/Table/useAgentsTable";
import { registerSchemaType } from "../../../../types/Register/schema";
import { userSchemaType } from "../../../../types/User/schema";
import { Button, TableData, TableSelect, TableSkeleton } from "../../../UI";
import TableOptionMenu from "../../../UI/TableData/TableOptionMenu";
import RemoveAgent from "../Delete/RemoveAgent";
import EditAgent from "../Edit/EditAgent";
import ProjectName from "./ProjectName";

type AgentsTableProps = {
  onOpen: () => void;
  agents: userSchemaType[];
  isPending: boolean;
};

const AgentsTable = ({ onOpen, agents, isPending }: AgentsTableProps) => {
  const {
    cols,
    onSearch,
    handleSort,
    searchQuery,
    sortConfig,
    isAllSelected,
    toggleSelectAll,
    processedData,
    toggleSelectRow,
    selectedRows,
    options,
    action,
    selectAction,
    unselectAction,
    selectedProject,
    unselectRows,
  } = useAgentsTable(agents);

  return (
    <TableData
      cols={cols}
      search
      onSearch={onSearch}
      onSort={handleSort}
      searchQuery={searchQuery}
      sortConfig={sortConfig}
      isAllSelected={isAllSelected}
      toggleSelectAll={toggleSelectAll}
    >
      <div className="w-full">
        {isPending ? (
          <TableSkeleton length={4} />
        ) : (
          <>
            {processedData?.length > 0 ? (
              processedData?.map((agent: registerSchemaType) => (
                <div
                  key={agent.phone_number}
                  className="flex items-center w-full bg-[#D9D9D90D] rounded-md p-3 border-b-[1px] border-[#E9ECEF] hover:bg-[#d9d9d91e] hover:shadow-md duration-200 ease-linear"
                >
                  <TableSelect
                    onSelect={() => toggleSelectRow(agent)}
                    isSelected={selectedRows.some(
                      (selected) => selected.phone_number === agent.phone_number
                    )}
                    className="mr-4"
                  />
                  <div className="grid grid-cols-6 gap-4 items-center w-full">
                    {/* Project Name Column */}
                    <div className="overflow-hidden">
                      <ProjectName
                        first_name={agent.first_name}
                        last_name={agent.last_name}
                      />
                    </div>
                    {/* Category Column */}
                    <div className="truncate">
                      <h4 className="text-sm font-medium">{agent.category}</h4>
                    </div>
                    {/* Number Column */}
                    <div className="text-center">
                      <h4 className="text-sm font-medium">23</h4>
                    </div>
                    {/* Value Column */}
                    <div className="text-right">
                      <h4 className="text-sm font-medium">2000 dzd</h4>
                    </div>
                    {/* Phone Number Column */}
                    <div className="text-right ml-44">
                      <h4 className="text-sm font-medium">
                        {agent.phone_number}
                      </h4>
                    </div>
                    {/* Actions Column */}
                  </div>
                  <TableOptionMenu options={() => options(agent)} />
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center h-[50vh]">
                <div className="flex flex-col gap-3 items-center">
                  <h2 className="text-2xl font-bold text-[#0A0908]">
                    No Agents Yet
                  </h2>
                  <p className="text-sm text-[#CED4DA] w-[60%] mx-auto text-center">
                    Looks like you don't have any agents yet. Create your first
                    agent to get started
                  </p>
                  <Button
                    icon={assets.doneIcon}
                    variant="solid"
                    size="md"
                    onClick={onOpen}
                  >
                    Create Agent
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {action === "remove" && (
        <RemoveAgent agent={selectedProject} onClose={unselectAction} />
      )}
      {action === "edit" && (
        <EditAgent
          onClose={unselectAction}
          agent={selectedProject}
          remove={() => selectAction("edit")}
        />
      )}
    </TableData>
  );
};

export default AgentsTable;
