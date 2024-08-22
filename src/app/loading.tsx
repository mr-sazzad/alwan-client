import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import logoImage from "../images/logo.png";

interface LoadingProps {
  className?: string;
  height?: number;
  width?: number;
}

const Loading: React.FC<LoadingProps> = ({ className, height, width }) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full mt-[90px] ${className}`}
    >
      <Skeleton>
        <Image
          src={logoImage}
          alt="logo"
          height={height || 100}
          width={width || 100}
        />
      </Skeleton>
    </div>
  );
};

export default Loading;
