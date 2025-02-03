type SkeletonProps = {
  length: number;
};
const TableSkeleton = ({ length }: SkeletonProps) => {
  return (
    <>
      {[...Array(length)].map((_, index) => (
        <div
          key={index}
          className="w-full py-5 h-[3rem] flex items-center skeleton relative shadow-md px-2 rounded-md"
        ></div>
      ))}
    </>
  );
};

export default TableSkeleton;
