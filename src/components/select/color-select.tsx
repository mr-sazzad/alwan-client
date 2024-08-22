import chroma from "chroma-js";
import React from "react";
import Select, { StylesConfig } from "react-select";
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

const ColorSelector: React.FC<ReactSelectProps> = ({
  title,
  options,
  closeMenuOnSelect,
  name,
  placeholder,
  handleSelect,
}) => {
  const animatedSelect = makeAnimated();
  const customStyles: StylesConfig<IOption, false> = {
    control: (base, state) => ({
      ...base,
      border: "1px solid #334155",
      opacity: 0.7,
      borderRadius: "6px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #334155",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#334155" : base.backgroundColor,
      color: state.isFocused ? "#fff" : "#000000",
      "&:hover": {
        backgroundColor: chroma("#334155").brighten(1).hex(),
        color: "#fff",
      },
    }),
  };

  return (
    <div className="md:mt-[5px]">
      <p className="text-sm mb-2">{title}</p>
      <Select
        options={options}
        placeholder={placeholder}
        onChange={(selectedOption) => {
          const value = (selectedOption as IOption)?.value || "";
          handleSelect(value);
        }}
        components={animatedSelect}
        name={name}
        closeMenuOnSelect={closeMenuOnSelect}
        styles={customStyles}
      />
    </div>
  );
};

export default ColorSelector;
