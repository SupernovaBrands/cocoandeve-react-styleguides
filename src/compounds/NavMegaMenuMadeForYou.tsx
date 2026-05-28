const DEFAULT_BANNERS = [
    {
        title: 'Build Your Bundle',
        description: 'Mix, match & save your way!',
        bgColor: 'bg-[#DCF0E8]',
        ctaLabel: 'Build Now',
        url: '/pages/build-your-own-bundle',
        image: { url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_133.png?v=1779632775' },
    },
    {
        title: 'Tan Quiz',
        description: 'Find the perfect solution for your skin\'s needs in just a few steps',
        bgColor: 'bg-[#F5F0D8]',
        ctaLabel: 'Take the Quiz',
        url: '/pages/tan-quiz',
        image: { url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_133.png?v=1779632775' },
    },
    {
        title: 'SPF Quiz',
        description: 'Match your skin to the right SPF',
        bgColor: 'bg-[#D8EEF5]',
        ctaLabel: 'Take the Quiz',
        url: '/pages/spf-quiz',
        image: { url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_133.png?v=1779632775' },
    },
    {
        title: 'Hair Concerns & Solutions',
        description: 'Custom solution for you',
        bgColor: 'bg-[#EDE8F5]',
        ctaLabel: 'Shop Now',
        url: '/collections/hair-concerns-solutions',
        image: { url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_133.png?v=1779632775' },
    },
];

const NavMegaMenuMadeForYou = (props: any) => {
    const { generalSetting, madeForYouBanners, megaMenu } = props;

    const shopAllUrl = megaMenu?.shopAllUrl || generalSetting?.mega_menu_shop_all_url || '/collections/all';
    const buildYourOwnUrl = megaMenu?.buildYourOwnUrl || generalSetting?.mega_menu_button2_url || '/pages/build-your-own-bundle';

    const banners = megaMenu?.banners || madeForYouBanners || DEFAULT_BANNERS;

    return (
        <div className="z-[1010] nav-mega-menu left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]" >
            {/* Top bar */}
            <div className="flex items-center justify-end px-g pt-3 pb-2 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <div className="flex gap-3 items-center">
                    <a href={shopAllUrl} className="font-bold text-body hover:text-primary underline underline-offset-2 whitespace-nowrap">
                        Shop All
                    </a>
                    <a href={buildYourOwnUrl} className="font-bold text-body hover:text-primary underline underline-offset-2 whitespace-nowrap">
                        Build Your Own Bundle
                    </a>
                </div>
            </div>

            {/* Banners */}
            <div className="px-g pb-3 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <div className="flex gap-[16px] flex-grow">
                    {banners.map((banner: any, i: number) => (
                        <div key={i} className="rounded-lg px-[16px] pt-4 relative overflow-hidden flex-1 flex flex-col text-center" style={{ minHeight: 420, backgroundColor: banner.bgColor || '#f3f4f6' }}>
                            <div className="mfy-content">
                                <h4 className="font-bold mb-0 min-h-[60px]" style={{ fontSize: 24, lineHeight: '30px' }}>{banner.title}</h4>
                                <p className="font-normal mb-0 min-h-[60px] mb-[16px]" style={{ fontSize: 16, lineHeight: '20px' }}>{banner.description}</p>
                            </div>
                            <a
                                href={banner.url}
                                className="btn btn-primary inline-flex items-center justify-center font-bold"
                                style={{ height: 40, fontSize: 16, lineHeight: '20px' }}
                            >
                                {banner.ctaLabel}
                            </a>
                            <div className="flex-grow" />
                            {banner.image?.url && (
                                <img src={banner.image.url} alt={banner.title} className="absolute bottom-0 left-0 w-full object-contain" loading="lazy" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavMegaMenuMadeForYou;
