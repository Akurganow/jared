import ContainerSectionSettings from 'containers/Dialogs/SectionDialog/SectionSettings/Container'
import BookmarkSectionSettings from 'containers/Dialogs/SectionDialog/SectionSettings/Bookmark'
import HistorySectionSettings from 'containers/Dialogs/SectionDialog/SectionSettings/History'
import ITSSectionSettings from 'containers/Dialogs/SectionDialog/SectionSettings/ITS'
import VCSSectionSettings from 'containers/Dialogs/SectionDialog/SectionSettings/VCS'
import {
	SectionItem,
	SectionItemBookmarks,
	SectionItemContainer,
	SectionItemHistory,
	SectionItemITS, SectionItemVCS, SectionSettingsProps
} from 'types/sections'

export default function SectionSettings(props: SectionSettingsProps<SectionItem>) {
	switch (props.item.type) {
	case 'container':
		return <ContainerSectionSettings {...props as SectionSettingsProps<SectionItemContainer>} />
	case 'bookmarks':
		return <BookmarkSectionSettings {...props as SectionSettingsProps<SectionItemBookmarks>} />
	case 'history':
		return <HistorySectionSettings {...props as SectionSettingsProps<SectionItemHistory>} />
	case 'its':
		return <ITSSectionSettings {...props as SectionSettingsProps<SectionItemITS>} />
	case 'vcs':
		return <VCSSectionSettings {...props as SectionSettingsProps<SectionItemVCS>} />
	}
}
