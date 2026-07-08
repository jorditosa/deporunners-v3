import type { IconFunction } from 'reicon'
import Icon from './Icon'

interface Props {
    icon: IconFunction;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({ icon: iconFn, title, description, actionLabel, onAction }: Props) {
    return (
        <div className='text-center py-12 space-y-4'>
            <div className='mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center'>
                <Icon icon={iconFn} className='text-gray-400 size-10' />
            </div>
            <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-gray-700'>{title}</h3>
                <p className='text-gray-500'>{description}</p>
            </div>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300'
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}
