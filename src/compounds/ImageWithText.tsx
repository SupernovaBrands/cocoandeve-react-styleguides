import React from 'react';

interface ImageWithTextProps {
    reverse?: boolean;
    src: string;
    srcSet: string;
    children: React.ReactNode;
}

const ImageWithText: React.FC<ImageWithTextProps> = (props) => {
    return (
        <figure className={`flex flex-wrap -mx-hg lg:-mx-g relative items-center mb-0 lg:mb-2 mt-4 px-g lg:max-w-[92.5%] lg:mx-auto ${props.reverse ? 'flex-row-reverse' : ''} lg:mb-[50px] lg:mt-[50px]`}>
            <div className={`-z-[1] lg:order-last w-full lg:w-[570px] lg:basis-[570px] lg:px-g ${props.reverse ? 'lg:h-[274px]' : 'lg:h-[264px]'}`}>
                {props.src && (
                    <div className="sm:mx-0 lg:mx-0">
                        <picture>
                            {props.srcSet && <source srcSet={props.srcSet} media="(min-width: 992px)" />}
                            <img src={props.src} className={`w-full ${props.reverse ? 'lg:h-[274px]' : 'lg:h-[264px]'}`} alt="" />
                        </picture>
                    </div>
                )}
            </div>
            <figcaption className="w-full lg:w-[calc(100%-570px)] lg:basis-[calc(100%-570px)] px-g lg:px-g">
                <div className={`${props.reverse ? 'lg:-ml-[20.5%] mr-auto lg:pl-3 lg:pr-0' : 'lg:-mr-[25%] lg:pr-3'} sm:-mt-[4.5em] text-start lg:mt-0 px-g pt-2 pb-1 lg:pt-3 lg:pb-3 bg-white`}>
                    {props.children}
                </div>
            </figcaption>
        </figure>
    );
};

export default ImageWithText;
