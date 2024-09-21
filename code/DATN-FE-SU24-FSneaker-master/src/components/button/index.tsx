import { twMerge } from 'tailwind-merge'
interface ButtonProps {
    color?: 'primary' | 'secondary' | 'danger'
    variant?: 'outline' | 'solid'
    children: React.ReactNode
    className?: string

}
export default function Button( p : ButtonProps) {
    const {color, variant, children, className, ...props} = p
    
    return <button className={twMerge('w-full px-7 py-3 rounded-md', className)} {...props}>
        {children}
    </button>
}
