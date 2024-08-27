export const getNameById = (
  id: string,
  data: Array<{ id: string; name: string }>
): string | undefined => {
  const item = data.find((d) => d.id === id);
  return item ? item.name : undefined;
};
