"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CryptoOption {
  value: string
  label: string
  symbol: string
  icon: string
}

interface CryptoSelectorProps {
  value: string
  onValueChange: (value: string) => void
  options: CryptoOption[]
}

export function CryptoSelector({ value, onValueChange, options }: CryptoSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select cryptocurrency" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {option.icon}
              </span>
              <span>{option.label}</span>
              <span className="text-muted-foreground">({option.symbol})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
