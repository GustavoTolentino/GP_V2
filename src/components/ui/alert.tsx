import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FiX, FiCheck } from "react-icons/fi";

const alertVariants = cva(
  "relative w-full rounded-lg border-2 p-4 dark:bg-gray-800 dark:text-gray-100",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground dark:bg-gray-800 dark:text-white",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive dark:text-red-500 [&>svg]:text-destructive dark:[&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  onConfirm?: () => void;
  onCancel?: () => void;
  hideCancel?: boolean;
  hideConfirm?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      title,
      description,
      icon,
      variant = "default",
      onConfirm,
      onCancel,
      hideCancel = false,
      hideConfirm = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-center justify-center space-x-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <h5 className="mb-1 font-medium leading-none tracking-tight dark:text-white">
            {title}
          </h5>
          <p className="text-sm leading-relaxed dark:text-gray-300">
            {description}
          </p>
        </div>
        {!hideCancel && !hideConfirm && (
          <div className="flex justify-center mt-4 space-x-2">
            {!hideCancel && (
              <button
                onClick={onCancel}
                className="flex items-center justify-center p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
            {!hideConfirm && (
              <button
                onClick={onConfirm}
                className="flex items-center justify-center p-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                <FiCheck className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
);

Alert.displayName = "Alert";

export { Alert };
