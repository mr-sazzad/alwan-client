import { IColor } from "../../types";

export const ConvertedColors = (colors: IColor[]) => {
  return colors.map((col) => ({
    id: col.id,
    value: col.name.toLowerCase(),
    label: col.name,
  }));
};
