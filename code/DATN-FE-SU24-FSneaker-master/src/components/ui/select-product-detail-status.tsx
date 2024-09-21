import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLSelectElement> {}

const SelectProductDetailStatus = React.forwardRef<HTMLSelectElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const statuses = [
            {
                label: 'Còn hàng',
                value: 'Còn hàng'
            },
            {
                label: 'Hết hàng',
                value: 'Hết hàng'
            }
        ]

        return (
            <select
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            >
                <option value=''>Chọn</option>
                {statuses.map((item) => (
                    <option key={item.label} value={item.label}>
                        {item.label}
                    </option>
                ))}
            </select>
        )
    }
)
SelectProductDetailStatus.displayName = 'SelectProductDetailStatus'

export { SelectProductDetailStatus }
