const NavMegaMenu = (props: any) => {
    return (
        <div className="z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                <div className="flex mx-5 px-3">
                    <div className="lg:w-2/5 pr-4 pl-4 mb-3">
                        <a href="" className="block mb-2 h4 text-body underline">{props.title}</a>
                        <ol className="list-unstyled">
                            {props.menus.length > 0 && (
                                props.menus.map((menu, i) => {
                                    return <li className=" mb-1" key={`mobile-menu-${i}`}><a href={`/collections/${menu.handle}`} className="h4 text-body">{menu.title}</a></li>
                                })
                            )}
                        </ol>
                    </div>
                    <div className="lg:w-3/5 pr-4 mb-3 flex flex-wrap ">
                        <span className="block mb-2 text-lg w-full px-g">Best Sellers:</span>
                        {props.cards.length > 0 && (
                            props.cards.map((card, i) => {
                                return (
                                    <figure key={`mobile-card-${i}`} className="relative w-1/3 flex lg:flex-col mb-2 lg:px-g">
                                        <a href="" className="px-0 !no-underline flex-none max-w-none">
                                            <picture>
                                                <img src="https://via.placeholder.com/444x558" alt="Placeholder" className="block w-100 object-cover max-h-[none]" />
                                            </picture>
                                            <figcaption className="flex-grow-1 d-flex flex-column ml-g lg:ml-0 align-self-center">
                                                <h5 className="product-card__text font-bold text-body mb-0 mt-1">{card.title}</h5>
                                            </figcaption>
                                        </a>
                                    </figure>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>

    );  
};

export default NavMegaMenu;