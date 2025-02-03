export const handleSearch = (data: any, query: any) => {
  const lowerCaseQuery = query?.toString()?.toLowerCase();

  return data?.filter((item: any) =>
    Object.values(item)?.some((value) =>
      value?.toString()?.toLowerCase()?.includes(lowerCaseQuery)
    )
  );
};
