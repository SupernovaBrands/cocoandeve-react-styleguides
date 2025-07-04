import { useEffect, useRef, useCallback } from "react";
import { useIsVisible } from "~/hooks/useIsVisible";

const InstagramCard = (props: any) => {
    const { videoUrl, author, title, url, classes, product } = props;

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
        }
    }, [])

    return (
        <div className={`text-left rounded ${classes}`} ref={targetRef as any}>
            <video preload="none" ref={videoRef} 
                className="lazy-video w-full mb-0 lazy-video bg-shimmer rounded-[1.5rem] h-[226px] min-h-[226px] lg:rounded-[2rem] lg:h-[355px] lg:min-h-[355px] object-cover" muted={true} playsInline={true} loop={true} autoPlay={false}>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p className="font-bold mb-25 mt-1 text-sm lg:text-base">{author}</p>
            <a href={`/products/${product}`} className="font-size-sm text-body block hover:text-body underline">{title}</a>
        </div>
    );
};

export default InstagramCard;
