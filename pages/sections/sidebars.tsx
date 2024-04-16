import Sidebar from "~/sections/Sidebar";

export default function Sidebars() {
	const SIDEBAR_DATA = [
		{
			id: 1,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3267a779-b6f6-4ce4-e410-c9f7dbe7ff00/320x',
			srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3267a779-b6f6-4ce4-e410-c9f7dbe7ff00/320x',
			alt: 'Bond Building Pre-Shampoo Treatment',
		},
		{
			id: 2,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3267a779-b6f6-4ce4-e410-c9f7dbe7ff00/320x',
			srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3267a779-b6f6-4ce4-e410-c9f7dbe7ff00/320x',
			alt: 'Bond Building Pre-Shampoo Treatment',
		},
		{
			id: 3,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3267a779-b6f6-4ce4-e410-c9f7dbe7ff00/320x',
			srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3267a779-b6f6-4ce4-e410-c9f7dbe7ff00/320x',
			alt: 'Bond Building Pre-Shampoo Treatment',
		},
	];
	return (
		<div className="mobile-wrapper px-hg lg:px-0">
			<div className="container">
				<h1 className="mb-1">SIDEBAR</h1>
				<div className="flex flex-wrap -mx-hg lg:-mx-g">
					<div className="w-full lg:w-1/3 lg:px-g sm:px-hg">
						<Sidebar data={SIDEBAR_DATA} />
					</div>
				</div>
			</div>
		</div>
	);
};
