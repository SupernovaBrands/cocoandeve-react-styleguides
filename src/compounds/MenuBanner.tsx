import React, { useState, useEffect } from 'react';
import Percentage from '~/images/icons/percentage-square.svg';
import Sun from '~/images/icons/sun.svg';
import HeartPink from '~/images/icons/heart-pink.svg';
import MenuDecoration from '~/images/icons/menu-banner-decoration.svg';
import MenuDecorationGreen from '~/images/icons/menu-banner-decoration-green.svg';

const MenuBanner = (props: any) => {
    const { content, theme, icon, className } = props;
    const [copied, setCopied] = useState(false);
	const {
		type,
		url,
		cta,
		line1,
		line2,
		code,
		product,
	} = content;

    useEffect(() => {
		document.addEventListener('updateMenuBanner', () => {
			setCopied(false);
		});
	}, []);

    const onBannerAction = () => {
		if (type === 'link-to') {
			window.location.href = url || '/collections/all';
		} else if (type === 'copy') {
			const dataCode = code;
			navigator.clipboard.writeText(dataCode);
			setCopied(true);
		}
        /*
        if (type === 'copy-redirect') {
			const dataCode = code;
			navigator.clipboard.writeText(dataCode);
			setCopied(true);
			setTimeout(() => {
				window.location.href = url || '/collections/all';
			}, 500);
		} else if (type === 'add-product-apply-code') {
			try {
				$.getJSON({ url: `https://${window.location.hostname}/products/${product}.js` }).done(function (resp) {
					if (resp) {
						const selectedVariant = resp.variants[0];
						const variantId = selectedVariant.id;
						if (variantId) {
							console.log('variantId', variantId);
							Cart.addItem(parseInt(variantId, 10), 1, null).then(() => {
								setTimeout(function () {
									console.log('add item done');
									discounts.applyDiscountCode(code?.toLowerCase(), getCartId()).then(() => {
										console.log('discount added');
										$('#cart-drawer').modal('show');
									});
								}, 300);
							});
						}
					}
				});
			} catch {
				console.log('add menu banner item failed');
			}
		} else if (type === 'add-product') {
			try {
				$.getJSON({ url: `https://${window.location.hostname}/products/${product}.js` }).done(function (resp) {
					if (resp) {
						const selectedVariant = resp.variants[0];
						const variantId = selectedVariant.id;
						if (variantId) {
							console.log('variantId', variantId);
							Cart.addItem(parseInt(variantId, 10), 1, null).then(() => {
								setTimeout(function () {
									$('#cart-drawer').modal('show');
								}, 300);
							});
						}
					}
				});
			} catch {
				console.log('add menu banner item failed');
			}
		} else if (type === 'apply-code') {
			try {
				discounts.applyDiscountCode(code?.toLowerCase(), getCartId()).then(() => {
					console.log('discount added');
					$('#cart-drawer').modal('show');
				});
			} catch {
				console.log('add menu banner item failed');
			}
		}
        */
	};

	const twoLines = line1.length > 28;

	const icons = {
		'hearth': <HeartPink className="mr-1"/>,
		'heart': <HeartPink className="mr-1"/>,
		'percentage': <Percentage className='mr-1'/>,
		'sun': <Sun className='mr-1'/>
	}

    return (
        <li className={`pt-[5px] pb-0 flex justify-between mx-g mb-1 ${className}`} onClick={() => onBannerAction()} role="presentation">
            <figure className={`flex mb-0 items-center bg-${theme} pl-g relative py-1 my-0 rounded-tl-[.5em] rounded-bl-[.5em] w-[calc(100%-10px)] `}>
				{ icon && icons[icon] }
                <figcaption className="flex-1 text-sm">
                    <span dangerouslySetInnerHTML={{__html: line1}} /><br />
                    <span dangerouslySetInnerHTML={{__html: line2}} />
                </figcaption>
                {cta !== '' && (
					<span className="block text-primary pr-1 font-bold">
						{copied ? (<span className="font-size-sm">Copied!</span>) : cta}
					</span>
				)}
			{theme === 'secondary-light' && (<MenuDecorationGreen className={`absolute banner-decoration text-${theme} top-[0] -right-[10px] h-full`}/>)}
                {theme === 'pink-light' && (<MenuDecoration className={`absolute banner-decoration top-[0] text-${theme} -right-[10px] h-full`}/>)}
            </figure>
        </li>
    );
};

export default MenuBanner;