import React, { useState, useEffect, useRef } from 'react';
import ProductBannerSlider from '../compounds/ProductBannerSlider';
import Plus from '~/images/icons/plus.svg';
import Minus from '~/images/icons/minus.svg';

const CONTENT_INGREDIENTS = [
    {
        title: 'Hyaluronic Acid',
        text: 'Hydrates and repairs skin texture.',
        open: false
    },
    {
        title: 'Banana',
        text: 'Hydrates and repairs skin texture.',
        open: false
    },
    {
        title: 'Coconut Water',
        text: 'Hydrates and repairs skin texture.',
        open: false
    },
    {
        title: 'Dragon Fruit',
        text: 'Hydrates and repairs skin texture.',
        open: false
    },
    {
        title: 'Fig',
        text: 'Hydrates and repairs skin texture.',
        open: false
    }
] 

const ProductInfo = (props: any) => {
    
    const { data } = props;
    const { benefits, how_to_use, ingredients } = data;
    const [ingredientsContent, setIngredientsContent] = useState(ingredients || []);

    const [activeTab, setActiveTab] = useState('ingredients');
    const [comparisonImages, setComparisonImages] = useState({
        first_image: {
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_57.png?v=1756216902'
        },
        second_image: {
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_57.png?v=1756216902'
        }
    });

    const onIngAccordionChange = (i) => {
        const ingredientsContent = [...ingredients];
        if (ingredientsContent[i].open) {
            ingredientsContent[i].open = false;
        } else {
            for (let j = 0; j < ingredientsContent.length; j++) {
                ingredientsContent[j].open = false;
            }
            ingredientsContent[i].open = !ingredientsContent[i].open;
        }
        setIngredientsContent(ingredientsContent);
    }
    
    useEffect(() => {
        if (data) {
            const { slide1image2, slide1image3 } = how_to_use;
            if (slide1image2?.url && slide1image3?.url) {
                setComparisonImages({ 
                    first_image: slide1image2,
                    second_image: slide1image3
                });
            }
        }
        setIngredientsContent(ingredients);
    }, [props]);

    useEffect(() => {
        if (data) {
            const { slide1image2, slide1image3 } = how_to_use;
            if (slide1image2?.url && slide1image3?.url) {
                setComparisonImages({ 
                    first_image: slide1image2,
                    second_image: slide1image3
                });
            }
        }
    }, [activeTab])
    return (
        <>
            <div className={`px-0 text-center`}>
                <div className="container lg:flex lg:justify-between">
                    <h2 className="container text-xl lg:text-2xl text-center mb-g lg:mb-[30px] lg:mx-0 lg:text-left">{data?.heading || 'Meet Bronzing Face Drops'}</h2>
                    <div className="lg:w-1/2 info-tabs flex gap-[8px] mb-g lg:mb-[30px] justify-center">
                        {/* <a onClick={() => setActiveTab('benefits')} className={`${activeTab === 'benefits' ? 'active !bg-primary !text-white' : ''} bg-[#F5F5F5] px-[16px] py-[5px] rounded-[30px] border-0  !text-dark text-decoration-none hover:no-underline flex items-center`} id="benefits" role="button" tabIndex={0} aria-controls="benefits" aria-selected="true">
                            Benefits
                        </a> */}
                        <a onClick={() => setActiveTab('ingredients')} className={`${activeTab === 'ingredients' ? 'active !bg-primary !text-white' : ''} bg-[#F5F5F5] px-[16px] py-[5px] rounded-[30px] border-0  !text-dark text-decoration-none hover:no-underline flex items-center`} id="ingredients" role="button" tabIndex={0} aria-controls="ingredients" aria-selected="true">
                            Ingredients
                        </a>
                        <a onClick={() => setActiveTab('how_to_use')} className={`${activeTab === 'how_to_use' ? 'active !bg-primary !text-white' : ''} bg-[#F5F5F5] px-[16px] py-[5px] rounded-[30px]  !text-dark text-decoration-none hover:no-underline flex items-center`} id="how_to_use" role="button" tabIndex={0} aria-controls="how to use" aria-selected="true">
                            How to use
                        </a>
                    </div>
                </div>
                {benefits && (
                    <div className={`flex mx-0 mb-0 flex-wrap bg-yellow-light ${activeTab === 'benefits' ? 'block' : 'hidden'} `}>
                        <div className={`content flex  w-full flex-col lg:flex-row`}>
                            <div className='lg:w-1/2'>
                                <picture className="block w-full rounded-[32px]">
                                    <source
                                        srcSet={benefits?.bannerImgDesk?.url}
                                        media="(min-width: 992px)" width="1362" height="1162"/>
                                    <img
                                        src={benefits?.bannerImgMob?.url}
                                        className="lg:max-h-[500px] object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                                </picture>
                            </div>
                            <div className='lg:max-w-[585px] lg:my-[40px] lg:w-1/2 lg:rounded-[32px] lg:px-[60px] lg:py-[40px] px-g text-white py-[16px] bg-[#BA3373] text-left'>
                                <h2 className="mb-2 text-[20px] text-left lg:text-[32px] lg:leading-[40px] ">{benefits?.heading}</h2>
                                <ul>
                                    <li className='flex mb-2 items-center'>
                                        <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                            <img src={benefits?.image1?.url} />
                                        </div>
                                        <p>{benefits?.benefits_text_1}</p>
                                    </li>
                                    <li className='flex mb-2 items-center'>
                                        <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                            <img src={benefits?.image2?.url} />
                                        </div>
                                        <p>{benefits?.benefits_text_2}</p>
                                    </li>
                                    <li className='flex mb-2 items-center'>
                                        <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                            <img src={benefits?.image3?.url} />
                                        </div>
                                        <p>{benefits?.benefits_text_3}</p>
                                    </li>
                                    <li className='flex mb-2 items-center'>
                                        <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                            <img src={benefits?.image4?.url} />
                                        </div>
                                        <p>{benefits?.benefits_text_4}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                {ingredientsContent?.length > 0 && (
                    <div className={`flex mx-0 mb-0 flex-wrap lg:bg-yellow-light ${activeTab === 'ingredients' ? 'block' : 'hidden'} `}>
                        <div className='container pb-[0px] lg:pb-[50px] lg:pt-[50px] px-g'>
                            <ul className='flex lg:gap-g flex-col lg:flex-row'>
                                {ingredientsContent.map((item, i) => {
                                    return (
                                        <li className={`flex-1 lg:flex grow border-b-[#ADADAD] border-b border-solid lg:border-b-0 lg:border-t-0 ${i === 0 ? 'border-t-[#ADADAD] border-t border-solid' : ''}`}> 
                                            <div className={`heading flex grow justify-between lg:hidden py-3`}>
                                                <h3 className='text-left'>{item?.title}</h3>
                                                <div className='flex' onClick={() => onIngAccordionChange(i)}>
                                                    {!item.open && (<Plus className={`h-[.75em] w-[.75em] mb-[3px] ${item.open ? 'hidden' : 'block'}`} />)}
                                                    {item.open && (<Minus className={`h-[.75em] w-[.75em] mb-[3px] ${!item.open ? 'hidden' : 'block'}`} />)}
                                                </div>
                                            </div>
                                            <div className={`accordion-content lg:max-h-none grow bg-white lg:p-[16px] lg:rounded-[20px] text-left lg:block ${!item.open ? 'accordion-content--close' : 'accordion-content--open'}`}>
                                                <img className='mb-[20px]' src={item?.image?.url} />
                                                <h2 className='mb-1'>{item.title}</h2>
                                                <p className='lg:flex grow mb-g lg:mb-0'>{item.description}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                
                {how_to_use && (
                    <div className={`flex flex-col-reverse lg:flex-row mx-0 mb-0 flex-wrap bg-yellow-light ${activeTab === 'how_to_use' ? 'block' : 'hidden'} `}>
                        <div className={`product__banner-left lg:w-1/2 text-left flex justify-center`}>
                            <div className={`product__banner-content lg:min-h-[420px] lg:max-w-[535px] flex justify-center flex-col`}>
                                <h2 className="lg:text-[32px] text-[20px] mb-2 lg:mb-4">{how_to_use?.heading}</h2>
                                <ul>
                                    {how_to_use?.step1 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">1</span>
                                            <p className="ml-g">{how_to_use?.step1}</p>
                                        </li>
                                    )}

                                    {how_to_use?.step2 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">2</span>
                                            <p className="ml-g">{how_to_use?.step2}</p>
                                        </li>
                                    )}

                                    {how_to_use?.step3 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">3</span>
                                            <p className="ml-g">{how_to_use?.step3}</p>
                                        </li>
                                    )}
                                    {how_to_use?.step4 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">4</span>
                                            <p className="ml-g">{how_to_use?.step4}</p>
                                        </li>
                                    )}
                                    {how_to_use?.step5 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">5</span>
                                            <p className="ml-g">{how_to_use?.step5}</p>
                                        </li>
                                    )}
                                    {how_to_use?.step6 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">6</span>
                                            <p className="ml-g">{how_to_use?.step6}</p>
                                        </li>
                                    )}
                                    {how_to_use?.step7 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">7</span>
                                            <p className="ml-g">{how_to_use?.step7}</p>
                                        </li>
                                    )}
                                    {how_to_use?.step8 && (
                                        <li className="flex mb-[16px]">
                                            <span className="text-[#BA3373] text-center text-[40px] font-bold flex-[0_0_20px]">8</span>
                                            <p className="ml-g">{how_to_use?.step8}</p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="product__banner-right w-full lg:w-1/2 px-0 relative flex lg:w-1/2">
                            {comparisonImages && activeTab === 'how_to_use' ? (
                                <div className="product-banner__image w-full">
                                    <ProductBannerSlider {...comparisonImages} />
                                </div>
                            ) : ( 
                                <>
                                    <picture className="block pt-[86%] w-full overflow-hidden">
                                        <source
                                            srcSet={props.src}
                                            media="(min-width: 992px)" width="1362" height="1162"/>
                                        <img
                                            src={props.src}
                                            className="embed-responsive-item object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                                    </picture>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductInfo;