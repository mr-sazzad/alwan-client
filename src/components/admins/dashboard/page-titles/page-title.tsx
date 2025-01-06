import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";

const pageTitleVariants = cva("relative p-6 bg-gradient-to-br", {
  variants: {
    accentColor: {
      default: "from-primary/10 via-primary/5 to-background",
      blue: "from-blue-500/10 via-blue-500/5 to-background",
      green: "from-green-500/10 via-green-500/5 to-background",
      yellow: "from-yellow-500/10 via-yellow-500/5 to-background",
      red: "from-red-500/10 via-red-500/5 to-background",
      purple: "from-purple-500/10 via-purple-500/5 to-background",
      pink: "from-pink-500/10 via-pink-500/5 to-background",
    },
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    accentColor: "default",
    size: "md",
  },
});

interface PageTitleProps extends VariantProps<typeof pageTitleVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const PageTitle = ({
  title,
  description,
  icon,
  accentColor,
  size,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: PageTitleProps) => {
  return (
    <Card className={cn("overflow-hidden border-none", className)}>
      <CardContent className="p-0">
        <div className={pageTitleVariants({ accentColor, size })}>
          <div className="flex items-center gap-4">
            {icon && (
              <div
                className={cn(
                  "flex-shrink-0 p-3 bg-background rounded shadow-md",
                  iconClassName
                )}
                aria-hidden="true"
              >
                {icon}
              </div>
            )}
            <div className="flex-grow">
              <h1
                className={cn(
                  "text-3xl font-medium tracking-tight text-foreground",
                  titleClassName
                )}
              >
                {title}
              </h1>
              {description && (
                <p
                  className={cn(
                    "mt-2 text-sm text-muted-foreground max-w-prose",
                    descriptionClassName
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 transform -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PageTitle;
