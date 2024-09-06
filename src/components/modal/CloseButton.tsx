import Close from '~/images/icons/close.svg';

type Props = {
	handleClose: any
	className?: string
	children?: React.ReactNode
}

const CloseButton = (props: Props) => {
	const { handleClose, className, children } = props;
	if (!children) {
		return (
			<button type="button" onClick={handleClose} className={`cursor-pointer close absolute font-size-base px-1 py-1 top-[10px] right-[10px] ${className}`}>
				<Close onClick={handleClose} className='svg w-g h-g' />
			</button>
		)
	}
	return (
		<button type="button" onClick={handleClose} className={`cursor-pointer close absolute font-size-base w-g h-g top-[1em] right-[1em] ${className}`}>
			{children}
		</button>
	)
};

export default CloseButton;
