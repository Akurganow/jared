import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { SettingsState } from 'types/settings'

export interface SettingsFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setting: keyof SettingsState
}
