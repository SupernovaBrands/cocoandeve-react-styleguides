export default function Badge() {
	return (
		<div className="container">
			<h1>Badges</h1>
			<div className="flex flex-col items-start">
				<span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-sh-purple text-white mb-1 mt-1">Tan</span>
				<span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-secondary text-white hover:bg-gray-700 mb-1 mt-1">Hair</span>
				<span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue text-white mb-1 mt-1">Body</span>
				<span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-suncare-blue text-white mb-1 mt-1">Suncare</span>
			</div>
		</div>
	)
}
