import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface IOption {
  label: string;
  value: string;
}

interface ReactSelectProps {
  title: string;
  options: IOption[];
  name: string;
  closeMenuOnSelect: boolean;
  placeholder: string;
  handleSelect: (value: string) => void;
}

const DeliveryFeeSelector: React.FC<ReactSelectProps> = ({
  title,
  options,
  closeMenuOnSelect,
  name,
  placeholder,
  handleSelect,
}) => {
  const animatedSelect = makeAnimated();
  return (
    <div className="md:mt-[5px]">
      <p className="text-sm mb-2">{title}</p>
      <Select
        options={options}
        placeholder={placeholder}
        onChange={(selectedOptions) => {
          const value = (selectedOptions as IOption)?.value || "";
          handleSelect(value);
        }}
        components={animatedSelect}
        name={name}
        closeMenuOnSelect={closeMenuOnSelect}
        styles={{
          control: (base, state) => ({
            ...base,
            border: "1px solid #334155",
            borderRadius: "6px",
            boxShadow: "none",
            "&:hover": {
              border: "1px solid #334155",
            },
            "&:active": {
              outline: "2px solid black",
            },
          }),
        }}
      />
    </div>
  );
};

export default DeliveryFeeSelector;
