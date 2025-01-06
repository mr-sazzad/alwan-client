import { CircleUserRound, Frown, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

interface NoOrdersFoundProps {
  title: string;
  description: string;
  icon?: React.ReactElement;
}

export default function NoOrdersFound({
  title,
  description,
  icon,
}: NoOrdersFoundProps) {
  const IconComponent = icon ? (
    React.cloneElement(icon, {
      className: "w-12 h-12 text-muted-foreground mb-4",
    })
  ) : (
    <Frown className="w-12 h-12 text-muted-foreground mb-4" />
  );

  return (
    <Card className="w-full mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        {IconComponent}
        <h2 className="text-2xl font-medium mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/account/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View All Orders
            </Link>
          </Button>
          <Button asChild>
            <Link href="/account/profile">
              <CircleUserRound className="mr-2 h-4 w-4" />
              View Your Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
