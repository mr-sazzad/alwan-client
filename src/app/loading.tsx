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
      className={`flex justify-center items-center w-full h-full ${className}`}
    >
      <Skeleton>
        <Image
          src={logoImage}
          alt="logo"
          height={height || 40}
          width={width || 40}
        />
      </Skeleton>
    </div>
  );
};

export default Loading;
