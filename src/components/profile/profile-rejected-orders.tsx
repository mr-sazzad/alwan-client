import React from "react";
import { PiTrashSimpleBold } from "react-icons/pi";
import { Button } from "../ui/button";
const ProfileRejectedOrders = () => {
  return (
    <div className="border rounded-md mt-5 p-2">
      <h2 className="text-xl font-semibold">Rejeceted Orders</h2>
      <div className="flex flex-row items-center gap-2 justify-between">
        <p className="text-muted-foreground">
          If you&apos;d like to review your cancellations and returns
        </p>
        <Button variant="outline" size="sm" className="flex gap-2 items-center">
          <PiTrashSimpleBold /> <p>Rejected Orders</p>
        </Button>
      </div>
    </div>
  );
};

export default ProfileRejectedOrders;
