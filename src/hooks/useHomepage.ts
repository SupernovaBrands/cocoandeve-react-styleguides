'use client';

import useSWR from 'swr'
import axios from 'axios';
import usePreview from './usePreview';

const host = process.env.NEXT_PUBLIC_STRAPI_HOST_PROD;
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const fetcher = (url: string) => {
    const headers = { Authorization: `bearer ${token}` };
    return axios.get(url, { headers }).then(res => res.data)
};

const useHomepage = () => {
    const { isPreview } = usePreview();
    let params = '';
    if (isPreview) params = '?preview=true';
    const { data, error, isLoading } = useSWR(`https://${host}/homepage/sections${params}`, fetcher, { revalidateOnFocus: true, revalidateOnReconnect: true });
    const slideShows = data?.Sections.find((comp) => comp.__component === 'section.slideshow')?.['slide_dev'] || [];

    return {
        error,
        isLoading,
        data,
        slideShows: slideShows.filter((slide: any) => slide.show),
    }
}

export default useHomepage;