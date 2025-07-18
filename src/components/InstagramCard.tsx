import { useEffect, useRef, useCallback } from "react";
import { useIsVisible } from "~/hooks/useIsVisible";

const InstagramCard = (props: any) => {
    const { videoUrl, author, title, url, classes, product, index } = props;

    const { isVisible, targetRef } = useIsVisible(
        {
            root: null,
            rootMargin: "200px",
            threshold: 0.1,
        },
        false,
    );

    const videoRef = useRef<HTMLVideoElement>(null);

    const startVideoOnMouseMove = useCallback(async () => {
        try {
            await videoRef.current.play();
        } catch (e) {
        // do nothing
        }
    }, []);

    const stopVideoOnMove = useCallback(() => {
        try {
            videoRef.current.pause();
        } catch (e) {
        // do nothing
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            startVideoOnMouseMove();
        } else {
            stopVideoOnMove();
        }
    }, [isVisible, startVideoOnMouseMove, stopVideoOnMove]);

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.setAttribute('webkit-playsinline', 'true');
            const tracksLength = videoRef.current?.textTracks.length || 0;
            for (let i = 0; i < tracksLength; i ++) {
                videoRef.current.textTracks[i].mode = 'hidden';
            }
        }
    }, [])

    return (
        <div className={`text-left rounded ${classes}`} ref={targetRef as any}>
            <video preload="none" ref={videoRef} 
                crossOrigin="anonymous"
                className="lazy-video w-full mb-0 lazy-video bg-shimmer rounded-[1.5rem] h-[226px] min-h-[226px] lg:rounded-[2rem] lg:h-[355px] lg:min-h-[355px] object-cover" muted={true} playsInline={true} loop={true} autoPlay={false}>
                <source src={videoUrl} type="video/mp4" />
                <track src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/captions.vtt?v=1752637151" kind="captions" srcLang="en" label="English" default />
                <track src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/captions.vtt?v=1752637151" kind="descriptions" srcLang="en" label="English" default />
            </video>
            <p className="font-bold mb-25 mt-1 text-sm lg:text-base">{author}</p>
            <a href={`/products/${product}`} className="font-size-sm text-body block hover:text-body underline">{title}</a>
        </div>
    );
};

export default InstagramCard;
