import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  accentColor?: "default" | "blue" | "green" | "yellow" | "red";
}

export default function PageTitle({
  title = "Default Title",
  description = "Default description",
  icon,
  accentColor = "default",
}: PageTitleProps) {
  const accentColors = {
    default: "from-primary/10 via-primary/5 to-background",
    blue: "from-blue-500/10 via-blue-500/5 to-background",
    green: "from-green-500/10 via-green-500/5 to-background",
    yellow: "from-yellow-500/10 via-yellow-500/5 to-background",
    red: "from-red-500/10 via-red-500/5 to-background",
  };

  return (
    <Card className="overflow-hidden border-none">
      <CardContent className="p-0">
        <div
          className={cn(
            "relative p-6 bg-gradient-to-br",
            accentColors[accentColor]
          )}
        >
          <div className="flex items-center space-x-4">
            {icon && (
              <div className="flex-shrink-0 p-3 bg-background rounded shadow-md">
                {icon}
              </div>
            )}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground max-w-prose">
                {description}
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </CardContent>
    </Card>
  );
}
