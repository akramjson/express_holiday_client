import { IconType } from "react-icons";

export type SortOptions = {
  key: string;
  label: string;
};

export type Sort = {
  availableOptions: SortOptions[];
};

export type SearchOptions = {
  caseSensitive?: boolean;
  searchableColumns?: string[];
  matchMode?: "includes" | "startsWith" | "endsWith" | "exact";
};

export type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
};

export type TableColumn = {
  key: string;
  label: string;
  Icon?: IconType;
  iconPosition?: "left" | "right";
  sort?: Sort;
};

export type Option = {
  name: string;
  Icon: IconType;
  iconPosition: "left" | "right";
  action: () => void;
};
