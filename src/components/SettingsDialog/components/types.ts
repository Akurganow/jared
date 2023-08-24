import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SettingsFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setting: string
}
