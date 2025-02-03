import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useCreateTicket from "../../../../hooks/Tickets/Create/useCreateTicket";
import { inputSchematype } from "../../../../types/Inputs/schema";
import { Button, Input, TextArea } from "../../../UI";
import { UploadedFile } from "../DragFile";

type CreateTicketFormProps = {
  inputs: inputSchematype[];
  selectedSubCat: string | undefined;
  isLoading: boolean;
  uploadedFiles: UploadedFile[];
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
  isLoading,
  selectedSubCat,
}: CreateTicketFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Array to track selected values for "multiple" inputs
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

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

  const onSubmitForm = (data: FormValues) => {
    console.log(selectedValues, "selected");

    const formattedData = formatDataForSubmission(data);
    console.log(formattedData?.responses);
    console.log(formattedData, "s7i7a");

    const newData = {
      sub_category: selectedSubCat,
      responses: formattedData?.responses.push(...selectedValues),
    };

    createTicketMutation.mutate(
      formattedData
      // ...formattedData,
      // responses: formattedData.responses.push(...selectedValues),
    );
    console.log(newData, "fadfsadf");
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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
      {inputs?.map((input) => renderInputs(input, register, control, errors))}
      <Button
        type="submit"
        variant="outline"
        className="font-bold capitalize w-full"
      >
        {isLoading ? "Creating..." : "Create Ticket"}
      </Button>
    </form>
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
  register,
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
    <div className="space-y-2">
      <h2 className="text-xl font-medium text-primary">{input.label}</h2>
      <div className="flex flex-col gap-4">
        {input?.options?.map((option) => (
          <button
            type="button"
            className={`${
              selectedValues.some((val: any) => val.response === option.value)
                ? "bg-red-300"
                : ""
            }`}
            onClick={() => selectShkpi(option)}
            key={option.option_id}
          >
            {option.value}
          </button>
        ))}
      </div>

      {errors[`multiple_${input.input_id}`] && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
};

export default CreateTicketForm;
