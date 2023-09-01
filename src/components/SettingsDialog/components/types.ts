import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { SettingsState } from 'store/types/settings'

export interface SettingsFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setting: keyof SettingsState
}
