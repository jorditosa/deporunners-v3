import React, { JSX } from 'react'
import { LucideIcon } from 'lucide-react'

interface Props {
    title: string;
    variant: 'h1' | 'h2' | 'h3';
    icon?: LucideIcon;
    iconSize?: number;
    className?: string;
    iconClassName?: string;
}

export default function Heading({ 
    title, 
    variant, 
    icon: Icon, 
    iconSize = 12,
    className = '',
    iconClassName = ''
}: Props) {
    const headingClasses = {
        h1: 'text-3xl m-0!',
        h2: 'text-2xl m-0!', 
        h3: 'text-xl m-0!'
    }

    const HeadingTag = variant as keyof JSX.IntrinsicElements;

    return (
        <div className={`flex items-center gap-4 py-4 ${className}`}>
            {Icon && (
                <Icon 
                    className={`size-${iconSize} text-secondary ${iconClassName}`} 
                />
            )}
            <HeadingTag className={`${headingClasses[variant]} text-secondary`}>
                {title}
            </HeadingTag>
        </div>
    )
}