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

    return (
        <div className={`text-left rounded ${classes}`} ref={targetRef as any}>
            <video preload="none" ref={videoRef} className="lazy-video w-full rounded mb-0 lazy-video bg-shimmer lg:min-h-[386px] min-h-[425px]" muted={true} playsInline={true} loop={true} autoPlay={false}>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p className="font-bold mb-25 mt-1">{author}</p>
            <a href={`/products/${product}`} className="font-size-sm text-body block hover:text-body"><u>{title}</u></a>
        </div>
    );
};

export default InstagramCard;
