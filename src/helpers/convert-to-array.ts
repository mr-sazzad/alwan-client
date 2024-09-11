export const convertToArray = (isNumber: boolean, fullString: string) => {
  let convertedArray: (string | number)[];
  if (isNumber) {
    convertedArray = fullString
      .split(",")
      .map((item: string) => parseFloat(item.trim()));
  } else {
    convertedArray = fullString.split(",").map((item: string) => item.trim());
  }
  return convertedArray;
};
