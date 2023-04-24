import {cn} from "@/shared/utils";

export const Label = ({className, ...props}) => {
  return <label className={cn("block text-sm font-medium text-gray-700", className)} {...props} />;
};
