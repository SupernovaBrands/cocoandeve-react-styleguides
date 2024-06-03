import Modal from "~/components/Modal";
import Image from "next/image";
import KlarnaPink from '~/images/icons/klarna-pink.svg';
import SvgCloseCircle from '~/images/icons/close-rounded.svg';

const KlarnaModal = (props:any) => {
    const { isModalKlarnaOpen, handleOpenModalKlarna, setIsKlarnaOpen } = props;

    return (<Modal className="modal-lg px-0" withoutPadding={true} isOpen={isModalKlarnaOpen} handleClose={() => handleOpenModalKlarna()}>
                <div className="modal-dialog modal-lg modal-dialog-centered flex justify-center" role="document">
					<div className="modal-content mx-0 relative max-h-[50%] max-w-[480px] bg-white p-2 border">
                        <div className="modal-header border-0 justify-content-center text-center">
                            <Image src="/logo-klarna-gray.svg" height="18" width="81" className="inline-block align-baseline" alt="Klarna"/>
                            <SvgCloseCircle className="svg size-[30px] svg absolute top-1 right-1" onClick={() => setIsKlarnaOpen(false) }></SvgCloseCircle>
                        </div>
                        <div className="modal-body">
                            <h3 className="text-lg mb-2 text-[27px] mt-1">Shop now, pay later</h3>
                            <p>It couldn't be smooother.</p>
                            <div className="klarna-boxes mt-1">
                                <div className="klarna-box min-h-[30px] md:min-h-[40px]">
                                    <div className="klarna-box flex items-center">
                                        <div className="klarna-line-box"></div>
                                        <div className="klarna-point-box mt-[3px]">
                                            <svg focusable="false" width="10" height="10"><rect width="10" height="10" fill="rgba(23, 23, 23, 1)"></rect></svg>
                                        </div>
                                    </div>
                                    <p className="ml-1">Add item(s) to your cart</p>
                                </div>
                                <div className="klarna-box min-h-[30px] md:min-h-[40px]">
                                    <div className="klarna-box flex items-center">
                                        <div className="klarna-line-box"></div>
                                        <div className="klarna-point-box mt-[3px]">
                                            <svg focusable="false" width="10" height="10"><rect width="10" height="10" fill="rgba(23, 23, 23, 1)"></rect></svg>
                                        </div>
                                    </div>
                                    <p className="ml-1 w-full">Go to checkout and choose <KlarnaPink className="svg inline"/></p>
                                </div>
                                <div className="klarna-box min-h-[30px] md:min-h-[40px]">
                                    <div className="klarna-box flex items-center">
                                        <div className="klarna-point-box mt-[3px]">
                                            <svg focusable="false" width="10" height="10"><rect width="10" height="10" fill="rgba(23, 23, 23, 1)"></rect></svg>
                                        </div>
                                    </div>
                                    <p className="ml-1">Klarna gives you flexible payment options.</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 leading-5">
                                    You must be 18+ to use this credit offer. Klarna uses soft searches with credit reference agencies. These do not affect your credit rating. Missed payments can affect your ability to use Klarna.
                                    <a href='https://www.klarna.com/uk/terms-and-conditions' target='_blank' className='text-underline text-xs ml-hg'>Terms and conditions</a>
                                </p>
                            </div>
                            <a className="btn btn-lg bg-black text-white rounded-0 border-0 w-full mt-2 hover:text-white hover:text-underline" role="button" onClick={() => setIsKlarnaOpen(false) }>Close</a>
                        </div>
                    </div>
                </div>
        </Modal>)
}

export default KlarnaModal;
