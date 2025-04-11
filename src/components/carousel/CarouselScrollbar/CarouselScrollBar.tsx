import React from 'react';
import { CarouselScrollbarProps } from './types';
import { findClosestIndex } from './helpers';
import { EmblaCarouselType } from 'embla-carousel';

const START_INDEX = 0;

const CarouselScrollbar = ({
    emblaApi,
    scrollSnaps,
    className
}: CarouselScrollbarProps) => {
    const scrollbarRef = React.useRef<HTMLDivElement>(null);
    const scrollbarTrackRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);

    const handleTrackClick = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            if (
                !emblaApi ||
                event.target === scrollbarRef.current ||
                !scrollSnaps?.length
            ) return;

            emblaApi.internalEngine().animation.start();

            const { clientX } = event;
            const rect = scrollbarTrackRef.current?.getBoundingClientRect();
            if (!rect) return;

            const percentageFromLeftEdge = ((clientX - rect.left) / rect.width) * 100;
            const closestIndex = findClosestIndex(scrollSnaps, percentageFromLeftEdge);

            emblaApi.scrollTo(closestIndex);
        },
        [emblaApi, scrollSnaps]
    );

    const handleMouseMoveScrollbar = React.useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!emblaApi || !isDragging || !scrollSnaps) return;

            const track = scrollbarTrackRef.current;
            const scrollbar = scrollbarRef.current;
            if (!track || !scrollbar) return;

            let clientX;
            if (event.type === 'touchmove' && event.target === scrollbar) {
                clientX = (event as TouchEvent).touches[0].clientX;
            } else {
                clientX = (event as MouseEvent).clientX;
            }

            const rect = track.getBoundingClientRect();
            const newTranslateX = Math.max(
                0,
                Math.min(
                    track.clientWidth - scrollbar.clientWidth,
                    clientX - rect.left - scrollbar.clientWidth / 2
                )
            )

            scrollbar.style.transform = `translateX(${newTranslateX}px)`;

            const percentageFromLeftEdge =
                (newTranslateX / (track.clientWidth - scrollbar.clientWidth)) * 100;
            const closestIndex = findClosestIndex(scrollSnaps, percentageFromLeftEdge);

            const maxWidthApiScrollProgressPx = emblaApi.internalEngine().limit.length;
            const rangeValueForEmblaEngine = ((-1 * percentageFromLeftEdge) / 100) * maxWidthApiScrollProgressPx;
            const engine = emblaApi.internalEngine();
            engine.animation.stop();
            engine.translate.to(rangeValueForEmblaEngine);
            engine.location.set(rangeValueForEmblaEngine);
            engine.index.set(closestIndex);
        },
        [emblaApi, isDragging, scrollSnaps]
    );

    const translateScrollbar = (newPercent: number) => {
        const track = scrollbarTrackRef.current
        const scrollbar = scrollbarRef.current

        if (!track || !scrollbar) {
            console.error('Error: track or scrollbar is null.')
            return;
        }

        const newPercentClamped = Math.max(0, Math.min(100, newPercent));

        const trackWidth = track.clientWidth;
        const scrollbarWidth = scrollbar.clientWidth;

        const maxTranslateX = trackWidth - scrollbarWidth;
        const percentRatio = (newPercentClamped / 100) * maxTranslateX;

        const translateX = percentRatio;

        scrollbar.style.transform = `translateX(${translateX}px)`;
    };

    const handleMouseUp = React.useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (event.type !== 'touchmove') {
                event.preventDefault()
                event.stopPropagation()
            }
            setIsDragging(false);

            window.removeEventListener('touchmove', handleMouseMoveScrollbar);
            window.removeEventListener('touchend', handleMouseUp);
        },
        [handleMouseMoveScrollbar]
    );

    const handleMouseDown = React.useCallback(
        (
        event:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.TouchEvent<HTMLDivElement>
        ) => {
            if (event.type !== 'touchmove') {
                event.preventDefault();
                event.stopPropagation();
            }
            setIsDragging(true);
        },
        []
    );

    const onScroll = React.useCallback(
        (emblaApi: EmblaCarouselType) => {
            if (!emblaApi) {
                return;
            }

            translateScrollbar(emblaApi.scrollProgress() * 100);
        },
        [emblaApi, scrollbarTrackRef.current, scrollbarRef.current]
    )

    React.useEffect(() => {
        if (!emblaApi) {
            return;
        }

        onScroll(emblaApi);
        emblaApi.on('reInit', onScroll).on('scroll', onScroll);
    }, [emblaApi, onScroll]);

    React.useEffect(() => {
        if (emblaApi && START_INDEX) {
            emblaApi.scrollTo(START_INDEX);
        }
    }, [emblaApi]);

    React.useEffect(() => {
        const track = scrollbarTrackRef.current;
        const scrollbar = scrollbarRef.current;

        if (!track || !scrollbar || !scrollSnaps) {
            return;
        }

        const trackWidth = track.clientWidth;
        const scrollbarWidth = scrollbar.clientWidth;
        const maxScrollDistance = trackWidth - scrollbarWidth;
        const scrollPercentage = (START_INDEX / (scrollSnaps.length - 1)) * 100;
        const scrollDistance = maxScrollDistance * (scrollPercentage / 100);

        scrollbar.style.transform = `translateX(${scrollDistance}px)`;
    }, [scrollbarTrackRef, scrollbarRef, scrollSnaps]);

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMoveScrollbar);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMoveScrollbar);
        window.addEventListener('touchend', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMoveScrollbar);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMoveScrollbar);
            window.removeEventListener('touchend', handleMouseUp);
        }
    }, [handleMouseMoveScrollbar, handleMouseUp]);

    return (
        <div
            className="carousel__track-scrollbar"
            ref={scrollbarTrackRef}
            onClick={handleTrackClick} >
            <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                ref={scrollbarRef}
                className={`carousel__scrollbar ${className}`}
                style={{
                    width: `calc(100% / ${scrollSnaps?.length})`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            />
        </div>
    )
}

CarouselScrollbar.displayName = 'CarouselScrollbar'
export default CarouselScrollbar
