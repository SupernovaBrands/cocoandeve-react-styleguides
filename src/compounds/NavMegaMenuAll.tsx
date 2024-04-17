const NavMegaMenuAll = (props: any) => {
    const { menus } = props;
    return (
        <div className="z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                <div className="flex w-full">
                    <div className="max-w-[14.625em] mr-3 mb-3 px-0">
                        <button className="text-lg px-3 bg-gray-400 text-primary rounded border border-transparent font-bold  py-1 mb-2 w-full">
                            Shop all products
                        </button>
                        <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0493b42e-6873-464e-e99e-859d6b859700/public" alt="Shop all mega menu" className="d-block w-100 rounded" />
                    </div>
                    <div className="ml-3 mb-3 flex flex-wrap justify-between  px-0 flex-grow-1 w-full">
                        {menus && menus.map((menu) => {
                            if (menu.handle !== 'sale' && menu.handle !== 'all') {
                                return (
                                    <div className="d-flex flex-column">
                                        <a href={`/collections/${menu.handle}`} className="block mb-2 text-lg text-body font-bold">{menu.title}</a>
                                        <ol className="list-unstyled">
                                            {menu.rows.map((row) => (
                                                <li className="mb-1 ">
                                                    <a href={`/collections/${row.handle}`} className="text-body">{row.title}</a>
                                                </li>
                                            ))}
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