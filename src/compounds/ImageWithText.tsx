import React from 'react';

interface ImageWithTextProps {
    reverse?: boolean;
    src: string;
    srcSet: string;
    children: React.ReactNode;
}

const ImageWithText: React.FC<ImageWithTextProps> = (props) => {
    return (
        <figure className={`flex flex-wrap -mx-hg lg:-mx-g relative items-center mb-[1rem] lg:mb-2 mt-5 px-g ${props.reverse ? 'flex-row-reverse' : ''}`}>
            <div className="-z-[1] lg:order-last w-full lg:w-2/3 lg:px-g">
                {props.src && (
                    <div className="sm:mx-0 lg:mx-0">
                        <picture>
                            {props.srcSet && <source srcSet={props.srcSet} media="(min-width: 992px)" />}
                            <img src={props.src} className="w-full" alt="" />
                        </picture>
                    </div>
                )}
            </div>
            <figcaption className="w-full lg:w-1/3 px-g lg:px-g">
                <div className={`${!props.reverse ? 'lg:-mr-[40%]' : ''} sm:-mt-[7em] text-start lg:mt-0 p-2 lg:pt-3 lg:pb-3 lg:pr-3 bg-white ${props.reverse ? 'lg:-ml-[40%] mr-auto lg:pl-3' : ''}`}>
                    {props.children}
                </div>
            </figcaption>
        </figure>
    );
};

export default ImageWithText;
