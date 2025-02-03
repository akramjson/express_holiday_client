import { cn } from "../../../utils/Cfunction";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-200/60", className)}
      {...props}
    />
  );
};

export default Skeleton;
