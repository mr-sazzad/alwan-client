interface IPageTitleProps {
  title: string;
  description: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-green-200 to-green-300 px-5 py-2 rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default PageTitle;
