import { useEffect, useRef, useCallback } from "react";
import { useIsVisible } from "~/hooks/useIsVisible";
import InlineProductCard from "./InlineProductCard";

const VideoUpsellCard = (props: any) => {
    const { videoUrl, author, classes, product, generalSetting, addToCart, trackEvent, store, formatMoney } = props;

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
            <p className="text-center mb-[.75rem] text-gray-600 text-base">{author}</p>
            <video preload="none" ref={videoRef}
                crossOrigin="anonymous" 
                className="lazy-video w-full mb-0 lazy-video bg-shimmer rounded-[1.5rem] h-[376px] min-h-[376px] lg:rounded-[2rem] lg:h-[376px] lg:min-h-[376px] object-cover" muted={true} playsInline={true} loop={true} autoPlay={false}>
                <source src={videoUrl} type="video/mp4" />
                <track src="https://cdn.shopify.com/s/files/1/0243/8817/3888/files/captions.vtt?v=1753146729" kind="metadata" srcLang="en" label="English" default />
                <track src="https://cdn.shopify.com/s/files/1/0243/8817/3888/files/captions.vtt?v=1753146729" kind="descriptions" srcLang="en" label="English" default />
            </video>
            {/* <a href={`/products/${product}`} className="font-size-sm text-body block hover:text-body underline">{title}</a> */}
            <InlineProductCard product={product} generalSetting={generalSetting} addToCart={addToCart} trackEvent={trackEvent} store={store} formatMoney={formatMoney} />
        </div>
    );
};

export default VideoUpsellCard;
