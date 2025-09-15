import React, { useState, useEffect, useRef } from 'react';
import Modal from "~/components/Modal";
import Play from '~/images/icons/play.svg';
import Close from '~/images/icons/close.svg';

const PageVideo = (props: any) => {
    const { data } = props;
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
        <div className='lg:container lg:py-[60px] mt-4 lg:mt-0'>
            <picture className="block w-full rounded-[32px]" onClick={() => handlOpenModal(true)}>
                <source
                    srcSet={data?.img_desk?.url}
                    media="(min-width: 992px)" width="1362" height="1162"/>
                <img
                    src={data?.img_mob?.url}
                    className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Page Video"} />
            </picture>
            {data?.video_url && (
                <Modal className="modal-lg modal-dialog-centered !px-0 " isOpen={modal} handleClose={() => handlOpenModal(false)}>
                    <div className="relative lg:border lg:border-[rgba(0,0,0,.2)]">
                        <video ref={videoElem} controls className="rounded-[20px]" autoPlay={true} playsInline webkit-playsinline>
                            <source src={data?.video_url} type="video/mp4" />
                        </video>
                    </div>
                    <button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlOpenModal(false)}>
                        <Close className="svg--current-color w-[24px] h-[24px]" />
                    </button>
                </Modal>
            )}
        </div>
    )
}

export default PageVideo;