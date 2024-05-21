interface SmallNameProps {
  name: string;
  className?: string;
}

const SmallName: React.FC<SmallNameProps> = ({ name, className }) => {
  return (
    <p className={`${className}`}>
      {name.length > 23 ? name.slice(0, 20) + "..." : name}
    </p>
  );
};

export default SmallName;
