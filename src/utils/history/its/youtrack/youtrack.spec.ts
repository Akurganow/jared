import { faker } from '@faker-js/faker'
import { checkProcessor } from 'utils/history/history.fixtures'
import issue from 'utils/history/its/youtrack/issue'
import unknown from 'utils/history/its/youtrack/unknown'
import type { ITSHistoryItem } from 'types/history'
import type { TemplateConfig } from 'utils/history/history.fixtures'

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
	checkProcessor(configs, 'issue', issue)
})
