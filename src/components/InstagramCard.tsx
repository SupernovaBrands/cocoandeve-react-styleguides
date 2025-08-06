import { useEffect, useRef, useCallback, useState } from "react";
import { useIsVisible } from "~/hooks/useIsVisible";
import { formatMoney } from "~/modules/utils";

const InstagramCard = (props: any) => {
    const { videoUrl, author, title, url, classes, product, store, addToCart } = props;
    const [productData, setProductData] = useState({});
    const [productImage, setProductImage] = useState(null);
    const [variantDefault, setVariantDefault] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const { isVisible, targetRef } = useIsVisible(
        {
            root: null,
            rootMargin: "200px",
            threshold: 0.1,
        },
        false,
    );

    const videoRef = useRef<HTMLVideoElement>(null);

    const startVideoOnMouseMove = useCallback(async () => {
        try {
            await videoRef.current.play();
        } catch (e) {
        // do nothing
        }
    }, []);

    const addItem = async () => {
        if (isAdding) return false;
        setIsAdding(true);
		await addToCart({id: variantDefault?.id, quantity: 1, attributes: []})
        setIsAdding(false);
	}

    const stopVideoOnMove = useCallback(() => {
        try {
            videoRef.current.pause();
        } catch (e) {
        // do nothing
        }
    }, []);

    const getProduct = async (productHandle:any) => {
        if (productHandle) {
            try {
                const { product } = await fetch(`/api/getProductInfo?handle=${productHandle}`).then((e) => e.json());
                setProductData(product);
                const { media: { nodes: {0: image }}} = product;
                const { variants: { nodes: productVariants } } = product;

                const availableVariants = productVariants.filter((p:any) => p.availableForSale);
                if (availableVariants.length > 0) {
                    setVariantDefault(availableVariants[0]);
                }

                if (image) {
                    setProductImage(image?.image);
                }
            } catch {
                console.log('error on structuring product data');
            }
        }
    }

    useEffect(() => {
        if (isVisible) {
            startVideoOnMouseMove();
        } else {
            stopVideoOnMove();
        }
    }, [isVisible, startVideoOnMouseMove, stopVideoOnMove]);

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.setAttribute('webkit-playsinline', 'true');
            const tracksLength = videoRef.current?.textTracks.length || 0;
            for (let i = 0; i < tracksLength; i ++) {
                videoRef.current.textTracks[i].mode = 'hidden';
            }
        }
    }, [])

    useEffect(() => {
        getProduct(product)
    }, [product]);

    return (
        <div className={`text-left rounded ${classes}`} ref={targetRef as any}>
            <p className="my-2 text-base text-gray-600 text-center">{author}</p>
            <video preload="none" ref={videoRef}
                crossOrigin="anonymous"
                className="lazy-video w-full mb-0 lazy-video bg-shimmer rounded-[1.5rem] h-[376px] min-h-[376px] lg:rounded-[2rem] object-cover" muted={true} playsInline={true} loop={true} autoPlay={false}>
                <source src={videoUrl} type="video/mp4" />
                <track src="https://cdn.shopify.com/s/files/1/0243/8817/3888/files/captions.vtt?v=1753146729" kind="captions" srcLang="en" label="English" default />
                <track src="https://cdn.shopify.com/s/files/1/0243/8817/3888/files/captions.vtt?v=1753146729" kind="descriptions" srcLang="en" label="English" default />
            </video>
                <picture className="bg-gray-400 p-hg rounded-[1em] flex flex-column flex-nowrap justify-between items-center mt-[10px]">
                    {productImage && <img src={productImage?.url} alt={`${productImage?.alt ?? product.title} Result Section`} className="max-w-[68px] mr-1"/> }
                    <figcaption className="mr-1">
                        <a href={`/products/${product}`} className="font-size-sm font-semibold text-body block hover:text-body no-underline">{title}</a>
                        {variantDefault && variantDefault.compareAtPrice && (
                            <span className="inline-block line-through mr-25 font-normal text-gray-500 mt-1">
                                { formatMoney(parseInt(variantDefault.compareAtPrice.amount) * 100, true, store) }
                            </span>
                        )}
                        {variantDefault && variantDefault.price && (
                            <span className="inline-block font-semibold mt-1">
                                { formatMoney(parseInt(variantDefault.price.amount) * 100, true, store) }
                            </span>
                        )}
                    </figcaption>
                    <button className={`${!variantDefault || isAdding ? 'disabled' : ''} btn btn-primary rounded-full text-white w-[40px] h-[40px] p-0 min-w-[40px]`} onClick={addItem} disabled={!variantDefault || isAdding}>
                        {!isAdding && <span className="text-white text-xl">+</span>}
                        {isAdding && <span className="spinner-border spinner-border-sm text-white lg:text-white !w-[16px] !h-[16px]" role="status" /> }
                    </button>
                </picture>
            {/* <a href={`/products/${product}`} className="font-size-sm text-body block hover:text-body underline">{title}</a> */}
        </div>
    );
};

export default InstagramCard;
