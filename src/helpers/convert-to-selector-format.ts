export const ConvertToSelectorFormat = (contents: any[]) => {
  const result = contents.map((content) => {
    return {
      value: content.id,
      label: content.name,
    };
  });

  return result;
};
