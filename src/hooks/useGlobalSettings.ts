'use client';

// import { useLocation } from 'react-use';
import useSWR from 'swr'
import axios from 'axios';
import usePreview from './usePreview';
// import useStoreIndentifier from './useStoreIdentifier';
// import usePreview from 'styleguide/hooks/usePreview';

const host = process.env.NEXT_PUBLIC_STRAPI_HOST_PROD;
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const fetcher = (url: string) => {
    const headers = { Authorization: `bearer ${token}` };
    return axios.get(url, { headers }).then(res => res.data)
};

const useGlobalSettings = () => {
    // const { search } = useLocation();
    // const { storeId } = useStoreIndentifier();
    const { isPreview } = usePreview();
    // const query = new URLSearchParams(search);
    let params = '';
    if (isPreview) params = '?preview=true';
    const { data, error, isLoading } = useSWR(`https://${host}/theme-settings/global-settings${params}`, fetcher);

    return {
        error,
        isLoading,
        data,
    }
}

export default useGlobalSettings;
