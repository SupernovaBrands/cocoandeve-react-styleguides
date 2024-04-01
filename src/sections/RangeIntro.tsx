import { useState, useRef, useEffect } from 'react';
import React from 'react';
import DHA from '@/images/icons/natural-dha.svg';
import parse from 'html-react-parser';

const RangeIntro = (props: any) => {
    const { content } = props;
    const [activeImg, setActiveImg] = useState({ desktop: content[0].desktopImg, mobile: content[0].mobileImg });
    const [openIndex, setOpenIndex] = useState(0);

    const toggleCard = (id: number) => {
		if (id === openIndex) {
			setOpenIndex(0);
		} else {
			setOpenIndex(id);
            setActiveImg({ desktop: content[id].desktopImg, mobile: content[id].mobileImg });
		}
	};

    return (
        <div className="container pb-4 pt-lg-4 pt-3 px-0">
            <div className="flex flex-wrap mx-g mx-lg-0 mb-lg-2">
                <div className="w-full lg:w-1/2 px-0">
                    <picture className="w-full block">
                        <source srcSet={activeImg.desktop} media="(min-width: 992px)" width="370" height="370" />
                        <img src={activeImg.mobile} alt="Range Intro" className="w-full h-full" width="384" height="200" loading="lazy" />
                    </picture>
                </div>
                <div className="lg:w-1/2 w-full bg-gray-100 px-2 py-3 lg:p-4 flex justify-center">
                    <div className="block">
                        <DHA className="h-[2em] block mb-4" />
                        <div className="mx-0 mt-4">
                            {content.map((item: any, index: number) => (
                                <div key={index} className="flex flex-wrap pb-2">
                                    <div className={`text-left range-collapse__toggle btn-unstyled w-full flex justify-between font-bold text-body ${openIndex === index ? '' : ''}`} onClick={() => toggleCard(index)}>
                                        <span className='mb-1 text-lg cursor-pointer'>{item.title}</span>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: item.content }} className={`transition-all overflow-hidden ${openIndex === index ? 'duration-1000 max-h-screen' : 'duration-75 max-h-0'}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RangeIntro;