export const statusStyles = {
  PROCESSING: {
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-900",
    displayText: "PROCESSING",
  },
  ONTHEWAY: {
    bgColor: "bg-blue-300",
    textColor: "text-blue-900",
    displayText: "ONTHEWAY",
  },
  DELIVERED: {
    bgColor: "bg-green-300",
    textColor: "text-green-900",
    displayText: "DELIVERED",
  },
  REQUESTTORETURN: {
    bgColor: "bg-red-300",
    textColor: "text-red-900",
    displayText: "REQUESTTORETURN",
  },
  RETURNED: {
    bgColor: "bg-gray-300",
    textColor: "text-gray-900",
    displayText: "RETURNED",
  },
};

export const orderStatusArray = [
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "onTheWay",
    label: "On The Way",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "requestToReturn",
    label: "Request To Return",
  },
  {
    value: "returned",
    label: "Returned",
  },
];
