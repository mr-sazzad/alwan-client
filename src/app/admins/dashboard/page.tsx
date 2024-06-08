"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { RiSettings2Line } from "react-icons/ri";

const AdminDashboard = () => {
  return (
    <div className="flex justify-center items-center h-custom-height">
      <div className="flex flex-col items-center text-center">
        <RiSettings2Line
          size={25}
          className="mb-3 text-gray-800 dark:text-white"
        />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Select a menu
        </h1>
        <p className="text-sm text-gray-800 dark:text-white">
          For detailed information
        </p>
        <Button className="mt-1" variant="link">
          <Link href="/admins/dashboard/application-dashboard">
            Go To Analytics
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
