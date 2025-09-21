import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QtyStepperProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onInput?: (value: number) => void;
}

const QtyStepper = ({
  value,
  onDecrease,
  onIncrease,
  onInput,
}: QtyStepperProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={onDecrease}
        aria-label="Disminuir"
      >
        −
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => onInput?.(Number(e.target.value || 1))}
        className="w-14 text-center"
        min={1}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={onIncrease}
        aria-label="Aumentar"
      >
        +
      </Button>
    </div>
  );
};

export default QtyStepper;
