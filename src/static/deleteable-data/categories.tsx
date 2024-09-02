import { useMemo } from "react";
import image_1 from "../../images/categories/nike-1.jpg";
import image_2 from "../../images/categories/nike-2.jpg";

export const useCategories = () => {
  const routes = useMemo(
    () => [
      {
        id: 1,
        name: "Gear to Win the Year",
        desc: "School Essential",
        image: image_1,
        href: "/account/coupons/active-coupons",
      },
      {
        id: 2,
        name: "Mad Ambition Pack",
        desc: "Redefine your rotation",
        image: image_2,
        href: "/account/coupons/used-coupons",
      },
    ],
    []
  );

  return routes;
};
