import { useState } from 'react';

const SearchProductCard = (props) => {
    return (
        <figure class={`product-card product-card--search-result position-relative col-12 col-lg-2 d-flex flex-lg-column mb-2 order-4 px-lg-g ${props.classes}`}>
            <a href="" class="col-3 col-lg-12 px-0">
                <picture>
                    <img src="https://via.placeholder.com/444x558" alt="Placeholder" class="d-block w-100" />
                </picture>
            </a>
            <figcaption class="flex-grow-1 d-flex flex-column ms-g ms-lg-0 align-self-center w-100">
                <form class="product-card-form flex-grow-1 d-flex flex-column h-100">
                    <input type="hidden" name="id" value="variantId" />
                    <input type="hidden" name="quantity" value="1" />
                    <a href="#" class="product-card__text fw-bold text-body mb-0 mt-0 mt-lg-2">{props.title}</a>
                </form>
            </figcaption>
        </figure>
    )
}

export default SearchProductCard;