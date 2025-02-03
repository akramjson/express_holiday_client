import { ReactNode } from "react";
import TableSearch from "../TableSearch";

type TableHeaderProps = {
  search?: boolean;
  onSearch: (query: string) => void;
  searchQuery: string;
  headerContent: ReactNode;
};

const TableHeader = ({
  search,
  onSearch,
  searchQuery,
  headerContent,
}: TableHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <>{headerContent}</>
      <div className="flex items-center gap-4">
        {search && (
          <TableSearch onSearch={onSearch} searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default TableHeader;
