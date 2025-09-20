import { Button } from "@/components/ui/button";
import type { CartButtonProps } from "../types";
import { ShoppingCart } from "lucide-react";

const MobileCartButton = ({ count = 0, onClick }: CartButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bg-primary bottom-6 right-6 size-20 px-0 m-0 rounded-full shadow-xl"
    >
      <ShoppingCart size={20} className="m-0 p-0 px-0 !size-8" />
      <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-2 py-0.5">
        {count}
      </span>
    </Button>
  );
};

export default MobileCartButton;
