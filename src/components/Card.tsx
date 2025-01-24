"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

interface CardDemoProps extends CardProps {
  icon: React.ReactNode;
  mainTitle: string;
  mainDescription: string;
}

export function CardDemo({
  className,
  icon,
  mainTitle,
  mainDescription,
  ...props
}: CardDemoProps) {
  return (
    <Card
      className={cn("w-[380px]  rounded-xl dark:bg-main-dark ", className)}
      {...props}
    >
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12">
            {icon}
          </div>
          <div className="flex flex-col items-center">
            <CardTitle className="text-lg font-semibold">{mainTitle}</CardTitle>
            <CardDescription className="text-xl text-muted-foreground font-bold">
              {mainDescription}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
