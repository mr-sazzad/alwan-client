"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "../../components/ui/button";

const NotFoundButtons = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={() => window.history.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous Page
      </Button>

      <Button asChild>
        <Link href="/">
          <Home className="w-4 h-4 mr-2" /> Home Page
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundButtons;
