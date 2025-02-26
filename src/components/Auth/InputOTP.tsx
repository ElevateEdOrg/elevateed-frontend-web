import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { Dispatch, SetStateAction } from "react";

interface CustomInputOTPProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const CustomInputOTP: React.FC<CustomInputOTPProps> = ({
  value,
  setValue,
}) => {
  return (
    <InputOTP value={value} onChange={(value) => setValue(value)} maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot
          className="lg:w-14 lg:h-14 data-[active=true]:ring-[1px]"
          index={0}
        />
        <InputOTPSlot
          className="lg:w-14 lg:h-14 data-[active=true]:ring-[1px]"
          index={1}
        />
        <InputOTPSlot
          className="lg:w-14 lg:h-14 data-[active=true]:ring-[1px]"
          index={2}
        />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot
          className="lg:w-14 lg:h-14 data-[active=true]:ring-[1px]"
          index={3}
        />
        <InputOTPSlot
          className="lg:w-14 lg:h-14 data-[active=true]:ring-[1px]"
          index={4}
        />
        <InputOTPSlot
          className="lg:w-14 lg:h-14 data-[active=true]:ring-[1px]"
          index={5}
        />
      </InputOTPGroup>
    </InputOTP>
  );
};
