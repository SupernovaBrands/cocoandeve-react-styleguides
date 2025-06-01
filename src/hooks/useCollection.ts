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

export const useCollectionSingle = (handle: string, store: string) => {
	// const { isPreview } = usePreview();
	let params = '';
    if (store === 'dev') params = '?preview=true';
	let { data, error, isLoading } = useSWR(`https://${host}/single-collection/${handle}${params}`, fetcher, { revalidateOnFocus: true, revalidateOnReconnect: true });
	let collectionSingle: any;
	return {
		error,
		isLoading,
		collectionSingle,
		store,
	}
};

export const useCollectionSettings = (handle: string, store: string) => {
	// const { isPreview } = usePreview();
    let params = '';
    if (store === 'dev') params = '?preview=true';
	let { data, error, isLoading } = useSWR(`https://${host}/collection-settings${params}`, fetcher, { revalidateOnFocus: true, revalidateOnReconnect: true });

	let handleName = handle === 'tan-and-spf' ? 'tan' : handle;
	handleName = handleName === 'kits-gifts' ? 'bundle': handleName;
	console.log('useCollectionSettings', data);
	const universalBanner = data?.CollectionSettings?.find((section: any) => section.__component === 'collection.universal-collection-setting');
	const mainSettings = data?.CollectionSettings?.find(
		(section: any) => section.__component !== 'collection.universal-collection-setting' &&
			(section.range_handles.split(',').map((v) => v.trim()).includes(handle) || section.__component === `collection.${handleName}-range-collection-setting`)
	) || universalBanner;
	let filterCollectionHandles = data?.filter_collections_handles
	filterCollectionHandles = filterCollectionHandles?.replace('hair', 'hair,hair-benefits');
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
