import React from "react";
import { BiMeteor } from "react-icons/bi";
import MaxWidth from "../components/max-width";
import NotFoundButtons from "../components/not-found/not-found-button";

const NotFound = () => {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="flex justify-center items-center w-full h-[40vh]">
        <div className="flex flex-col items-center gap-5">
          <BiMeteor size={35} />
          <div>
            <h1 className="md:text-2xl text-xl font-medium text-center">
              We can&apos;t find the page you are looking for.
            </h1>
            <h1 className="md:text-2xl text-xl font-medium text-center">
              Sorry for the inconvenience.
            </h1>
          </div>
          <NotFoundButtons />
        </div>
      </div>
    </MaxWidth>
  );
};

export default NotFound;
