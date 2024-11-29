export const statusStyles = {
  PROCESSING: {
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-900",
    displayText: "PROCESSING",
  },
  SHIPPED_TO_COURIER: {
    bgColor: "bg-blue-300",
    textColor: "text-blue-900",
    displayText: "SHIPPED_TO_COURIER",
  },
  DELIVERED: {
    bgColor: "bg-green-300",
    textColor: "text-green-900",
    displayText: "DELIVERED",
  },
  RETURN_REQUESTED: {
    bgColor: "bg-red-300",
    textColor: "text-red-900",
    displayText: "RETURN_REQUESTED",
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
    value: "in_transit",
    label: "In Transit",
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
