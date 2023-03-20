import { useState } from 'react';

const NavMegaMenu = (props) => {
    return (
        <div class="nav-mega-menu w-100 bg-white position-absolute d-none">
            <div class="container pt-3">
                <div class="row mx-5 px-3">
                    <div class="col-lg-5 mb-3">
                        <a href="" class="d-block mb-2 h4 text-body text-underline">{props.title}</a>
                        <ol class="list-unstyled">
                            {props.menus.length > 0 && (
                                props.menus.map((menu) => {
                                    return <li class=" mb-1"><a href={menu.url} class="h4 text-body">{menu.title}</a></li>
                                })
                            )}
                        </ol>
                    </div>
                    <div class="col-lg-7 mb-3 row">
                        <span class="d-block mb-2 h4 col-12">Best Sellers:</span>
                        {props.cards.length > 0 && (
                            props.cards.map((card) => {
                                return (
                                    <figure class="product-card product-card--search-result position-relative col-4 d-flex flex-lg-column mb-2 px-lg-g">
                                        <a href="" class="col-12 px-0 text-decoration-none">
                                            <picture>
                                                <img src="https://via.placeholder.com/444x558" alt="Placeholder" class="d-block w-100" />
                                            </picture>
                                            <figcaption class="flex-grow-1 d-flex flex-column ml-g ml-lg-0 align-self-center">
                                                <h5 href="#" class="product-card__text font-weight-bold text-body mb-0 mt-0 mt-1 h6">{card.title}</h5>
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