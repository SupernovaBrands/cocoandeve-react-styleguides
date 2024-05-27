const NavMegaMenuAll = (props: any) => {
    const { menus, generalSetting } = props;
    return (
        <div className="z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                <div className="flex w-full">
                    <div className="max-w-[14.625em] mr-3 mb-3 px-0">
                        <a href={generalSetting.mega_menu_shop_all_url}>
                            <button className="text-lg px-3 bg-gray-400 text-primary rounded border border-transparent font-bold  py-1 mb-2 w-full">
                                {generalSetting.mega_menu_shop_all_label}
                            </button>
                            {generalSetting.bg_image && (
                                <img src={generalSetting.bg_image.url} alt="Shop all mega menu" className="d-block w-100 rounded" />
                            )}
                        </a>
                    </div>
                    <div className="ml-3 mb-3 flex flex-wrap justify-between  px-0 flex-grow-1 w-full">
                        {menus && menus.map((menu) => {
                            if (menu.handle !== '/collections/sale' && menu.handle !== '/collections/all') {
                                return (
                                    <div key={`menu-${menu.title}`} className="d-flex flex-column">
                                        <a href={menu.handle} className="block mb-2 text-lg text-body font-bold">{menu.title}</a>
                                        <ol className="list-unstyled">
                                            {menu.rows.map((row) => (
                                                <li key={`menuRow-${row.title}`} className="mb-1 ">
                                                    <a href={row.handle} className="text-body">{row.title}</a>
                                                </li>
                                            ))}
                                            {menu.handle !== '/collections/kits-gifts' && (
                                                <li><a href={menu.handle} className="text-body font-bold">Shop {menu.title} Range</a></li>
                                            )}
                                        </ol>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMegaMenuAll;
