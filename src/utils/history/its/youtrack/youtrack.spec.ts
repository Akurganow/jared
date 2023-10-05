import { faker } from '@faker-js/faker'
import { checkProcessor } from 'utils/history/history.mock'
import issue from 'utils/history/its/youtrack/issue'
import unknown from 'utils/history/its/youtrack/unknown'
import type { ITSHistoryItem } from 'types/history'
import type { TemplateConfig } from 'utils/history/history.mock'

const configs: TemplateConfig<ITSHistoryItem> = {
	unknown: {
		variables: {
			title: () => faker.lorem.sentence(),
			path: () => faker.lorem.word(),
		},
		create: {
			url: '/fake-path/{{path}}',
			title: '{{title}}',
		},
		check: {
			name: '',
			title: '{{title}}',
			type: 'unknown',
			typeName: 'Unknown',
			provider: 'youtrack',
		}
	},
	issue: {
		variables: {
			title: () => faker.lorem.sentence(),
			issueId: () => `${faker.lorem.word(3).toUpperCase()}-${faker.string.numeric(5)}`,
		},
		create: {
			url: '/issue/{{issueId}}',
			title: '{{title}}: {{issueId}}',
		},
		check: {
			name: '{{issueId}}',
			title: '{{title}}',
			type: 'issue',
			typeName: 'Issue',
			provider: 'youtrack',
		}
	},
}

describe('utils/history/its/youtrack', () => {
	checkProcessor(configs, 'unknown', unknown)
	// https://youtrack.jetbrains.com/issue/FL-21629
	// https://youtrack.jetbrains.com/issue/RSRP-494239/Generate-tests-with-AI-still-works-after-logging-out-from-AI-assistant
	// https://youtrack.jetbrains.com/issue/WEB-61670/JSX-attribute-quotes-braces-autocompletion-based-on-type-not-working-in-TSX-files JSX attribute quotes/braces autocompletion 'based on type' not working in TSX files : WEB-61670
	checkProcessor(configs, 'issue', issue)
	/*
	https://youtrack.jetbrains.com/issues Everything - JetBrains YouTrack
	https://youtrack.jetbrains.com/issues/GTLB GitLab (GTLB) - JetBrains YouTrack
	https://youtrack.jetbrains.com/agiles/153-120/current 2023.3 EAP 2 – PyCharm Kanban – YouTrack Agile Board
	https://youtrack.jetbrains.com/projects Projects
	https://youtrack.jetbrains.com/projects/a5b24b52-1951-467c-af00-bd183e6fb01a Project
	https://youtrack.jetbrains.com/articles Knowledge Base
	https://youtrack.jetbrains.com/articles/WEB WebStorm | Knowledge Base
	https://youtrack.jetbrains.com/articles/WEB-A-11/WebStorm-EAP WebStorm EAP | Knowledge Base
	https://youtrack.jetbrains.com/articles/WEB-A-233538441/WebStorm-2023.3-EAP-2-233.8264.9-build-Release-Notes WebStorm 2023.3 EAP 2 (233.8264.9 build) Release Notes | Knowledge Base
	https://youtrack.jetbrains.com/gantt-charts/372-172 Developer Ecosystem Survey 2023 preparation
	https://youtrack.jetbrains.com/users/me Alexander.Kurganov – YouTrack

	 */
})
