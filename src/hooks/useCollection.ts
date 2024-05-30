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

export const useCollectionSingle = (handle: string) => {
	const { isPreview } = usePreview();
	let params = '';
    if (isPreview) params = '?preview=true';
	let { data, error, isLoading } = useSWR(`https://${host}/single-collection/${handle}${params}`, fetcher, { revalidateOnFocus: true, revalidateOnReconnect: true });
	let collectionSingle: any;
	let store: string;
	if (isPreview) {
		collectionSingle = data?.find((c) => c.storePreview) || {};
		store = 'dev';
	} else {
		collectionSingle = data?.find((c) => c.storePreview === null) || {};
		store = 'us';
	}
	return {
		error,
		isLoading,
		collectionSingle,
		store,
	}
};

export const useCollectionSettings = (handle: string) => {
	const { isPreview } = usePreview();
    let params = '';
    if (isPreview) params = '?preview=true';
	let { data, error, isLoading } = useSWR(`https://${host}/collection-settings${params}`, fetcher, { revalidateOnFocus: true, revalidateOnReconnect: true });
	let store: string;
	if (isPreview) {
		store = 'dev';
	} else {
		store = 'us';
	}

	const handleName = handle === 'tan' ? 'tan-and-spf' : handle;
	const universalBanner = data?.CollectionSettings.find((section: any) => section.__component === 'collection.universal-collection-setting');
	const mainSettings = data?.CollectionSettings.find((section: any) => section.__component === `collection.${handleName}-range-collection-setting`) || universalBanner;
	let filterCollectionHandles = data?.filter_collections_handles
	if (isPreview) filterCollectionHandles = filterCollectionHandles?.replace('hair', 'hair,hair-benefits');
	const quizSetting = data?.quiz_collection;

	return {
		error,
		mainSettings,
		universalBanner,
		filterCollectionHandles,
		isLoading,
		store,
		quizSetting,
	}
};
