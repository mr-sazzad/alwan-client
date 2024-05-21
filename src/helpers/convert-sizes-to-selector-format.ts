export const convertSizesToSelectorFormat = (sizes: string[]) => {
  const result = sizes.map((size) => {
    return {
      value: size,
      label: `${size.toUpperCase()} Size`,
    };
  });

  return result;
};
