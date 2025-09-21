import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface QtyStepperProps {
  value: number;
  productId: number;
  onDecrease?: (productId: number) => void;
  onIncrease?: (productId: number) => void;
  onInput?: (value: number, productId: number) => void;
  className?: string;
  inputClassName?: string;
}

const QtyStepper = ({
  value,
  onDecrease,
  onIncrease,
  onInput,
  productId,
}: QtyStepperProps) => {
  const handleDecrease = () => {
    if (onDecrease) {
      onDecrease(productId);
    }
  };

  const handleIncrease = () => {
    if (onIncrease) {
      onIncrease(productId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (onInput) {
      onInput(value, productId);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
      <button
        onClick={handleDecrease}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-l-lg transition-colors"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className={cn(
          "w-16 h-10 text-center border-0 focus:outline-none focus:ring-0 bg-transparent font-medium"
        )}
        min="1"
      />
      <button
        onClick={handleIncrease}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-r-lg transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QtyStepper;
