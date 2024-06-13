import CloseButton from '~/components/modal/CloseButton';

const TermCondition = (props: any) => {
	const { handleClose, content } = props;
	return (
		<div className="modal-content max-w-[31em] overflow-hidden bg-white relative mx-auto">
			<CloseButton handleClose={handleClose} className="text-body" />
			<div className="px-3 py-3 lg:px-4 lg:py-4">
                <h2 className="pt-1 text-left w-full mb-1">{content?.title || 'Terms and Conditions'}</h2>
                <p dangerouslySetInnerHTML={{__html: content?.body}} />
			</div>
		</div>
	);
};

export default TermCondition;
