import { DetailedHTMLProps, HTMLAttributes } from 'react'


import { SettingsState } from 'src/types/settings'

export interface SettingsFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setting: keyof SettingsState
}
