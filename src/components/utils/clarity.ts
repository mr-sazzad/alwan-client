"use client";

import clarity from "@microsoft/clarity";
import { useEffect } from "react";

const ClarityTracker: React.FC = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID
    ) {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID);
    }
  }, []);

  return null;
};

export default ClarityTracker;
