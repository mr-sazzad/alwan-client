import { IConvertedColor, IReadColor } from "@/types";

export const ConvertedColors = (colors: IReadColor[]): IConvertedColor[] => {
  return colors.map((col: IReadColor) => ({
    id: col.id,
    value: col.name.toLowerCase(),
    label: col.name,
  }));
};
