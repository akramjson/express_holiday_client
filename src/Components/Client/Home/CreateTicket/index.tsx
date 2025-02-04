import { useEffect, useState } from "react";
import { assets } from "../../../../assets";
import useCategories from "../../../../hooks/Cats/View/useCategories";
import useInputs from "../../../../hooks/Inputs/View/useInputs";
import useSubCategories from "../../../../hooks/SubCats/View/useSubCategories";
import DragFile from "../DragFile";
import Categories from "./Categories";
import CreateTicketForm from "./CreateTicketForm";
import SubCategories from "./SubCategories";

const CreateTicket = () => {
  const [selectedCat, setSelectedCat] = useState<string>();
  const [selectedSubCat, setSelectedSubCat] = useState<string>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { data: cats, isPending } = useCategories();

  const onSelectCat = (cat: string) => {
    setSelectedCat(cat);
    setSelectedSubCat(undefined);
  };

  const onSelectSubCat = (subcat: string) => {
    setSelectedSubCat(subcat);
  };

  const {
    refetch,
    data: subcats,
    isPending: isSubPending,
  } = useSubCategories(selectedCat);

  const {
    refetch: refetchInputs,
    data: inputs,
    isPending: isInputsPending,
  } = useInputs(selectedSubCat);

  useEffect(() => {
    if (selectedCat) {
      refetch();
    }
  }, [selectedCat]);

  useEffect(() => {
    if (selectedCat && selectedSubCat) {
      refetchInputs();
    }
  }, [selectedCat, selectedSubCat]);

  const resetAll = () => {
    setSelectedCat("");
    setSelectedSubCat("");
    setUploadedFiles([]);
  };

  return (
    <div className="w-[85%] mx-auto min-h-[350px] py-5 px-5 bg-white shadow-md rounded-3xl flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-medium">
          Need Assistance? We're Here to Help
        </h2>
        <img src={assets.airplane} alt="airplane" />
      </div>
      <div className="flex gap-5 w-full">
        <div className="w-[60%] min-h-[200px] flex flex-col gap-4">
          <Categories
            selectedCat={selectedCat}
            onSelect={onSelectCat}
            isLoading={isPending}
            categories={cats}
          />
          {selectedCat && (
            <SubCategories
              selectedSubCat={selectedSubCat}
              onSelect={onSelectSubCat}
              isLoading={isSubPending}
              subCategories={subcats?.sub_categories}
            />
          )}
          {selectedSubCat && (
            <CreateTicketForm
              inputs={inputs}
              selectedCat={selectedCat}
              resetAll={resetAll}
              selectedSubCat={selectedSubCat}
              isLoading={isInputsPending}
              uploadedFiles={uploadedFiles}
            />
          )}
        </div>
        <DragFile
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>
    </div>
  );
};

export default CreateTicket;
