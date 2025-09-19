import { useEffect, useState } from 'react';
import SearchProductCard from '~/compounds/SearchProductCard';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';

const CarouselScroll = (props) => {
    const adjustScrollThumb = (thumb, inner, scrollParent) => {
        let innerOuterWidth;
        innerOuterWidth = inner.scrollWidth;
        // eslint-disable-next-line no-param-reassign
        thumb.style.width = `${(inner.clientWidth / innerOuterWidth) * 100}%`;
        // eslint-disable-next-line no-param-reassign
        thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;

        if (inner.clientWidth === inner.scrollWidth) {
            inner.classList.add('justify-content-center');
            scrollParent.classList.add('d-none');
        } else {
            inner.classList.remove('justify-content-center');
            scrollParent.classList.remove('d-none');
        }
    };

    const initCarouselScroll = (carousel) => {
        const carousels = [];

        const inner = carousel.querySelector('.carousel-inner');
        const scrollbar = carousel.querySelector('.scrollbar');
        const scrollThumb = carousel.querySelector('.scrollbar--thumb');
        const prevButton = carousel.querySelector('.carousel-control-prev');
        const nextButton = carousel.querySelector('.carousel-control-next');

        if (scrollbar) {
            carousel.addEventListener('adjustThumb', () => { adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode); });
            if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
        }
        carousels.push(carousel);

        let x = 0;
        let left = 0;
        let itemIndex = 0;

        const checkButton = () => {
            if (inner.scrollLeft === 0) {
                if (!prevButton.classList.contains('carousel-control-prev--always-show')) {
                    prevButton.classList.add('d-none');
                } else {
                    prevButton.classList.add('disabled');
                }
            } else if (!prevButton.classList.contains('carousel-control-prev--always-show')) {
                prevButton.classList.remove('d-none');
            } else {
                prevButton.classList.remove('disabled');
            }

            if (inner.scrollLeft + inner.clientWidth === inner.scrollWidth) {
                if (!nextButton.classList.contains('carousel-control-prev--always-show')) {
                    nextButton.classList.add('d-none');
                } else {
                    nextButton.classList.add('disabled');
                }
            } else if (!nextButton.classList.contains('carousel-control-prev--always-show')) {
                nextButton.classList.remove('d-none');
            } else {
                nextButton.classList.remove('disabled');
            }
        };
        if (scrollThumb) {
            checkButton();
        }

        const innerDrag = (e) => {
            inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;
            if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
            checkButton();
        };

        const scrollDrag = (e) => {
            inner.scrollLeft = left + ((e.pageX || e.touches[0].pageX) - x) * (inner.scrollWidth / scrollbar.clientWidth);
            if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
            checkButton();
        };

        inner.addEventListener('scroll', () => {
            if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
            checkButton();
        });

        const eventStart = (e) => {
            e.preventDefault();
            x = (e.pageX || e.touches[0].pageX);
            left = inner.scrollLeft;

            document.addEventListener(
                e.type === 'mousedown' ? 'mousemove' : 'touchmove',
                e.target === scrollThumb ? scrollDrag : innerDrag,
            );
        };

        inner.addEventListener('mousedown', eventStart, true);
        if (scrollThumb) {
            scrollThumb.addEventListener('mousedown', eventStart, true);
            scrollThumb.addEventListener('touchstart', eventStart, true);
            scrollThumb.addEventListener('mousedown', eventStart, true);
            scrollThumb.addEventListener('touchstart', eventStart, true);
        }

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', innerDrag);
            document.removeEventListener('mousemove', scrollDrag);
        });

        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', innerDrag);
            document.removeEventListener('touchmove', scrollDrag);
        });

        const scrollItem = (direction) => (e) => {
            e.preventDefault();
            const item = carousel.querySelector('.carousel-item');
            const itemToScroll = 2;
            itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -(itemToScroll) : itemToScroll);
            left = itemIndex * item.clientWidth;
            if (left < 0) left = 0;
            else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;

            inner.scrollTo({ left: left, behavior: 'smooth' });
        };


        if (prevButton) {
            prevButton.addEventListener('mousedown', scrollItem('left'));
        }

        if (nextButton) {
            nextButton.addEventListener('mousedown', scrollItem('right'));
        }
    }

    useEffect(() => {

        const carousel = document.body.querySelector('.carousel--scroll');
        initCarouselScroll(carousel);

    }, [])

    return (
        <div className='container mb-0 mb-lg-3'>
            {props.products.length > 0 && (
                <div className="carousel--scroll position-relative">
                    <div className="carousel-inner d-flex flex-nowrap row w-auto">
                        {props.products.map((product, i) => {
                            return <SearchProductCard title={product.title} classes={`carousel-item mb-1 ${i === 0 ? 'active' : ''}`} />
                        })}
                    </div>
                    <a className="carousel-control carousel-control-prev text-body ml-ng carousel-control-prev--always-show d-none d-lg-flex disabled" role="button">
                        <span
                            className="carousel-control-prev-icon carousel-control--background {{#if (eq id 'search-products')}}carousel-control--transparent{{else}}{{/if}} d-flex justify-content-center align-items-center"
                            aria-hidden="true">
                            <ChevronPrev className="svg" />
                        </span>
                    </a>
                    <a className="carousel-control carousel-control-next text-body mr-ng carousel-control-prev--always-show d-none d-lg-flex" role="button">
                        <span
                            className="carousel-control-next-icon carousel-control--background {{#if (eq id 'search-products')}}carousel-control--transparent{{else}}{{/if}} d-flex justify-content-center align-items-center"
                            aria-hidden="true">
                            <ChevronNext className="svg" />
                        </span>
                    </a>
                </div>
            )}
            <p className='search-carousel__note mb-3 mb-lg-0 pb-5 pb-lg-0'>Not what you're looking for?<br className='d-lg-none'></br><span className='d-none d-lg-inline'>&nbsp;</span><nobr>Check our <a href='/collections/all' className='text-underline'>shop all page</a></nobr></p>
        </div>
    )
}

export default CarouselScroll;