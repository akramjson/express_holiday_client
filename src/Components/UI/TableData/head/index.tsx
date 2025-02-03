import TableSelect from "../Table_Select";
import { SortConfig, TableColumn } from "../types/table";
import TableDataHeadItem from "./TableDataHeadItem";

type TableDataHead = {
  cols: TableColumn[];
  onSort: (key: string) => void;
  isAllSelected: boolean;
  toggleSelectAll: () => void;
  sortConfig: SortConfig;
};

const TableDataHead = ({
  cols,
  onSort,
  isAllSelected,
  sortConfig,
  toggleSelectAll,
}: TableDataHead) => {
  return (
    <div className="flex items-center gap-3 w-full bg-[#D9D9D90D] rounded-md p-2 border-b-[1px] border-[#E9ECEF] hover:bg-[#d9d9d91e] duration-200 ease-linear">
      <TableSelect isSelected={isAllSelected} onSelect={toggleSelectAll} />
      <div className="flex items-center justify-between w-full">
        {cols.map((col) => (
          <TableDataHeadItem
            key={col.key}
            col={col}
            onSort={onSort}
            sortConfig={sortConfig}
          />
        ))}
      </div>
    </div>
  );
};

export default TableDataHead;
