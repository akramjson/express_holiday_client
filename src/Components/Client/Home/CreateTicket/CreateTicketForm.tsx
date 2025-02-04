import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCreateTicketFileFetch from "../../../../hooks/Files/Create/useCreateTicketFileFetch";
import useCreateTicket from "../../../../hooks/Tickets/Create/useCreateTicket";
import { inputSchematype } from "../../../../types/Inputs/schema";
import { Button, Informer, Input, TextArea } from "../../../UI";

type CreateTicketFormProps = {
  inputs: inputSchematype[];
  selectedSubCat: string | undefined;
  isLoading: boolean;
  uploadedFiles: File[];
  resetAll: VoidFunction;
};

type ResponseItem = {
  input_id: number;
  response: string;
};

type TicketFormData = {
  sub_category: string;
  responses: (ResponseItem | ResponseItem[])[];
};

type FormValues = {
  [key: string]: any;
};

const CreateTicketForm = ({
  inputs,
  selectedSubCat,
  uploadedFiles,
  resetAll,
}: CreateTicketFormProps) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [informer, setInformer] = useState<{
    title: string;
    description: string;
    type: "success" | "error";
    isActive: boolean;
  }>({
    title: "",
    description: "",
    type: "success",
    isActive: false,
  });

  const formatDataForSubmission = (data: FormValues): TicketFormData => {
    const responses = inputs?.flatMap((input) => {
      if (input.type === "multiple") {
        // For multiple selections, include the selected values
        const selectedResponses = selectedValues.filter((val: any) =>
          data[`multiple_${input.input_id}`]?.includes(val.response)
        );
        return selectedResponses.map((value: any) => ({
          input_id: input.input_id,
          response: value.response,
        }));
      } else if (input.type === "array" && input.array) {
        // Handle array inputs
        const groupedResponses = (data[`array_${input.input_id}`] || []).map(
          (group: any) =>
            Object.entries(group)
              .filter(([key]) => key.startsWith("field_"))
              .map(([key, value]) => ({
                input_id: parseInt(key.split("_")[1]),
                response: value as string,
              }))
        );
        return groupedResponses.length > 0 ? [groupedResponses] : [];
      } else {
        // Handle standard text or textarea inputs
        const value = data[`field_${input.input_id}`];
        return value ? [{ input_id: input.input_id, response: value }] : [];
      }
    });

    return { sub_category: selectedSubCat || "", responses };
  };

  const createTicketMutation = useCreateTicket();
  // const createFileForTicket = useCreateTicketFile();
  const createFileForTicket = useCreateTicketFileFetch();
  const navigate = useNavigate();
  const onSubmitForm = (data: FormValues) => {
    const formattedData = formatDataForSubmission(data);

    createTicketMutation.mutate(formattedData, {
      onSuccess: (response) => {
        console.log("Files about to upload:", uploadedFiles);
        console.log("Ticket ID:", response?.ticket_id);
        setInformer({
          title: "Success!",
          description: "Your ticket was created successfully.",
          type: "success",
          isActive: true,
        });
        reset();
        if (response?.ticket_id && uploadedFiles.length > 0) {
          createFileForTicket.mutate(
            {
              ticket_id: response.ticket_id,
              files: uploadedFiles,
            },
            {
              onSuccess: () => {
                setInformer({
                  title: "Success!",
                  description: "Your file has was uploaded successfully.",
                  type: "success",
                  isActive: true,
                });
                resetAll();
                setTimeout(() => {
                  navigate(`tickets/${response.ticket_id}`);
                }, 500);
              },
              onError: () => {
                setInformer({
                  title: "Error!",
                  description: "There was an issue creating your file.",
                  type: "error",
                  isActive: true,
                });
              },
            }
          );
        }
      },
      onError: (err) => {
        console.log(err);

        setInformer({
          title: "Error!",
          description: "There was an issue creating your ticket.",
          type: "error",
          isActive: true,
        });
      },
    });
  };

  const renderInputs = (
    input: inputSchematype,
    register: any,
    control: any,
    errors: any
  ) => {
    switch (input.type) {
      case "text":
        return (
          <Input
            key={input.input_id}
            label={input.label}
            placeholder={`Enter ${input.label}`}
            required={input.required}
            {...register(`field_${input.input_id}`, {
              required: input.required,
            })}
            error={errors[`field_${input.input_id}`]?.message}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            key={input.input_id}
            label={input.label}
            placeholder={`Enter ${input.label}`}
            required={input.required}
            {...register(`field_${input.input_id}`, {
              required: input.required,
            })}
            error={errors[`field_${input.input_id}`]?.message}
          />
        );
      case "textarea":
        return (
          <TextArea
            className="w-full min-h-[200px]"
            key={input.input_id}
            label={input.label}
            placeholder={`Enter ${input.label}`}
            required={input.required}
            {...register(`field_${input.input_id}`, {
              required: input.required,
            })}
            error={errors[`field_${input.input_id}`]?.message}
          />
        );
      case "array":
        return (
          <ArrayFieldSet
            key={input.input_id}
            input={input}
            control={control}
            register={register}
            errors={errors}
          />
        );
      case "multiple":
        return (
          <MultipleSelect
            key={input.input_id}
            input={input}
            register={register}
            errors={errors}
            setSelectedValues={setSelectedValues} // Pass the setter function to update selected values
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
        {inputs?.map((input) => renderInputs(input, register, control, errors))}
        <Button
          type="submit"
          variant="outline"
          className="font-bold capitalize w-full"
          isLoading={
            createTicketMutation.isPending || createFileForTicket.isPending
          }
          disabled={
            createTicketMutation.isPending || createFileForTicket.isPending
          }
        >
          Create Ticket
        </Button>
      </form>
      <Informer
        title={informer.title}
        description={informer.description}
        type={informer.type}
        isActive={informer.isActive}
        onClose={() =>
          setInformer((prev) => ({
            ...prev,
            isActive: false,
          }))
        }
      />
    </>
  );
};

const ArrayFieldSet = ({
  input,
  control,
  register,
  errors,
}: {
  input: inputSchematype;
  control: any;
  register: any;
  errors: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `array_${input.input_id}`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{input.label}</label>
        <Button type="button" variant="outline" onClick={() => append({})}>
          Add Entry
        </Button>
      </div>
      {fields?.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Entry {index + 1}</span>
            <Button type="button" variant="ghost" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
          {input?.array?.map((arrayInput: any) => (
            <Input
              key={arrayInput.input_id}
              label={arrayInput.label}
              {...register(
                `array_${input.input_id}.${index}.field_${arrayInput.input_id}`,
                { required: arrayInput.required }
              )}
              error={
                errors[`array_${input.input_id}`]?.[index]?.[
                  `field_${arrayInput.input_id}`
                ]?.message
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const MultipleSelect = ({
  input,
  errors,
  setSelectedValues,
}: {
  input: inputSchematype;
  register: any;
  errors: any;
  setSelectedValues: React.Dispatch<React.SetStateAction<any[]>>; // Added setter for selectedValues
}) => {
  const [selectedValues, setSelectedValuesInternal] = useState<any[]>([]);

  const selectShkpi = (option: any) => {
    if (selectedValues.some((val: any) => val.response === option.value)) {
      // If option is already selected, remove it
      const filteredOptions = selectedValues.filter(
        (value: any) => value.response !== option.value
      );
      setSelectedValuesInternal(filteredOptions);
    } else {
      // Add new selection with input_id and response value
      setSelectedValuesInternal([
        ...selectedValues,
        { input_id: input.input_id, response: option.value },
      ]);
    }
  };

  // Update the parent state with selected values
  setSelectedValues(selectedValues);

  return (
    <div className="space-y-2 bg-white rounded-md">
      <h2 className="font-medium">{input.label}*</h2>
      <div className="flex flex-col gap-2">
        {input?.options?.map((option: any) => (
          <div
            className={` p-2 flex justify-start  shadow-md gap-4 rounded-md duration-200 ease-linear capitalize font-medium`}
            key={option.option_id}
          >
            <button
              onClick={() => selectShkpi(option)}
              type="button"
              className={`w-5 h-5 ${
                selectedValues.some((val: any) => val.response === option.value)
                  ? "bg-primary"
                  : "bg-neutral-300"
              }  rounded-md ease-linear duration-200`}
            ></button>
            {option.value}
          </div>
        ))}
      </div>

      {errors[`multiple_${input.input_id}`] && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
};

export default CreateTicketForm;
