import { IconType } from "react-icons";

interface NotFoundProps {
  icon: IconType;
  size: number;
  text: string;
  className?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  icon: Icon,
  text,
  className,
  size,
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Icon size={size} className="text-muted-foreground" />
      <p className={`text-xl font-semibold text-muted-foreground ${className}`}>
        {text}
      </p>
    </div>
  );
};

export default NotFound;
