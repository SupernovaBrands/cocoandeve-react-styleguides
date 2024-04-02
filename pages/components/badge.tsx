export default function Badge() {
	return (
		<div className="container mx-auto sm:px-4 mt-4">
			<h1>Badges</h1>
			<div className="flex flex-col items-start">
				<span className="rounded-md px-[1em] py-[.5em] min-w-[3.375em] leading-tight inline-block p-1 text-center font-semibold text-base align-baseline text-white mb-1 mt-1 bg-sh-purple">Tan</span>
				<span className="rounded-md px-[1em] py-[.5em] min-w-[3.375em] leading-tight inline-block p-1 text-center font-semibold text-base align-baseline text-white mb-1 mt-1 bg-secondary">Hair</span>
				<span className="rounded-md px-[1em] py-[.5em] min-w-[3.375em] leading-tight inline-block p-1 text-center font-semibold text-base align-baseline text-white mb-1 mt-1 bg-blue">Body</span>
				<span className="rounded-md px-[1em] py-[.5em] min-w-[3.375em] leading-tight inline-block p-1 text-center font-semibold text-base align-baseline text-white mb-1 mt-1 bg-suncare-blue">Suncare</span>
			</div>
		</div>
	)
}
