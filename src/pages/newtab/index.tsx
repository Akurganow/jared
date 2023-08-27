import 'modern-css-reset'
import 'styles/newtab.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import NewTab from 'containers/NewTab'
import Loader from 'components/Loader'

import { store, persistor } from 'src/store'

function Root() {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<Loader />}
				persistor={persistor}
			>
				<NewTab />
			</PersistGate>
		</Provider>
	)
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Root />)
