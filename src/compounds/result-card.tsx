import FiveStars from '../../src/images/icons/five-stars.svg';
import Link from 'next/link';
import Badge from '../badge';

const ResultCard = (props: any) => {
	return (
		<div className={`${props.wrapper} overflow-hidden`}>
			<picture className='rounded-tl-lg rounded-br-0 rounded-tr-lg rounded-bl-0 overflow-hidden block'>
				<source srcSet={props.item.srcSet} media="(min-width: 992px)"/>
				<img className="w-full" alt="/" src={props.item.src} />
			</picture>
			<div className="p-2 pt-0 bg-white h-100">
				<p className="flex justify-between items-center mb-0">
					<FiveStars className="svg--current-color h-[1em] text-primary text-lg mb-0" />
					<span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-sh-purple text-white mb-1 mt-1">Body</span>
				</p>
				<p className='mb-1'>
					Product:&nbsp;
					<Link href="#" title={props.item.title} className="text-underline">
						{props.item.title}
					</Link>
				</p>
				<p className='mb-g'>"{props.item.comment}"</p>
				<p className="underline font-bold">{props.item.author}</p>
			</div>
		</div>
	);
};

export default ResultCard;
