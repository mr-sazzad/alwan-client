import { useMemo } from "react";
import image_1 from "../../images/categories/nike-1.jpg";
import image_2 from "../../images/categories/nike-2.jpg";

export const useCategories = () => {
  const routes = useMemo(
    () => [
      {
        id: 1,
        name: "Main Name",
        desc: "small description",
        image: image_1,
        href: "/account/coupons/active-coupons",
      },
      {
        id: 2,
        name: "Second Name",
        desc: "small description",
        image: image_2,
        href: "/account/coupons/used-coupons",
      },
    ],
    []
  );

  return routes;
};
