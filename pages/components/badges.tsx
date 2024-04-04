import Badge from '@/components/Badge';

const Badges = () => {
	return (
		<div className="container mx-auto sm:px-4 mt-4">
			<h1>Badges</h1>
			<div className="flex flex-col items-start">
				<Badge badgeClasses="bg-sh-purple text-white mb-1 mt-1">Tan</Badge>
				<Badge badgeClasses="bg-secondary text-white mb-1 mt-1">Hair</Badge>
				<Badge badgeClasses="bg-blue text-white mb-1 mt-1">Body</Badge>
				<Badge badgeClasses="bg-suncare-blue text-white mb-1 mt-1">Suncare</Badge>
			</div>
		</div>
	)
}

export default Badges;
