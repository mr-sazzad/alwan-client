import { ISize } from "@/types";

export const convertToSizeOptions = (sizes: ISize[]) => {
  return sizes.map((size: ISize) => {
    return {
      value: size.id,
      label: size.name,
    };
  });
};
