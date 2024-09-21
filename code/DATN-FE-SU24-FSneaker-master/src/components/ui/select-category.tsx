import * as React from 'react'

import { cn } from '@/lib/utils'
import instance from '@/core/api'

export interface InputProps extends React.InputHTMLAttributes<HTMLSelectElement> { }

const Select = React.forwardRef<HTMLSelectElement, InputProps>(({ className, type, ...props }, ref) => {
    const [categories, setCategories] = React.useState<{ _id: string, name: string }[]>([])
    React.useEffect(() => {
        ; (async () => {
            try {
                const response = await instance.get('api/categories')
                setCategories(response.data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <select
            className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
        >
            <option value=''>Chon danh muc</option>
            {categories.map((item) => (
                <option key={item._id} value={item._id}>
                    {item.name}
                </option>
            ))}
        </select>
    )
})
Select.displayName = 'Select'

export { Select }
