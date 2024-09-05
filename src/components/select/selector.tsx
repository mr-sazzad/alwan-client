import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface IOption {
  label: string;
  value: string;
}

interface ReactSelectProps {
  multiple?: boolean;
  title: string;
  options: IOption[];
  defaultValue?: IOption[];
  name: string;
  closeMenuOnSelect?: boolean;
  placeholder: string;
  handleSelect: (value: string[]) => void;
}

const Selector: React.FC<ReactSelectProps> = ({
  multiple = true,
  title,
  options,
  closeMenuOnSelect = false,
  name,
  placeholder,
  handleSelect,
  defaultValue,
}) => {
  const animatedSelect = makeAnimated();
  return (
    <div>
      <p className="text-sm mb-2 font-medium">{title}</p>
      <Select
        options={options}
        isMulti={multiple}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(selectedOptions) => {
          if (multiple) {
            const values = (selectedOptions as IOption[]).map(
              (option) => option.value
            );
            handleSelect(values);
          } else {
            const value = (selectedOptions as IOption)?.value || "";
            handleSelect([value]);
          }
        }}
        components={animatedSelect}
        name={name}
        closeMenuOnSelect={closeMenuOnSelect}
        styles={{
          control: (base, state) => ({
            ...base,
            border: "1px solid #ddd",
            opacity: 0.7,
            borderRadius: "6px",
            boxShadow: "none",
            "&:hover": {
              border: "1px solid #ddd",
            },
          }),
        }}
      />
    </div>
  );
};

export default Selector;
