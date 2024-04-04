import CloseButton from '@/components/modal/CloseButton';

const TermCondition = (props: any) => {
	const { handleClose } = props;
	return (
		<div className="modal-content max-w-[31em] overflow-hidden bg-white relative mx-auto">
			<CloseButton handleClose={handleClose} className="text-body" />
			<div className="px-3 py-3 lg:px-4 lg:py-4">
                <h2 className="pt-1 text-left w-full mb-1">Terms and Conditions</h2>
                <p>
                    <strong>FREE Tan Pouch with your order*</strong>
                    <br /><br />
                    This offer entitles customers to a free Jet-Set Self Tan Pouch with code: SPRING. Minimum spend of USD 50/ £40 / 50€ / AUD 80 / CAD 70 applies. Promotion will run from 2 April 2024, until unless stated otherwise. Promotion cannot be used in conjunction with any other promo code. Coco &amp; Eve reserves the right to cancel or alter any promotion without prior notice. In the event of any dispute, the decision of Coco &amp; Eve is final.
                    <br /><br />
                    Terms &amp; conditions apply: <a href="https://www.cocoandeve.com/pages/terms-and-conditions">https://www.cocoandeve.com/pages/terms-and-conditions</a>
                </p>
			</div>
		</div>
	);
};

export default TermCondition;
