import { useState } from 'react';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import ProductBanner from '~/compounds/ProductBanner';
import useMediaQuery from '~/hooks/useMediaQuery';
import PlusIcon from '~/images/icons/plus.svg';
import MinusIcon from '~/images/icons/minus.svg';

const HairSolution = (props: any) => {
    const [activeTab, setActiveTab] = useState(0);
    const isDesktop = useMediaQuery('(min-width: 769px)');
    const { ConditionalWrap } = props;

    const [openIndex, setOpenIndex] = useState(-1);

    const onClick = async (id:any) => {
		const afterClick = () => {
			const scrollDiv = globalThis.document.getElementById(`accordionSimple`).offsetTop + 41;
			globalThis.window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth'});
		}

		// props.onClick(id, afterClick);
        // console.log('');
        let openIndexId = id;
        if (id === openIndex) {
            openIndexId = -1;
        }
        await setOpenIndex(openIndexId);
        afterClick();
	}

    return (
        <>
            <figure className="w-full relative items-center px-0 mb-0 lg:flex lg:flex-wrap">
                <picture className={``}>
                    <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9c538654-30de-422f-8eac-bba23c3bc000/public" media="(min-width: 992px)" />
                    <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/217998c3-ed10-42fd-81ad-c37a69a44500/540x" className="w-full" alt="Hair Concern Solution Banner" width="375" height="200" fetchPriority="high"/>
                </picture>
                <figcaption className="absolute top-[50%] max-w-[55%] -translate-y-[50%] left-g lg:w-1/2 lg:scroll-ml-1 lg:left-[calc(((100%-960px)/2)+(15px))] xl:left-[calc(((100%-1200px)/2)+(15px))]">
                    <h1 className="text-xl mb-[.5rem] lg:text-2xl">Your Hair's <br className="lg:hidden" />New Best Friend!</h1>
                    <p className="text-sm lg:text-base">Pamper your hair with our exclusive, tailor-made hair care products <br className="hidden lg:block" />crafted for every hair type, texture, and need.</p>
                </figcaption>
            </figure>

            <section>
                <h2>Discover Our Hair Care Range</h2>
                <div className="product__carousel-nav-container hidden lg:flex lg:justify-center lg:items-center container lg:px-g">
					<ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-g lg:pb-3 justify-start px-hg lg:px-0">
						<li><TabNav className={`${activeTab === 0 ? 'text-body' : ''}`} title='Like A Virgin' active={activeTab === 0} onNavChange={() => setActiveTab(0)} /></li>
						<li><TabNav className={`${activeTab === 1 ? 'text-body' : ''}`} title='Pro Youth' active={activeTab === 1} onNavChange={() => setActiveTab(1)} /></li>
						<li><TabNav className={`${activeTab === 2 ? 'text-body' : ''}`} title='Sweet Repair' active={activeTab === 2} onNavChange={() => setActiveTab(2)} /></li>
                        <li><TabNav className={`${activeTab === 3 ? 'text-body' : ''}`} title='Boost Therapy' active={activeTab === 3} onNavChange={() => setActiveTab(3)} /></li>
					</ul>
				</div>
                <ConditionalWrap
                    condition={isDesktop}
                    wrap={children => <div className="lg:px-0 text-center">{children}</div>}
                    elseWrap={children => <div className="bg-gray-400 px-g border-t-0 border-b-0 md:border-t md:border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">{children}</div>}
                >
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 0}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${0}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 0 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 0 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(0)}>
                                    <strong className="text-body no-underline">Like A Virgin</strong>
                                    { openIndex === 0 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 0 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 0 ? 'accordion-content--open' : 'accordion-content--close'}`}>
                                    {children}
                                </div>
                            </div>
                        )}
                    >
                        <ProductBanner
                            mainClasses={'product__banner--hair-concerns-solutions'}
                            background="bg-gray-400 lg:bg-gray-100"
                            reverse={true}
                            pictureClasses={'pt-0 lg:pt-[56%]'}
                            imageClasses={'lg:embed-responsive-item lg:object-cover rounded-[.5rem] lg:rounded-[0]'}
                            textContentClasses={'lg:grid-cols-[1fr_repeat(8,_[_col-start_]_minmax(0,_70px))] lg:!pl-0 lg:!pb-[1rem] !px-0'}
                            textContentBoxClasses={'lg:col-start-[col-start_2] lg:col-end-[span_5] mb-0 lg:text-start'}
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Like A Virgin</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 1}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${1}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 1 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 1 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(1)}>
                                    <strong className="text-body no-underline">Pro Youth</strong>
                                    { openIndex === 1 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 1 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 1 ? 'accordion-content--open' : 'accordion-content--close'}`}>
                                    {children}
                                </div>
                            </div>
                        )}
                    >
                        <ProductBanner
                            mainClasses={'product__banner--hair-concerns-solutions'}
                            background="bg-gray-400 lg:bg-gray-100"
                            reverse={true}
                            pictureClasses={'pt-0 lg:pt-[56%]'}
                            imageClasses={'lg:embed-responsive-item lg:object-cover rounded-[.5rem] lg:rounded-[0]'}
                            textContentClasses={'lg:grid-cols-[1fr_repeat(8,_[_col-start_]_minmax(0,_70px))] lg:!pl-0 lg:!pb-[1rem] !px-0'}
                            textContentBoxClasses={'lg:col-start-[col-start_2] lg:col-end-[span_5] mb-0 lg:text-start'}
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Pro Youth</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 2}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${2}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 2 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 2 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(2)}>
                                    <strong className="text-body no-underline">Sweet Repair</strong>
                                    { openIndex === 2 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 2 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 2 ? 'accordion-content--open' : 'accordion-content--close'}`}>
                                    {children}
                                </div>
                            </div>
                        )}
                    >
                        <ProductBanner
                            mainClasses={'product__banner--hair-concerns-solutions'}
                            background="bg-gray-400 lg:bg-gray-100"
                            reverse={true}
                            pictureClasses={'pt-0 lg:pt-[56%]'}
                            imageClasses={'lg:embed-responsive-item lg:object-cover rounded-[.5rem] lg:rounded-[0]'}
                            textContentClasses={'lg:grid-cols-[1fr_repeat(8,_[_col-start_]_minmax(0,_70px))] lg:!pl-0 lg:!pb-[1rem] !px-0'}
                            textContentBoxClasses={'lg:col-start-[col-start_2] lg:col-end-[span_5] mb-0 lg:text-start'}
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Sweet Repair</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 3}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${3}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 3 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 3 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(3)}>
                                    <strong className="text-body no-underline">Boost Therapy</strong>
                                    { openIndex === 3 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 3 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 3 ? 'accordion-content--open' : 'accordion-content--close'}`}>
                                    {children}
                                </div>
                            </div>
                        )}
                    >
                        <ProductBanner
                            mainClasses={'product__banner--hair-concerns-solutions'}
                            background="bg-gray-400 lg:bg-gray-100"
                            reverse={true}
                            pictureClasses={'pt-0 lg:pt-[56%]'}
                            imageClasses={'lg:embed-responsive-item lg:object-cover rounded-[.5rem] lg:rounded-[0]'}
                            textContentClasses={'lg:grid-cols-[1fr_repeat(8,_[_col-start_]_minmax(0,_70px))] lg:!pl-0 lg:!pb-[1rem] !px-0'}
                            textContentBoxClasses={'lg:col-start-[col-start_2] lg:col-end-[span_5] mb-0 lg:text-start'}
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Boost Therapy</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                </ConditionalWrap>
            </section>

            <section>
                <ProductBanner
                    background="bg-pink-light"
                    reverse={false}
                    contentData={{
                        first_image: {
                            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/78a2b1c7-f110-4c41-2e9e-ce525130c600/public'
                        },
                        second_image: {
                            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/31d688c8-5ee8-4f9e-8c4e-5133ea86a800/public'
                        }
                    }}
                    src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/1140x'}
                >
                    <h3 className="h1 mb-2 lg:mb-4">360 Damage Repair</h3>
                    <p>The Ultimate Daily Routine for Damaged Hair!</p>
                    <p>Sweet Repair is a targeted range to repair hair that is weakened by heat, styling, brushing & wear and tear. Scientifically formulated to deeply repair and restore.</p>
                </ProductBanner>
            </section>
        </>
    );
};

export default HairSolution;