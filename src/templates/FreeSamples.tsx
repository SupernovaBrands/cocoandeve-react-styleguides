import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	encryptParam,
} from '~/modules/utils';
import { useSearchParams } from 'next/navigation';
import { getCookie } from "~/modules/utils";
import PageBanner from '~/sections/PageBanner';
import ProductCarousel from '~/sections/ProductCarousel';

const bannerPH = {
    img_desk: {
        url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/FreeSampleHeroBannerDesk.png?v=1752824806'
    },
    img_mob: {
        url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/FreeSampleHeroBannerMob.png?v=1752824806'
    },
    title: ''
}

const FreeSamples = (props: any) => {
    const { store, banner } = props;

    return (
        <>
            <PageBanner content={bannerPH} />
        </>
    )
}

export default FreeSamples;
