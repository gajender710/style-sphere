import React, { useReducer } from "react";

const TextInput = ({
  label,
  value,
  validator = null,
  onChangeText,
  required = false,
  type = "text",
  showError = true,
}: TextInputProps) => {
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  const validationLabel = label.trim().toLowerCase(); // label.trim().replace(/\W+/g, '-').toLowerCase();
  let validationError = null;
  let validatorInstance: any = null;

  if (validator && validator.length === 2) {
    validatorInstance = validator[0];
    const validatorRules = validator[1];
    const valueForValidation = validatorRules.includes("numeric")
      ? parseFloat(value)
      : value;
    validationError = validatorInstance.current.message(
      validationLabel,
      valueForValidation,
      validatorRules
    );
  }

  const showValidationMessage = () => {
    if (validatorInstance) {
      validatorInstance.current.showMessageFor(validationLabel);
      forceUpdate();
    }
  };

  const onChangeHandler = (e: any) => {
    onChangeText(e.currentTarget.value);
  };

  return (
    <div className="w-full ">
      <h2 className="mb-1 font-medium text-sm capitalize">
        {label}
        {required && <span className="text-red-500  ml-1">*</span>}
      </h2>
      <div className="flex">
        {type == "mobile_number" && (
          <h4 className=" text-sm text-gray-500 font-semibold bg-gray-200 rounded-lg py-2 px-2 mr-1">
            +91
          </h4>
        )}
        <input
          className="w-full rounded-md h-9 bg-white border-gray-200 border-[1px] focus:outline-primary px-2 focus:outline-none"
          type={type}
          value={value}
          onChange={onChangeHandler}
          onBlur={!validator ? undefined : showValidationMessage}
        />
      </div>
      {showError && (
        <div className="flex text-red-500 text-xs items-center justify-start w-full h-3 mt-[1px]">
          {validatorInstance && validationError}
        </div>
      )}
    </div>
  );
};

interface TextInputProps {
  label: string;
  value: string;
  validator?: any;
  onChangeText: (val: string) => void;
  required?: boolean;
  type?: "text" | "mobile_number" | "email";
  showError?: boolean;
}

export default TextInput;
