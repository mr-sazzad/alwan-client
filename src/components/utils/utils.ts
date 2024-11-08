export const shortenId = (id: string) => {
  if (id.length <= 13) return id;
  return `${id.slice(0, 4)}....${id.slice(-5)}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const extractNameFromEmail = (email: string): string => {
  let name = email.split("@")[0];
  name = name.replace(/\d+$/, "");
  name = name.replace(/[^\w\s.-]/g, "");
  name = name.replace(/[._]/g, " ");
  name = name.replace(
    /\w\S*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

  return name || email;
};
