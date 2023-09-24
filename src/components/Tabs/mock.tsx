import { FormEvent, useCallback } from 'react'

const DefaultChildren = () => {
	return <div>
		<p>This is tab that shows by default</p>
		<p>Nothing to do here. Some content you can find on another tabs</p>
	</div>
}

const InactiveTab = () => {
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const data = Object.fromEntries(formData.entries())
		console.log('Default form', data)
	}, [])

	return <div>
		<p>This is tab that inactive tab with some content</p>
		<p>Here is a simple form</p>
		<form onSubmit={handleSubmit} style={{
			display: 'grid',
			gridTemplateColumns: 'max-content 1fr',
			gridGap: '0.25rem',
		}}>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				autoComplete="fullname"
				required
			/>
			<label htmlFor="email">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				autoComplete="email"
				required
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				autoComplete="current-password"
				required
			/>
			<div />
			<div style={{
				display: 'flex',
				alignItems: 'flex-end'
			}}>
				<button type="submit">Submit</button>
			</div>
		</form>
	</div>
}

export default {
	items: [
		{
			title: 'Default Tab',
			children: <DefaultChildren />,
		},
		{
			title: 'Disabled Tab',
			disabled: true,
		},
		{
			title: 'Unactive Tab',
			disabled: false,
			children: <InactiveTab />,
		}
	]
}
