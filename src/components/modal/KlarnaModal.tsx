import Modal from "~/components/Modal";
import Image from "next/image";
import KlarnaPink from '~/images/icons/klarna-pink.svg';
import SvgCloseCircle from '~/images/icons/close-rounded.svg';

const KlarnaModal = (props:any) => {
    const { isModalKlarnaOpen, handleOpenModalKlarna, setIsKlarnaOpen } = props;

    return (<Modal className="modal modal-dialog-centered px-0 mx-auto" withoutPadding={true} isOpen={isModalKlarnaOpen} handleClose={() => handleOpenModalKlarna()}>
                {/* <div className="modal-dialog modal-lg modal-dialog-centered flex justify-center" role="document"> */}
					<div className="modal-content mx-0 relative max-h-[50%] bg-white py-g px-g border mt-[3.5rem]">
                        <div className="modal-header border-0 justify-content-center text-center">
                            <Image src="/logo-klarna-gray.svg" height="18" width="81" className="inline-block align-baseline" alt="Klarna"/>
                            <SvgCloseCircle className="svg size-[30px] svg absolute top-1 right-1" onClick={() => setIsKlarnaOpen(false) }></SvgCloseCircle>
                        </div>
                        <div className="modal-body">
                            <div className="md:px-[25px]">
                                <h3 className="mb-1 text-[27px] mt-25 -tracking-[0.2px] leading-[30px]">Shop now, pay later</h3>
                                <p className="antialiased leading-[25px]">It couldn't be smooother.</p>
                                <div className="klarna-boxes mt-25 md:mt-[10px]">
                                    <div className="klarna-box min-h-[30px] md:min-h-[40px]">
                                        <div className="klarna-box flex items-center">
                                            <div className="klarna-line-box"></div>
                                            <div className="klarna-point-box mt-[3px]">
                                                <svg focusable="false" width="10" height="10"><rect width="10" height="10" fill="rgba(23, 23, 23, 1)"></rect></svg>
                                            </div>
                                        </div>
                                        <p className="ml-1 md:ml-g antialiased -tracking-[0.2px]">Add item(s) to your cart</p>
                                    </div>
                                    <div className="klarna-box min-h-[30px] md:min-h-[40px]">
                                        <div className="klarna-box flex items-center">
                                            <div className="klarna-line-box"></div>
                                            <div className="klarna-point-box mt-[3px]">
                                                <svg focusable="false" width="10" height="10"><rect width="10" height="10" fill="rgba(23, 23, 23, 1)"></rect></svg>
                                            </div>
                                        </div>
                                        <p className="ml-1 md:ml-g w-full antialiased -tracking-[0.2px]">Go to checkout and choose <KlarnaPink className="svg inline"/></p>
                                    </div>
                                    <div className="klarna-box min-h-[25px] md:min-h-[30px]">
                                        <div className="klarna-box flex items-center">
                                            <div className="klarna-point-box mt-[3px]">
                                                <svg focusable="false" width="10" height="10"><rect width="10" height="10" fill="rgba(23, 23, 23, 1)"></rect></svg>
                                            </div>
                                        </div>
                                        <p className="ml-1 md:ml-g antialiased -tracking-[0.2px]">Klarna gives you flexible payment options.</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-[rgb(120,117,115)] leading-5 antialiased leading-[20px]">
                                        You must be 18+ to use this credit offer. Klarna uses soft searches with credit reference agencies. These do not affect your credit rating. Missed payments can affect your ability to use Klarna.
                                        <a href='https://www.klarna.com/uk/terms-and-conditions' target='_blank' className='text-underline text-xs ml-25'>Terms and conditions</a>
                                    </p>
                                </div>
                            </div>
                            <div className="w-full px-25 mb-25">
                                <a className="btn btn-lg bg-black text-white rounded-none border-0 w-full mt-g font-normal hover:text-white hover:no-underline h-[50px] p-0 leading-[45px]" role="button" onClick={() => setIsKlarnaOpen(false) }>Close</a>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
        </Modal>)
}

export default KlarnaModal;
