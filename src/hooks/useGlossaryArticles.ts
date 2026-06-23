'use client';

import useSWR from 'swr';
import axios from 'axios';

const host = process.env.NEXT_PUBLIC_STRAPI_HOST_PROD;
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const fetcher = (url: string) => {
    const headers = { Authorization: `bearer ${token}` };
    return axios.get(url, { headers }).then(res => res.data);
};

const getImage = (data: any, store: string) => {
    let imgUrl = '';
    const contentStore = data?.BlogContentMultiStores !== null ? data?.BlogContentMultiStores?.[store] : false;
    if (contentStore?.featured_image?.url) {
        imgUrl = contentStore.featured_image.url;
    } else if (data?.image?.url) {
        imgUrl = data.image.url;
    }
    if (!imgUrl && data?.BlogContentMultiStores) {
        Object.values(data.BlogContentMultiStores).forEach((value: any) => {
            if (value?.featured_image?.url) imgUrl = value.featured_image.url;
        });
    }
    return imgUrl;
};

const ARTICLE_LIMIT = 3;

// Mirrors getBlogData() from cocoandeve-headless/hooks/useBlogPage.ts (scoped to the
// "all" tag, capped to ARTICLE_LIMIT), fetched directly from Strapi only when `enabled`
// so the mega menu doesn't request blog data until its tab is actually opened.
export const useGlossaryArticles = (store: string, enabled: boolean) => {
    const preview = store === 'dev' ? '?preview=true' : '';

    const { data: blogSettings } = useSWR(
        enabled ? `https://${host}/blog-settings${preview}` : null,
        fetcher
    );

    const handles: string[] = (blogSettings?.featured_article_all || [])
        .slice(0, ARTICLE_LIMIT)
        .map((entry: any) => entry?.blog?.handle)
        .filter(Boolean);
    const { data: articles, isLoading } = useSWR(
        handles.length > 0 ? ['single-blog', handles.join(','), store] : null,
        async () => {
            const results = await Promise.all(
                handles.map((handle: string) => fetcher(`https://${host}/single-blog/${handle}${preview}`))
            );
            return results
                .filter((r: any) => Array.isArray(r) && r.length > 0)
                .map((r: any) => r[0])
                .filter((article: any) => article?.[`enabled_${store}`] !== false)
                .map((article: any) => ({
                    title: article.title,
                    articleUrl: `/blogs/news/${article.handle}`,
                    tags: article.tags ? article.tags.split(', ') : [],
                    image: { url: getImage(article, store) },
                }));
        }
    );
    return { articles: articles || [], isLoading };
};

export default useGlossaryArticles;
