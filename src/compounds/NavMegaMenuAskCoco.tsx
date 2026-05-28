const DEFAULT_LINKS = [
    { label: 'Track My Order', url: '/tools/tracking' },
    { label: 'Help Center', url: '/pages/faqs' },
    { label: 'Shipping', url: '/pages/shipping' },
    { label: 'Refund Policy', url: '/policies/refund-policy' },
    { label: 'Terms & Conditions', url: '/policies/terms-of-service' },
    { label: 'Privacy Policy', url: '/policies/privacy-policy' },
    { label: 'Modern Slavery Policy', url: '/pages/modern-slavery-policy' },
    { label: 'Accessibility Statement', url: '/pages/accessibility' },
];

const NavMegaMenuAskCoco = (props: any) => {
    const { generalSetting, helpLinks, megaMenu } = props;

    const links = megaMenu?.helpLinks || helpLinks || DEFAULT_LINKS;
    const contactEmail = megaMenu?.contactEmail || generalSetting?.contact_email || 'hello@cocoandeve.com';

    return (
        <div className="z-[1010] nav-mega-menu left-0 border-t w-full border-top-body mt-[13px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="py-4 mx-auto w-full flex justify-between items-start" style={{ maxWidth: 1160 }}>

                {/* Help links */}
                <ul className="list-none pl-0 mb-0 flex flex-col gap-[8px]">
                    {links.map((link: any, i: number) => (
                        <li key={i}>
                            <a
                                href={link.url}
                                className="text-body hover:text-primary no-underline hover:no-underline font-normal leading-[20px]"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Contact card */}
                <div className="rounded-lg px-4 py-4 flex flex-col text-center" style={{ width: 310, background: '#E8F5EE' }}>
                    <h4 className="font-bold mb-[4px] text-[20px] leading-[30px]">Didn't find your answer?</h4>
                    <p className="font-normal mb-1">No worries, you can email us:</p>
                    <p className="font-bold mb-[16px]">{contactEmail}</p>
                    <a
                        href={`mailto:${contactEmail}`}
                        className="btn btn-primary inline-flex items-center justify-center font-bold"
                        style={{ height: 40, fontSize: 16, lineHeight: '20px' }}
                    >
                        Send mail
                    </a>
                </div>

            </div>
        </div>
    );
};

export default NavMegaMenuAskCoco;
