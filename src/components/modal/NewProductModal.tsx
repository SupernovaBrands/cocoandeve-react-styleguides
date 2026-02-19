import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import { useState, useEffect } from 'react';

const NewProductModal = (props) => {
    const { 
        image_position,
        bg_color,
        img_lg,
        img,
        close_color,
        text_color,
        heading,
        subheading,
        description,
        cta_url,
        cta_label,
        handleClose,
    } = props;
    return (
        <div className={`new-product-modal flex w-full h-full ${bg_color} ${image_position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-col`}>
            <div className="lg:w-1/2 w-full lg:h-[480px] sm:h-[230px] flex items-center justify-center">
                <picture className="w-full h-full">
                    <source srcSet={img_lg?.url} media="(min-width: 992px)" />
                    <img src={img?.url} className="w-full h-full object-cover object-top" alt={`Popup of ${heading}`} />
                </picture>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-3 lg:p-4 lg:min-w-[390px]">
                <CloseButton handleClose={handleClose} className={`${close_color ?? 'fill-[#000]'} h-[1em!important] text-sm [width:auto!important]`} />
                <div className="text-center w-full">
                    <h3 className={`${text_color || 'text-body'} font-bold text-[24px] lg:text-[32px] leading-[1.25] mb-[4px]`}>{heading}</h3>
                    <h4 className={`${text_color || 'text-body'} font-bold text-[16px] lg:text-[20px]`}>{subheading}</h4>
                    <p className={`${close_color || 'text-body'}  mb-2 text-[14px] lg:text-[14px] leading-[1.25] mt-1 lg:mt-[4px]`}>{description}</p>
                    
                    <a href={cta_url} className="btn-lg py-[15px] hover:no-underline hover:text-white w-full items-center border-2 border-primary bg-primary text-white inline-flex justify-center relative rounded-[0] mt-1 text-[16px]">
                        {cta_label}
                    </a>
                </div>
            </div>
        </div>
    )
};

export default NewProductModal;