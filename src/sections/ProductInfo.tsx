import React, { useState, useEffect, useRef } from 'react';
import ProductBannerSlider from '../compounds/ProductBannerSlider';

const ProductInfo = (props: any) => {
    const { howToUse } = props;

    const [activeTab, setActiveTab] = useState('ingredients');
    const [comparisonImages, setComparisonImages] = useState({
        first_image: {
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_57.png?v=1756216902'
        },
        second_image: {
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_57.png?v=1756216902'
        }
    });
    
    useEffect(() => {
        // if (data) {
        //     const { first_image, second_image } = data;
        //     if (first_image?.url && second_image?.url) {
        //         setComparisonImages({ first_image, second_image });
        //     }
        // }
    }, []);
    return (
        <>
            <div className={`px-0 text-center py-3 lg:px-0 mb-4 lg:mb-5 lg:pb-4`}>
                <div className="container">
                    <h2 className="container text-xl lg:text-2xl text-center mb-g lg:mx-0 ">{'Meet Bronzing Face Drops'}</h2>
                    <div className="info-tabs flex gap-[8px] mb-g justify-center">
                        <a onClick={() => setActiveTab('benefits')} className={`${activeTab === 'benefits' ? 'active !bg-primary !text-white' : ''} bg-[#F5F5F5] px-[16px] py-[5px] rounded-[30px] border-0 text-body !text-dark text-decoration-none`} id="benefits" role="button" tabIndex={0} aria-controls="benefits" aria-selected="true">
                            Benefits
                        </a>
                        <a onClick={() => setActiveTab('ingredients')} className={`${activeTab === 'ingredients' ? 'active !bg-primary !text-white' : ''} bg-[#F5F5F5] px-[16px] py-[5px] rounded-[30px] border-0 text-body !text-dark text-decoration-none`} id="ingredients" role="button" tabIndex={0} aria-controls="ingredients" aria-selected="true">
                            Ingredients
                        </a>
                        <a onClick={() => setActiveTab('how_to_use')} className={`${activeTab === 'how_to_use' ? 'active !bg-primary !text-white' : ''} bg-[#F5F5F5] px-[16px] py-[5px] rounded-[30px] text-body !text-dark text-decoration-none`} id="how_to_use" role="button" tabIndex={0} aria-controls="how to use" aria-selected="true">
                            How to use
                        </a>
                    </div>
                </div>
                
                <div className={`flex mx-0 mb-0 flex-wrap bg-yellow-light ${activeTab === 'benefits' ? 'block' : 'hidden'} `}>
                    <div className={`content flex  `}>
                        <div className='lg:w-1/2'>
                            <picture className="block w-full rounded-[32px]">
                                <source
                                    srcSet={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_61_f6dd4bfb-ef77-4489-944c-aa8e73746159.png?v=1756214904'}
                                    media="(min-width: 992px)" width="1362" height="1162"/>
                                <img
                                    src={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_61_f6dd4bfb-ef77-4489-944c-aa8e73746159.png?v=1756214904'}
                                    className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                            </picture>
                        </div>
                        <div className='lg:my-[40px] lg:w-1/2 lg:rounded-[32px] lg:px-[60px] lg:py-[40px] px-g text-white py-[16px] bg-[#BA3373] text-left'>
                            <h2 className="mb-2 text-[20px] text-left lg:text-xl">What makes our Bronzing Face Drops different?</h2>
                            <ul>
                                <li className='flex mb-2'>
                                    <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="34" fill="none"><path fill="#fff" d="M11.657 29.087a4.497 4.497 0 0 1-5.246-3.581l5.246 3.58Z"/><path fill="#fff" fill-rule="evenodd" d="M7.23 25.35a3.664 3.664 0 0 0 4.274 2.918.833.833 0 0 1 .307 1.637 5.33 5.33 0 0 1-6.218-4.244l1.636-.31Z" clip-rule="evenodd"/><path fill="#fff" d="M9.494 22.1c1.89 0 2.4-1.5 2.4-3.36 0-1.87-.51-3.37-2.4-3.37-1.9 0-2.42 1.5-2.42 3.37 0 1.86.52 3.36 2.42 3.36Zm0-1.08c-.98 0-1.25-1.03-1.25-2.28 0-1.26.27-2.29 1.25-2.29.97 0 1.23 1.03 1.23 2.29 0 1.25-.26 2.28-1.23 2.28Z"/><path fill="#fff" fill-rule="evenodd" d="M11.996 2.06c-1.118 1.717-3.412 5.314-5.488 9.141-1.115 2.058-2.16 4.167-2.922 6.078-.773 1.935-1.219 3.576-1.219 4.728 0 5.648 4.364 10.16 9.667 10.16 5.304 0 9.668-4.512 9.668-10.16 0-1.152-.447-2.793-1.22-4.727-.765-1.91-1.81-4.02-2.931-6.077-2.09-3.836-4.408-7.438-5.554-9.143ZM10.85.773a1.404 1.404 0 0 1 1.85-.42l.106.06.299.313.038.056a124.287 124.287 0 0 1 5.871 9.624c1.137 2.088 2.217 4.26 3.015 6.255.788 1.97 1.339 3.86 1.339 5.346 0 6.494-5.038 11.826-11.333 11.826C5.74 33.833.702 28.502.702 22.007c0-1.487.55-3.375 1.337-5.345.797-1.995 1.874-4.167 3.005-6.254C7.308 6.232 9.822 2.34 10.834.795l.007-.01.008-.012Z" clip-rule="evenodd"/><path fill="#fff" d="M14.225 16.156a.75.75 0 1 1 0 1.499.75.75 0 0 1 0-1.499ZM17.34 19.507a.75.75 0 1 1 0 1.499.75.75 0 0 1 0-1.5Z"/><path fill="#fff" fill-rule="evenodd" d="M17.116 16.054a.624.624 0 0 1 .26.844l-2.331 4.413a.625.625 0 0 1-1.105-.583l2.332-4.414a.625.625 0 0 1 .844-.26Z" clip-rule="evenodd"/></svg>
                                    </div>
                                    <p>Non-drying, alcohol-free formula leaves your skin dewy for days</p>
                                </li>
                                <li className='flex mb-2'>
                                    <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" fill="none"><path fill="#fff" fill-rule="evenodd" d="M18.023.04c-.35.128-.511.376-.478.739.017.184.09.354.34.789.176.305.382.668.459.808.076.14.392.7.7 1.247l1.433 2.54c.479.851.99 1.756 1.135 2.01.77 1.35 1.235 2.2 1.235 2.258 0 .036-.406.759-.901 1.606-.495.847-1.05 1.8-1.23 2.117-.182.318-.677 1.17-1.1 1.894-1.39 2.382-1.791 3.076-1.823 3.16-.03.08-.267.081-5.435.048l-5.404-.034-.172.116c-.137.092-.303.341-.798 1.196-1.37 2.36-4.325 7.438-4.624 7.943a9.05 9.05 0 0 0-.418.776c-.095.226-.097.252-.032.434.038.107.427.828.864 1.603l1.08 1.916c.48.859 1.44 2.56 1.73 3.072.234.41.492.87 1.36 2.425.54.964.655 1.107.93 1.152.257.042 11.226.104 11.372.065.216-.06.377-.272.929-1.228l.592-1.025c.585-1.003.697-1.215.67-1.259-.02-.03-.012-.04.018-.02.029.017.075-.016.105-.074.068-.133.615-1.075.96-1.653.143-.241.652-1.114 1.131-1.94.48-.825.986-1.695 1.126-1.933l.255-.433 1.96.005c1.08.003 3.376.02 5.105.036l3.144.03.196.351 1.12 1.99 1.338 2.38c.49.871 1.82 3.238 2.248 3.995.363.643.463.758.72.83.455.13.893-.215.892-.701 0-.152-.05-.287-.211-.568-.217-.38-.893-1.582-1.598-2.84-.22-.395-.424-.732-.452-.75-.028-.02-.037-.035-.02-.035.028 0-.038-.129-.373-.717a43.811 43.811 0 0 1-.232-.416 60.48 60.48 0 0 0-.39-.692c-.131-.229-.29-.51-.352-.624-.353-.645-1.606-2.847-1.64-2.882-.022-.023-.002-.115.048-.213.085-.17 1.905-3.303 4.169-7.182 1.103-1.889 1.16-1.997 1.161-2.223a.695.695 0 0 0-.719-.71c-.387 0-.463.091-1.328 1.594-.175.305-.664 1.146-1.087 1.87a2434.63 2434.63 0 0 0-3.154 5.415l-.394.68-3.206-.023a904.524 904.524 0 0 1-5.09-.05l-1.883-.028-.404-.722c-.222-.397-.623-1.107-.892-1.577a183.52 183.52 0 0 1-.834-1.477c-.19-.343-.592-1.06-.892-1.594-.3-.534-.872-1.547-1.268-2.253l-.722-1.283.319-.541c.175-.298.431-.74.57-.98.137-.242.59-1.021 1.006-1.733.416-.71 1.106-1.896 1.534-2.632.427-.737.96-1.652 1.182-2.033.223-.38.434-.75.47-.822.065-.128.066-.129.438-.104.206.013 2.624.036 5.373.051 5.504.03 5.111.05 5.398-.255.123-.13.138-.177.138-.431 0-.23-.022-.315-.11-.434-.227-.305.133-.284-5.798-.334-2.967-.025-5.4-.052-5.407-.06-.01-.01-1.134-2.003-1.634-2.9l-.458-.807c-.392-.69-1.953-3.461-2.433-4.319-.776-1.39-.804-1.434-.97-1.529-.205-.117-.392-.138-.587-.067Zm-.64 20.701.377.026.224.4 1.163 2.063a2504.05 2504.05 0 0 1 3.26 5.791c.191.34.348.627.348.637 0 .017-.717 1.264-1.124 1.955a2147.38 2147.38 0 0 0-3.604 6.19l-.391.669-5.078-.015c-4.696-.013-5.083-.02-5.14-.092a40.958 40.958 0 0 1-.734-1.279 2857.125 2857.125 0 0 0-3.287-5.838c-.537-.95-.969-1.74-.96-1.755.026-.05 1.898-3.27 2.823-4.854l1.378-2.369.933-1.606 4.718.026c2.595.014 4.887.037 5.095.051Zm-9.514.791c-.332.17-.458.36-.458.691 0 .269.111.47.338.611l.165.103 4.5.058c2.547.033 4.564.04 4.646.018.165-.045.412-.305.456-.48.016-.064.018-.211.006-.326a.702.702 0 0 0-.49-.567c-.09-.023-1.379-.053-2.865-.069-1.486-.015-3.496-.038-4.466-.05-.97-.014-1.794-.008-1.832.011ZM3.74 28.819a.739.739 0 0 0-.295.688c.017.089.263.573.547 1.076.57 1.01.805 1.428 2.526 4.494.648 1.156 1.24 2.198 1.313 2.317.396.636 1.32.393 1.32-.347 0-.243.01-.22-.62-1.323a989.685 989.685 0 0 1-1.99-3.534 310.697 310.697 0 0 0-1.77-3.13c-.232-.364-.685-.47-1.031-.241Zm17.114-.02c-.292.093-.155-.121-2.496 3.9-.562.965-1.331 2.285-1.71 2.932-.619 1.062-.688 1.203-.706 1.432-.016.21-.001.282.088.416a.719.719 0 0 0 .95.227c.136-.077.258-.243.602-.82.237-.398.465-.786.506-.862.093-.171.456-.798 1.367-2.356l1.092-1.87c.215-.369.514-.878.664-1.132.41-.69.582-1.034.582-1.157 0-.463-.509-.848-.939-.71Z" clip-rule="evenodd"/></svg>
                                    </div>
                                    <p>Formulated with 100% natural DHA for a gradual, sun-kissed glow.</p>
                                </li>
                                <li className='flex mb-2'>
                                    <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" fill="none"><g clip-path="url(#a)"><path fill="#fff" fill-rule="evenodd" d="M33.97 11.737a.645.645 0 0 0-.392-.34c-.386-.117-9.515-2.872-14.813-.172-3.096 1.581-4.33 3.74-4.82 5.276a7.37 7.37 0 0 0 .283 5.296c.037.078.076.153.114.23a19.89 19.89 0 0 0-1.59 2.97c-.029-.71-.076-1.408-.14-2.096a32.834 32.834 0 0 0-1.764-8.101c-.22-.608-.46-1.2-.717-1.775a5.372 5.372 0 0 0 1.577-3.044 6.757 6.757 0 0 0-1.382-5.048C7.829 1.418 1.2.068.92.012a.624.624 0 0 0-.5.116.664.664 0 0 0-.257.456C.13.877-.617 7.8 1.882 11.317a6.581 6.581 0 0 0 4.182 2.923 4.908 4.908 0 0 0 2.992-.468c.203.468.4.966.592 1.492a31.477 31.477 0 0 1 1.69 7.767c.18 1.98.219 3.972.113 5.958-.09.717-.408 4.006-.408 4.352V33.425c0 .009.003.025.005.037a.38.38 0 0 0 .007.029l.008.032.01.031.01.03.013.031a.52.52 0 0 0 .012.026l.016.031.015.025.018.028.018.024.02.025.02.023.021.022.024.022.022.02.027.02.023.016.028.017.027.015.027.014.031.013.027.01.034.011.026.007a.687.687 0 0 0 .037.007l.017.003h.008a.661.661 0 0 0 .08.006c.02 0 .042 0 .063-.003h.011c.017 0 .033-.005.049-.008l.02-.004.038-.01.024-.008.032-.012.026-.012.027-.014.025-.014.026-.017.023-.015.027-.021.02-.016a.244.244 0 0 0 .027-.027l.015-.014.034-.038.006-.007a.67.67 0 0 0 .093-.156l.01-.025.011-.033c.004-.01.006-.02.008-.029l.008-.031.006-.031.004-.02a51.98 51.98 0 0 0 .397-4.02c.21-1.045.504-2.069.88-3.062.414-1.096.928-2.15 1.535-3.146a6.866 6.866 0 0 0 3.065 2.145 7.111 7.111 0 0 0 2.32.377 10.235 10.235 0 0 0 4.616-1.222c5.3-2.7 8.727-11.853 8.87-12.241a.679.679 0 0 0-.02-.529Zm-24.44.042a22.743 22.743 0 0 0-.615-1.117 19.292 19.292 0 0 0-2.457-3.364 13.06 13.06 0 0 0-1.85-1.67.627.627 0 0 0-.892.155.673.673 0 0 0 .152.92c.592.442 1.143.94 1.646 1.486a18.706 18.706 0 0 1 2.988 4.391 3.63 3.63 0 0 1-2.236.351 5.262 5.262 0 0 1-3.252-2.265 8.45 8.45 0 0 1-.1-.135C1.15 8.047 1.26 3.287 1.376 1.464c1.516.383 5.14 1.459 7.188 3.41.269.253.514.532.731.833a5.53 5.53 0 0 1 1.151 4.056 4.1 4.1 0 0 1-.916 2.016ZM24.558 23.32c-2.166 1.104-4.23 1.373-5.966.776a5.596 5.596 0 0 1-2.71-2.032l.012-.017a17.103 17.103 0 0 1 2.27-2.58l4.062 1.53c.07.027.144.041.219.04.31.001.576-.228.63-.544a.663.663 0 0 0-.41-.735l-.378-.142-2.98-1.123c.18-.14.363-.275.548-.406.716-.512 1.47-.964 2.256-1.353l3.62 1.554c.327.14.702-.02.837-.356a.668.668 0 0 0-.345-.863l-.397-.171-2.043-.878a16.864 16.864 0 0 1 5.736-.996.65.65 0 0 0 .64-.66.65.65 0 0 0-.64-.66h-.19c-4.303.01-8.46 1.61-11.721 4.507l-.003.003a18.386 18.386 0 0 0-2.397 2.586 5.586 5.586 0 0 1-.32-1.484 6.299 6.299 0 0 1 .274-2.41c.593-1.858 2.036-3.416 4.172-4.507a12.047 12.047 0 0 1 5.372-1.042 31.68 31.68 0 0 1 6.768.846c.42.096.778.186 1.059.259-.895 2.157-3.913 8.79-7.975 10.858Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M.034 0h34v34h-34z"/></clipPath></defs></svg>
                                    </div>
                                    <p>Tropical Balinese Mango and Guava Scent. (No biscuit smells here!)</p>
                                </li>
                                <li className='flex mb-2'>
                                    <div className='w-[40px] flex-[0_0_40px] flex justify-center mr-[15px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" fill="none"><g clip-path="url(#a)"><path stroke="#fff" stroke-width="1.5" d="M21.206.751a3.509 3.509 0 0 1 2.1.773l.263.238 2.303 2.26c.491.48 1.102.81 1.768.958l.026.006.026.004.403.06.028.005.028.002 3.191.23v.001a3.508 3.508 0 0 1 3.184 2.852l.048.34.31 3.198v-.001c.066.717.342 1.4.791 1.957l.024.027.228.257.018.02.018.018 2.302 2.257h.001a3.513 3.513 0 0 1 .592 4.178l-.188.303-1.79 2.674a3.67 3.67 0 0 0-.632 1.905l-.001.027v.027l.011.408.001.026.002.025.312 3.229v.003a3.513 3.513 0 0 1-2.227 3.62l-.348.117-3.086.85-.002.001a3.66 3.66 0 0 0-1.776 1.121l-.013.016-.014.017-.208.268-.015.02-.013.02-1.808 2.662a3.508 3.508 0 0 1-4.028 1.342l-.352-.14-2.91-1.324h-.001a3.663 3.663 0 0 0-1.99-.294l-.026.003-.023.005-.4.08-.032.006-.03.009-3.128.905a3.51 3.51 0 0 1-3.926-1.566l-.174-.321-1.377-2.913-.001-.003-.125-.238a3.662 3.662 0 0 0-1.291-1.318l-.02-.012-.021-.01-.303-.158-.017-.009-.018-.008-2.94-1.337a3.518 3.518 0 0 1-2.022-3.73l.078-.373.8-3.107a3.634 3.634 0 0 0-.058-2.019l-.007-.022-.009-.023-.148-.38-.01-.027-.013-.026-1.409-2.912a3.516 3.516 0 0 1 .843-4.162l.277-.22 2.619-1.853a3.676 3.676 0 0 0 1.302-1.677l.008-.02.007-.02.105-.328.007-.02.005-.02.82-3.135.001-.003a3.508 3.508 0 0 1 3.327-2.64l.374.012 3.188.237a3.663 3.663 0 0 0 1.97-.4l.024-.013.024-.015.348-.214.022-.013.021-.015 2.634-1.88.002-.002a3.508 3.508 0 0 1 2.146-.658Zm8.616 11.36c-.91-.816-2.547-1.213-3.704-.055l-.008.008-.954.982-.008.009-7.657 8.13-1.082-1.162-.01-.008-.933-.972-.005-.005-1.025-1.048-.004-.004-.351-.354h-.001a2.71 2.71 0 0 0-1.944-.92 2.715 2.715 0 0 0-2.64 1.79 2.712 2.712 0 0 0 .159 2.202c.165.31.391.581.66.805l1.27 1.296 3.076 3.233v.001l2.28 2.432.547.582.547-.582 9.4-10.006v-.001l2.269-2.364-.001-.001.185-.187c.62-.62.898-1.344.837-2.068-.06-.704-.428-1.307-.903-1.733Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.034 0h40v40h-40z"/></clipPath></defs></svg>
                                    </div>
                                    <p>Non comedogenic and dermatologist-approved.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`flex mx-0 mb-0 flex-wrap bg-yellow-light ${activeTab === 'ingredients' ? 'block' : 'hidden'} `}>
                    <div className='container py-[50px]'>
                        <ul className='flex gap-g'>
                            <li className='flex-1 bg-white p-[16px] rounded-[20px] text-left'>
                                <img className='mb-[20px]' src={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/3d_banana_looks_like_realisitc__on_white_background_2.png?v=1756215902`} />
                                <h2 className='mb-1'>Hyaluronic Acid</h2>
                                <p>5 types of HA improve  the appearance of fine lines and wrinkles, while leaving skin plump  and hydrated.</p>
                            </li>
                            <li className='flex-1 bg-white p-[16px] rounded-[20px] text-left'>
                                <img className='mb-[20px]' src={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/3d_banana_looks_like_realisitc__on_white_background_2.png?v=1756215902`} />
                                <h2 className='mb-1'>Banana</h2>
                                <p>Hydrates and repairs skin texture.</p>
                            </li>
                            <li className='flex-1 bg-white p-[16px] rounded-[20px] text-left'>
                                <img className='mb-[20px]' src={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/3d_banana_looks_like_realisitc__on_white_background_2.png?v=1756215902`} />
                                <h2 className='mb-1'>Banana</h2>
                                <p>Hydrates and repairs skin texture.</p>
                            </li>
                            <li className='flex-1 bg-white p-[16px] rounded-[20px] text-left'>
                                <img className='mb-[20px]' src={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/3d_banana_looks_like_realisitc__on_white_background_2.png?v=1756215902`} />
                                <h2 className='mb-1'>Banana</h2>
                                <p>Hydrates and repairs skin texture.</p>
                            </li>
                            <li className='flex-1 bg-white p-[16px] rounded-[20px] text-left'>
                                <img className='mb-[20px]' src={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/3d_banana_looks_like_realisitc__on_white_background_2.png?v=1756215902`} />
                                <h2>Banana</h2>
                                <p>Hydrates and repairs skin texture.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`flex mx-0 mb-0 flex-wrap bg-yellow-light ${activeTab === 'how_to_use' ? 'block' : 'hidden'} `}>
                    <div className={`product__banner-left lg:w-1/2 text-left`}>
                        <div className={`product__banner-content}`}>
                            <h2 className="lg:text-lg lg:mb-40">How to use Bronzing Face Drops</h2>
                            <ul>
                                <li className="flex">
                                    <span>1</span>
                                    <p>Shake it! Gently press the button at the end of the applicator  to release the drops. Add 2-3 drops to your chosen moisturiser in the palm of your hand.</p>
                                </li>
                                <li className="flex">
                                    <span>2</span>
                                    <p>Apply evenly over the face, neck and blend with your hairline. Wash hands thoroughly after use. Apply daily for a gradual, buildable natural tan!</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="product__banner-right w-full lg:w-1/2 px-0 relative flex lg:w-1/2">
                        {comparisonImages ? (
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
            </div>
        </>
    );
};

export default ProductInfo;