import { useState } from 'react';

const NavMegaMenu = (props: any) => {
    return (
        <div className="nav-mega-menu w-full left-0 border-top-body mt-[18px] bg-white absolute hidden">
            <div className="container pt-3">
                <div className="row mx-5 px-3">
                    <div className="col-lg-5 mb-3">
                        <a href="" className="d-block mb-2 h4 text-body text-underline">{props.title}</a>
                        <ol className="list-unstyled">
                            {props.menus.length > 0 && (
                                props.menus.map((menu, i) => {
                                    return <li className=" mb-1" key={`mobile-menu-${i}`}><a href={menu.url} className="h4 text-body">{menu.title}</a></li>
                                })
                            )}
                        </ol>
                    </div>
                    <div className="col-lg-7 mb-3 row">
                        <span className="d-block mb-2 h4 col-12">Best Sellers:</span>
                        {props.cards.length > 0 && (
                            props.cards.map((card, i) => {
                                return (
                                    <figure key={`mobile-card-${i}`} className="product-card product-card--search-result position-relative col-4 d-flex flex-lg-column mb-2 px-lg-g">
                                        <a href="" className="col-12 px-0 text-decoration-none">
                                            <picture>
                                                <img src="https://via.placeholder.com/444x558" alt="Placeholder" className="d-block w-100" />
                                            </picture>
                                            <figcaption className="flex-grow-1 d-flex flex-column ml-g ml-lg-0 align-self-center">
                                                <h5 className="product-card__text fw-bold text-body mb-0 mt-0 mt-1 h6">{card.title}</h5>
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