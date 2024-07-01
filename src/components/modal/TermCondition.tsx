import CloseButton from '~/components/modal/CloseButton';

const TermCondition = (props: any) => {
	const { handleClose, content } = props;
	return (
		<div className="flex items-center min-h-[calc(100%-3.5rem)] lg:min-h-0 mb-[1.75rem] lg:-mt-[3.5rem] lg:mb-0">
			<div className="max-w-[31em] lg:mx-1 overflow-hidden relative mx-auto bg-white modal-content">
				<CloseButton handleClose={handleClose} className="text-body" />
				<div className="px-3 py-3 lg:px-4 lg:py-4">
					<h2 className="pt-1 text-left w-full pb-[1rem]">{content?.title || 'Terms and Conditions'}</h2>
					<p className="lg:max-w-[24.875em]" dangerouslySetInnerHTML={{__html: content?.body}} />
				</div>
			</div>
        </div>
	);
};

export default TermCondition;
