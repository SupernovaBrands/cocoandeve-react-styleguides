import Close from '@/images/icons/close.svg';

type Props = {
	handleClose: any
	className?: string
}

const CloseButton = (props: Props) => {
	const { handleClose, className } = props;
	return (
		<Close onClick={handleClose} className={`svg--current-color cursor-pointer close absolute font-size-base w-g h-g top-[1em] right-[1em] ${className ?? ''}`}/>
	)
};

export default CloseButton;
