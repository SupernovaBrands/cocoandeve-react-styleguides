import { useEffect } from 'react';
import Modal from '~/components/Modal';
import LaunchWaitList from '~/compounds/launch-waitlist';
import { subscribeBluecoreWaitlist } from "~/modules/utils";

const LaunchWaitlistModals = (props) => {
	const {
		launchWL,
		store,
		setLaunchWLModal,
		setLaunchWLModal2,
		setLaunchWLModal3,
		launchWLModal,
		launchWLModal2,
		launchWLModal3,
		loggedInEmail,
		setLaunchWLSuccess,
		launchSubmitted,
		setLaunchSubmitted,
		trackBluecoreLaunchWaitlistEvent,
		submitsToSmsBumpAPi,
	} = props;

    useEffect(() => {
        if (launchWLModal.open) {
            document.body.classList.add('!overflow-hidden');
        } else {
            document.body.classList.remove('!overflow-hidden');
        }
    }, [launchWLModal]);

    useEffect(() => {
        if (launchWLModal2.open) {
            document.body.classList.add('!overflow-hidden');
        } else {
            document.body.classList.remove('!overflow-hidden');
        }
    }, [launchWLModal2]);

    useEffect(() => {
        if (launchWLModal3.open) {
            document.body.classList.add('!overflow-hidden');
        } else {
            document.body.classList.remove('!overflow-hidden');
        }
    }, [launchWLModal3]);

	const onSubmitLaunchWaitlist = ({ box, email, phoneCode, phoneNumber, fallback }) => {
        let regSource = launchWL.launch_wl_popup_regsource;
        let smsBump = launchWL.launch_wl_smsbump;
        let variantId = launchWLModal.variantId;
        let handle = launchWLModal.handle;
        if (box === 2) {
            regSource = launchWL.launch_wl2_popup_regsource;
            smsBump = launchWL.launch_wl2_smsbump;
            variantId = launchWLModal2.variantId;
            handle = launchWLModal2.handle;
        } else if (box === 3) {
            regSource = launchWL.launch_wl3_popup_regsource;
            smsBump = launchWL.launch_wl3_smsbump;
            variantId = launchWLModal3.variantId;
            handle = launchWLModal3.handle;
        }

        if (email) {
            subscribeBluecoreWaitlist(email, handle, variantId, regSource ? regSource : `launch-item-${handle}`, phoneNumber, true, '');
            trackBluecoreLaunchWaitlistEvent(email, 'Sweepstakes');
        }

        if (phoneNumber && phoneCode) {
            submitsToSmsBumpAPi(phoneNumber, smsBump, phoneCode, store);
        }

        if (typeof(fallback) === 'function') {
            fallback();
        }
    }
	return (
		<>
			<Modal backdropClasses="md:overflow-y-hidden" className={`modal-lg max-w-[44.063rem] !px-hg lg:!px-0 modal-dialog-centered`} isOpen={launchWLModal.open} handleClose={() => {setLaunchWLModal({...launchWLModal, ...{ open: false }})}}>
				<LaunchWaitList
					title={launchWL.launch_wl_title}
					content={launchWL.launch_wl_subtitle}
                	tos={launchWL.launch_wl_popup_tos}
                    policy={launchWL.launch_wl_popup_privacy}
                    success_msg={launchWL.launch_wl_thanks_title}
                    success_content={launchWL.launch_wl_thanks_subtitle}
                    cta={launchWL.launch_wl_submit}
                    className="modal-content rounded-[20px] lg:p-4 lg:mb-0 lg:min-h-[34.75rem] border border-[#00000033] bg-clip-padding outline-0"
                    store={store}
                    onSubmitLaunchWaitlist={onSubmitLaunchWaitlist}
                    box={1}
                    productCard={true}
                    handleClose={() => setLaunchWLModal({...launchWLModal, ...{ open: false }})}
                    loggedInEmail={loggedInEmail}
                    setLaunchWLSuccess={setLaunchWLSuccess}
                    onClickDiv={(e) => e.stopPropagation()}
                    launchSubmitted={launchSubmitted}
                    setLaunchSubmitted={setLaunchSubmitted}
                    tags={launchWLModal.tags}
                    launchModalData={launchWLModal}
                />
            </Modal>
            <Modal backdropClasses="md:overflow-y-hidden" className={`modal-lg max-w-[44.063rem] !px-hg lg:!px-0 modal-dialog-centered`} isOpen={launchWLModal2.open} handleClose={() => {setLaunchWLModal2({...launchWLModal2, ...{ open: false }})}}>
                <LaunchWaitList
                    title={launchWL.launch_wl2_title || ''}
                    content={launchWL.launch_wl2_subtitle || ''}
                    tos={launchWL.launch_wl2_popup_tos || ''}
                    policy={launchWL.launch_wl2_popup_privacy || ''}
                    success_msg={launchWL.launch_wl2_thanks_title || ''}
                    success_content={launchWL.launch_wl2_thanks_subtitle || ''}
                    cta={launchWL.launch_wl2_submit}
                    className="modal-content rounded-[20px] lg:p-4 lg:mb-0 lg:min-h-[34.75rem] border border-[#00000033] bg-clip-padding outline-0"
                    store={store}
                    onSubmitLaunchWaitlist={onSubmitLaunchWaitlist}
                    box={2}
                    productCard={true}
                    handleClose={() => setLaunchWLModal2({...launchWLModal2, ...{ open: false }})}
                    loggedInEmail={loggedInEmail}
                    setLaunchWLSuccess={setLaunchWLSuccess}
                    onClickDiv={(e) => e.stopPropagation()}
                    launchSubmitted={launchSubmitted}
                    setLaunchSubmitted={setLaunchSubmitted}
                    tags={launchWLModal2.tags}
                    launchModalData={launchWLModal2}
                />
            </Modal>
            <Modal backdropClasses="md:overflow-y-hidden" className={`modal-lg max-w-[44.063rem] !px-hg lg:!px-0 modal-dialog-centered`} isOpen={launchWLModal3.open} handleClose={() => {setLaunchWLModal3({...launchWLModal3, ...{ open: false }})}}>
                <LaunchWaitList
                    title={launchWL.launch_wl3_title || ''}
                    content={launchWL.launch_wl3_subtitle || ''}
                    tos={launchWL.launch_wl3_popup_tos || ''}
                    policy={launchWL.launch_wl3_popup_privacy || ''}
                    success_msg={launchWL.launch_wl3_thanks_title || ''}
                    success_content={launchWL.launch_wl3_thanks_subtitle || ''}
                    cta={launchWL.launch_wl3_submit}
                    className="modal-content rounded-[20px] lg:p-4 lg:mb-0 lg:min-h-[34.75rem] border border-[#00000033] bg-clip-padding outline-0"
                    store={store}
                    onSubmitLaunchWaitlist={onSubmitLaunchWaitlist}
                    box={3}
                    productCard={true}
                    handleClose={() => setLaunchWLModal3({...launchWLModal3, ...{ open: false }})}
                    loggedInEmail={loggedInEmail}
                    setLaunchWLSuccess={setLaunchWLSuccess}
                    onClickDiv={(e) => e.stopPropagation()}
                    launchSubmitted={launchSubmitted}
                    setLaunchSubmitted={setLaunchSubmitted}
                    tags={launchWLModal3.tags}
                    launchModalData={launchWLModal3}
                />
            </Modal>
        </>
	);
};

export default LaunchWaitlistModals;
