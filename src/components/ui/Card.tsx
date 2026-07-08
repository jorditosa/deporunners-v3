import React from 'react'

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
        >
            {children}
        </div>
    )
}
