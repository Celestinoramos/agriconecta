'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onChange?: (quantity: number) => void;
  className?: string;
}

export default function QuantitySelector({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onChange,
  className
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input for editing
    if (value === '') {
      return;
    }

    const numValue = parseInt(value, 10);
    
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(minQuantity, Math.min(maxQuantity, numValue));
      setQuantity(clampedValue);
      onChange?.(clampedValue);
    }
  };

  const handleBlur = () => {
    // Ensure valid value on blur
    if (quantity < minQuantity) {
      setQuantity(minQuantity);
      onChange?.(minQuantity);
    } else if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
      onChange?.(maxQuantity);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={quantity <= minQuantity}
        className="h-11 w-11 rounded-full"
        aria-label="Diminuir quantidade"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <input
        type="number"
        min={minQuantity}
        max={maxQuantity}
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="h-11 w-20 text-center border rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Quantidade"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="h-11 w-11 rounded-full"
        aria-label="Aumentar quantidade"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
