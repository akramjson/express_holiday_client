import { useState } from "react";
import { Button } from "../../../Components/UI";
import { inputSchematype } from "../../../types/Inputs/schema";
import Input from "../Input";

type ArrayInputProps = {
  input: inputSchematype;
};

const ArrayInput = ({ input }: ArrayInputProps) => {
  const [addedInputs, setAddedInputs] = useState<inputSchematype[]>([]);
  console.log(addedInputs, "added inputs");

  const handleAddInputs = () => {
    const newInputs = input.array.map((inputItem: inputSchematype) => ({
      ...inputItem,
      input_id: `${inputItem.input_id}-${Date.now()}`, // Unique ID to avoid key issues
    }));
    setAddedInputs((prev) => [...prev, ...newInputs]);
  };

  const handleRemoveInputs = () => {
    if (addedInputs.length >= input.array.length) {
      setAddedInputs((prev) => prev.slice(0, prev.length - input.array.length));
    }
  };

  return (
    <div>
      <div className="flex items-center flex-wrap gap-5">
        {/* Original Inputs */}
        {input.array.map((inputItem: inputSchematype) => (
          <Input
            key={inputItem.input_id}
            label={inputItem.label}
            required={inputItem.required}
            placeholder={`Enter ${input.label}`}
          />
        ))}

        {/* Duplicated Inputs */}
        {addedInputs.map((inputItem) => (
          <Input
            key={inputItem.input_id}
            label={inputItem.label}
            required={inputItem.required}
            placeholder={`Enter ${input.label}`}
          />
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <Button type="button" onClick={handleAddInputs} variant="solid">
          Add Inputs
        </Button>
        <Button
          type="button"
          onClick={handleRemoveInputs}
          variant="solid"
          disabled={addedInputs.length === 0} // Disable if no duplicates exist
        >
          Remove Inputs
        </Button>
      </div>
    </div>
  );
};

export default ArrayInput;
