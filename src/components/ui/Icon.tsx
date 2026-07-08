import { useEffect, useRef } from 'react'
import type { IconFunction, IconWeight } from 'reicon'

interface Props {
    icon: IconFunction;
    className?: string;
    weight?: IconWeight;
}

export default function Icon({ icon, className, weight = 'Outline' }: Props) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const svg = icon({ className, weight })
        // reicon sets an inline `style="color: currentColor"` on every icon, which
        // (being inline) outranks Tailwind's text-* classes in the cascade. Strip it
        // so className-driven coloring (text-white, text-secondary, ...) works.
        svg.style.removeProperty('color')
        el.replaceChildren(svg)
        return () => { el.replaceChildren() }
    }, [icon, className, weight])

    return <span ref={ref} className="inline-flex" />
}
