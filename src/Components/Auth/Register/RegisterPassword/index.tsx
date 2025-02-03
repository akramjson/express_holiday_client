import { FieldErrors, UseFormRegister } from "react-hook-form";
import { assets } from "../../../../assets";
import { registerSchemaType } from "../../../../types/Register/schema";
import { Input } from "../../../UI";

type RegisterPasswordProps = {
  register: UseFormRegister<registerSchemaType>;
  errors: FieldErrors<registerSchemaType>;
};

const RegisterPassword = ({ register, errors }: RegisterPasswordProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="password"
        label="passowrd"
        required
        placeholder="********"
        icon={assets.passwordIcon}
        className="w-full"
        {...register("password")}
        error={errors.password?.message}
      />
      <Input
        type="password"
        label="confirm passowrd"
        required
        placeholder="********"
        icon={assets.passwordIcon}
        className="w-full"
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
      />
    </div>
  );
};

export default RegisterPassword;
