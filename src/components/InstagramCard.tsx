import { useEffect, useRef, useCallback, memo } from "react";
import { useIsVisible } from "~/hooks/useIsVisible";

interface InstagramCardProps {
    videoUrl: string;
    author: string;
    title: string;
    url: string;
    classes?: string;
    product: string;
    index?: number;
}

const InstagramCard = memo(({
    videoUrl, 
    author, 
    title, 
    url, 
    classes, 
    product 
}: InstagramCardProps) => {

    const { isVisible, targetRef } = useIsVisible({
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
    }, false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const hasLoadedRef = useRef(false);

    const startVideo = useCallback(async () => {

        const video = videoRef.current;
        if (!video) return;

        try {
            if (!hasLoadedRef.current) {
                video.src = videoUrl;
                hasLoadedRef.current = true;
            }
            await video.play();
        } catch (e) {
            // console.debug('Video play failed:', e);
        }
    }, [videoUrl]);

    const stopVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        try {
            video.pause();
        } catch (e) {
            // console.debug('Video pause failed:', e);
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            startVideo();
        } else {
            stopVideo();
        }
    }, [isVisible, startVideo, stopVideo]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.setAttribute('webkit-playsinline', 'true');
        
        const hideTextTracks = () => {
            const tracksLength = video.textTracks?.length || 0;
            for (let i = 0; i < tracksLength; i++) {
                video.textTracks[i].mode = 'hidden';
            }
        };

        if (video.readyState >= 1) {
            hideTextTracks();
        } else {
            video.addEventListener('loadedmetadata', hideTextTracks, { once: true });
        }

        return () => {
            video.removeEventListener('loadedmetadata', hideTextTracks);
        };
    }, []);

    // console.log('isVisible', isVisible);;

    return (
        <div className={`text-left rounded ${classes}`}  ref={targetRef as any}>
            <video ref={videoRef} preload="none" crossOrigin="anonymous" className="lazy-video w-full mb-0 bg-shimmer rounded-[1.5rem] h-[226px] min-h-[226px] lg:rounded-[2rem] lg:h-[355px] lg:min-h-[355px] object-cover" 
                muted
                playsInline
                loop
                autoPlay={false}>
                {isVisible && <source src={videoUrl} type="video/mp4" />}
                <track src="https://cdn.shopify.com/s/files/1/0243/8817/3888/files/captions.vtt?v=1753146729" kind="captions" srcLang="en" label="English" />
                <track src="https://cdn.shopify.com/s/files/1/0243/8817/3888/files/captions.vtt?v=1753146729" kind="descriptions" srcLang="en" label="English" />
            </video>
            <p className="font-bold mb-25 mt-1 text-sm lg:text-base">{author}</p>
            <a href={`/products/${product}`} className="font-size-sm text-body block hover:text-body underline">{title}</a>
        </div>
    );
});

InstagramCard.displayName = 'InstagramCard';

export default InstagramCard;