import { FieldErrors, UseFormRegister } from "react-hook-form";
import { assets } from "../../../../assets";
import { registerSchemaType } from "../../../../types/Register/schema";
import { Input } from "../../../UI";

type RegisterUserInfoProps = {
  register: UseFormRegister<registerSchemaType>;
  errors: FieldErrors<registerSchemaType>;
};

const RegisterUserInfo = ({ register, errors }: RegisterUserInfoProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between gap-2 w-full">
        <Input
          type="text"
          placeholder="ahmedkarim"
          label="first name"
          required
          icon={assets.emailIcon}
          className="w-full"
          {...register("first_name")}
          error={errors.first_name?.message}
        />
        <Input
          type="text"
          placeholder="ahmedkarim"
          label="last name"
          required
          icon={assets.emailIcon}
          className="w-full"
          {...register("last_name")}
          error={errors.last_name?.message}
        />
      </div>
      <Input
        type="email"
        placeholder="ahmedkarim@gmail.com"
        label="email"
        required
        icon={assets.emailIcon}
        className="w-full"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="text"
        placeholder="0553531335"
        label="phone number"
        required
        icon={assets.phoneIcon}
        className="w-full"
        {...register("phone_number")}
        error={errors.phone_number?.message}
      />
    </div>
  );
};

export default RegisterUserInfo;
