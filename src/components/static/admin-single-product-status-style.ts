export const statusStyles = {
  processing: {
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-900",
    displayText: "Processing",
  },
  onTheWay: {
    bgColor: "bg-blue-300",
    textColor: "text-blue-900",
    displayText: "On The Way",
  },
  delivered: {
    bgColor: "bg-green-300",
    textColor: "text-green-900",
    displayText: "Delivered",
  },
  requestToReturn: {
    bgColor: "bg-red-300",
    textColor: "text-red-900",
    displayText: "Request to Return",
  },
  returned: {
    bgColor: "bg-gray-300",
    textColor: "text-gray-900",
    displayText: "Returned",
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
