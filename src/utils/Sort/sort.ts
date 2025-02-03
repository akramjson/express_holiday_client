const ascendingSort = (data: any[], key: string) => {
  return data?.sort((a, b) => {
    const valA = a[key]?.toString().toLowerCase() ?? "";
    const valB = b[key]?.toString().toLowerCase() ?? "";
    return valA < valB ? -1 : valA > valB ? 1 : 0;
  });
};

const descendingSort = (data: any[], key: string) => {
  return data?.sort((a, b) => {
    const valA = a[key]?.toString().toLowerCase() ?? "";
    const valB = b[key]?.toString().toLowerCase() ?? "";
    return valA > valB ? -1 : valA < valB ? 1 : 0;
  });
};

export const sortingFunctions: Record<
  "ascending" | "descending",
  (data: any[], key: string) => any[]
> = {
  ascending: ascendingSort,
  descending: descendingSort,
};
