import React from 'react';

interface ImageWithTextProps {
    reverse?: boolean;
    template?: string;
    src: string;
    srcSet: string;
    children: React.ReactNode;
}

const ImageWithText: React.FC<ImageWithTextProps> = (props) => {
    return (
        <figure className={`flex flex-wrap -mx-hg lg:-mx-g relative items-center mb-0 lg:max-w-[92.5%] lg:mx-auto ${props.template ? 'mt-0 px-0' : 'mt-3 lg:mt-4 px-g'} ${props.reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`-z-[1] lg:order-last w-full lg:w-[570px] lg:basis-[570px] lg:px-g ${props.reverse ? 'lg:h-[274px]' : 'lg:h-[264px]'} sm:h-[105.57px]`}>
                {props.src && (
                    <div className="sm:mx-0 lg:mx-0">
                        <picture>
                            {props.srcSet && <source srcSet={props.srcSet} media="(min-width: 992px)" />}
                            <img src={props.src} className={`w-full sm:h-[105.57px] ${props.reverse ? 'lg:h-[274px]' : 'lg:h-[264px]'}`} alt="Our story banner text" />
                        </picture>
                    </div>
                )}
            </div>
            <figcaption className="w-full lg:w-[calc(100%-570px)] lg:basis-[calc(100%-570px)] px-0 lg:px-g">
                <div className={`${props.reverse ? 'lg:-ml-[20.5%] mr-auto lg:pl-3 lg:pr-0' : 'lg:-mr-[25%] lg:pr-3'} mt-0 sm:mt-0 text-start px-0 lg:px-g pt-[12px] pb-[12px] lg:pt-3 lg:pb-3 bg-white`}>
                    {props.children}
                </div>
            </figcaption>
        </figure>
    );
};

export default ImageWithText;
