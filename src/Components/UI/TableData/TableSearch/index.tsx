import Input from "../../Input";

type TableSearchProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

const TableSearch = ({ searchQuery, onSearch }: TableSearchProps) => {
  return (
    <Input
      variant={"solid"}
      placeholder="search"
      className="w-[350px]"
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default TableSearch;
