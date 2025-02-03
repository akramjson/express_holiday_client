import { ReactNode } from "react";
import TableDataHead from "./head";
import TableHeader from "./TableHeader";
import { SortConfig, TableColumn } from "./types/table";

type TableDataProps = {
  children: ReactNode;
  cols: TableColumn[];
  search: boolean;
  sortConfig: SortConfig;
  searchQuery: string;
  onSort: (key: string) => void;
  onSearch: (query: string) => void;
  headerContent?: ReactNode;
  isAllSelected: boolean;
  toggleSelectAll: () => void;
};

const TableData = ({
  children,
  cols,
  search = false,
  searchQuery,
  sortConfig,
  onSearch,
  onSort,
  headerContent,
  isAllSelected,
  toggleSelectAll,
}: TableDataProps) => {
  return (
    <div className="flex flex-col gap-7 w-full bg-white px-4 py-6 rounded-lg border-[1px] border-[#E9ECEF]">
      <TableHeader
        headerContent={headerContent}
        search={search}
        searchQuery={searchQuery}
        onSearch={onSearch}
      />
      <div className="flex items-center flex-col gap-2 w-full">
        <TableDataHead
          cols={cols}
          sortConfig={sortConfig}
          onSort={onSort}
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
        />
        <>{children}</>
      </div>
    </div>
  );
};

export default TableData;
