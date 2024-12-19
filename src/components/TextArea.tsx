import { ChangeEvent, useEffect, useState } from "react"

const INTERVAL = 1000

interface Props {
    className?: string
    defaultValue?: string
    disabled?: boolean
    onChange: (e: ChangeEvent<any>) => void
    result?: any
}

let timeout: number

export function TextArea({ onChange, disabled, className, defaultValue }: Props) {
    const [text, setText] = useState(() => defaultValue)

    useEffect(() => {
        setText(defaultValue)
    }, [defaultValue])

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = e.currentTarget
        debouncedUpdate(value)
        onChange(e)
    }

    function debouncedUpdate(value: string) {
        setText(value)
        window.clearTimeout(timeout)

        timeout = window.setTimeout(() => {
            let text

            try {
                text = JSON.stringify(JSON.parse(value), undefined, 4)
            } catch {
                text = value
            } finally {
                setText(text)
            }
        }, INTERVAL)
    }

    return (
        <textarea disabled={Boolean(disabled)} value={text} name="text-area" className={className} onChange={handleChange} />
    )
}
