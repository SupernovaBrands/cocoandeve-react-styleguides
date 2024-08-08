import CloseButton from '~/components/modal/CloseButton';

const TermCondition = (props: any) => {
	const { handleClose, content } = props;
	return (
		<div className="bg-white flex items-center lg:min-h-0 lg:mx-1 lg:mb-0 modal-content border border-[rgba(0,0,0,.2)] bg-clip-padding">
			<div className="max-w-[31em] overflow-hidden relative mx-auto">
				<CloseButton handleClose={handleClose} className="text-body" />
				<div className="px-3 py-3 lg:px-4 lg:py-4">
					<h2 className="pt-1 text-left w-full pb-[1rem]">{content?.title || 'Terms & Conditions'}</h2>
					<p className="lg:max-w-[24.875em]" dangerouslySetInnerHTML={{__html: content?.body}} />
				</div>
			</div>
        </div>
	);
};

export default TermCondition;
