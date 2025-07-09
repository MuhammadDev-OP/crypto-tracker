"use client"

import { Button } from "@/components/ui/button"

interface TimePeriodSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

const timePeriods = [
  { value: "1D", label: "1D" },
  { value: "7D", label: "7D" },
  { value: "28D", label: "28D" },
]

export function TimePeriodSelector({ value, onValueChange }: TimePeriodSelectorProps) {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      {timePeriods.map((period) => (
        <Button
          key={period.value}
          variant={value === period.value ? "default" : "ghost"}
          size="sm"
          onClick={() => onValueChange(period.value)}
          className="text-xs"
        >
          {period.label}
        </Button>
      ))}
    </div>
  )
}
