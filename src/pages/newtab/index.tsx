import 'modern-css-reset/dist/reset.min.css'
import Loader from 'components/Loader'
import NewTab from 'containers/NewTab'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from 'src/store'

function Root() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader />} persistor={persistor}>
				<NewTab />
			</PersistGate>
		</Provider>
	)
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Root />)
