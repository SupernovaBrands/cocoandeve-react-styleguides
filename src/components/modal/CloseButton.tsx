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
			<Close onClick={handleClose} className={`svg--current-color cursor-pointer close absolute font-size-sm w-g h-g top-[1em] right-[1em] ${className ?? ''}`}/>
		)
	}
	return (
		<button type="button" onClick={handleClose} className={`cursor-pointer close absolute font-size-base w-g h-g top-[1em] right-[1em] ${className}`}>
			{children}
		</button>
	)
};

export default CloseButton;
