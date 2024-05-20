'use client';

// import { useLocation } from 'react-use';
import useSWR from 'swr'
import axios from 'axios';
import { setLSWithExpiry, getLSWithExpiry, daysToTime } from '~/modules/utils';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useProductImages = () => {
    let imagesData = null;
    if (getLSWithExpiry('featuredImages')) {
        const images = JSON.parse(getLSWithExpiry('featuredImages'));
        imagesData = images;
    } else {
        const { data, error, isLoading } = useSWR(`/api/getFeaturedImages`, fetcher);
        setLSWithExpiry('featuredImages', JSON.stringify(data.body), daysToTime(14));
        imagesData = data?.body ? data?.body : [];
    }
    /*
    return new Promise((resolve, reject) => {
		if (getLSWithExpiry('featuredImages')) {
			resolve(JSON.parse(getLSWithExpiry('featuredImages')));
		} else {
            const { data, error, isLoading } = useSWR(`/api/getFeaturedImages`, fetcher);
            // setLSWithExpiry('featuredImages', JSON.stringify(data.body), daysToTime(14));
		}
	});
    */
   return { data: imagesData };
}

export default useProductImages;
