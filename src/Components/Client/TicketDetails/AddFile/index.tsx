import { Button } from "../../../UI";

type AddFileProps = {
  handleFileChange: any;
  isPending: boolean;
};

const AddFile = ({ handleFileChange, isPending }: AddFileProps) => {
  return (
    <div className="relative">
      <Button
        variant={"ghost"}
        disabled={isPending}
        isLoading={isPending}
        className="h-[30px] rounded-full"
      >
        Add files
      </Button>
      <input
        // ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        disabled={isPending}
        multiple
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  );
};

export default AddFile;
