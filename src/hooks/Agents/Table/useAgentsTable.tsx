import { useMemo, useState } from "react";
import { assets } from "../../../assets";
import { Option, SortConfig, TableColumn } from "../../../types/table/table";
import { userSchemaType } from "../../../types/User/schema";
import { handleSearch } from "../../../utils/Filter/filter";
import { sortingFunctions } from "../../../utils/Sort/sort";

const useAgentsTable = (agents: userSchemaType[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>({});
  const [action, setAction] = useState<"edit" | "remove" | null>(null);

  const selectAction = (action: "edit" | "remove" | null) => {
    setAction(action);
  };

  const unselectAction = () => {
    setAction(null);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(agents, searchQuery);
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const processedData = useMemo(() => {
    let filteredData = handleSearch(agents, searchQuery);
    if (sortConfig.key) {
      const sortFunction = sortingFunctions[sortConfig.direction];
      filteredData = sortFunction(filteredData, sortConfig.key);
    }
    return filteredData;
  }, [agents, searchQuery, sortConfig]);

  const toggleSelectRow = (member: any) => {
    setSelectedRows((prevSelected) =>
      prevSelected.some(
        (selected) => selected.phone_number === member.phone_number
      )
        ? prevSelected.filter(
            (selected) => selected.phone_number !== member.phone_number
          )
        : [...prevSelected, member]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === processedData?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(processedData || []);
    }
  };

  const isAllSelected =
    processedData?.length > 0 && selectedRows.length === processedData?.length;

  const options = (item: any): Option[] => [
    {
      name: "edit project",
      Icon: assets.doneIcon,
      iconPosition: "left",
      action: () => {
        setSelectedProject(item);
        setAction("edit");
      },
    },
    {
      name: "remove project",
      Icon: assets.closeBtnIcon,
      iconPosition: "left",
      action: () => {
        setSelectedProject(item);
        setAction("remove");
      },
    },
  ];

  const cols: TableColumn[] = [
    {
      key: "first_name",
      label: "full name",
      sort: {
        availableOptions: [
          {
            key: "ascending",
            label: "ascending",
          },
          {
            key: "descending",
            label: "descending",
          },
        ],
      },
    },
    {
      key: "category",
      label: "category",
    },
    {
      key: "Tickets number", // Changed to match the key in data
      label: "Tickets number",
    },
    {
      key: "Due Amount",
      label: "Due Amount",
    },
    {
      key: "phone_number",
      label: "phone number",
    },
  ];

  const unselectRows = () => {
    setSelectedRows([]);
  };

  return {
    searchQuery,
    onSearch,
    handleSort,
    sortConfig,
    isAllSelected,
    toggleSelectAll,
    toggleSelectRow,
    selectAction,
    unselectAction,
    action,
    processedData,
    selectedProject,
    options,
    cols,
    selectedRows,
    unselectRows,
  };
};

export default useAgentsTable;
