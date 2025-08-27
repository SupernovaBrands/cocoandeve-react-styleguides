import React, { useState, useEffect, useRef } from 'react';
import Modal from "~/components/Modal";
import Play from '~/images/icons/play.svg';
import Close from '~/images/icons/close.svg';

const PageVideo = (props: any) => {
    const videoElem = useRef(null);
    const [modal, setModal] = useState(false);
    const handlOpenModal = (open: boolean) => {
		setModal(open);
		if (videoElem) {
			if (modal) {
				videoElem.current?.play();
			} else {
				videoElem.current?.pause();
				if (videoElem && videoElem.current) videoElem.current.currentTime = 0;
			}
		}
	};

    return (
        <>
            <picture className="block w-full rounded-[32px]" onClick={() => handlOpenModal(true)}>
                <source
                    srcSet={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Image_86.png?v=1756304726'}
                    media="(min-width: 992px)" width="1362" height="1162"/>
                <img
                    src={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/img_2_1.png?v=1756304799'}
                    className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Page Video"} />
            </picture>

            <Modal className="modal-lg modal-dialog-centered !px-0 " isOpen={modal} handleClose={() => handlOpenModal(false)}>
                <div className="relative lg:border lg:border-[rgba(0,0,0,.2)]">
                    <video ref={videoElem} controls className="rounded-[20px]" autoPlay={false} playsInline webkit-playsinline>
                        <source src={'https://cdn.shopify.com/s/files/1/0028/8253/5533/files/Pop_Up_Video_Journalist_-_1_reexport_2.mp4?v=1634105075'} type="video/mp4" />
                    </video>
                </div>
                <button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlOpenModal(false)}>
                    <Close className="svg--current-color w-[24px] h-[24px]" />
                </button>
            </Modal>
        </>
    )
}

export default PageVideo;