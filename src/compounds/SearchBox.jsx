import { useEffect, useState } from 'react';
import Close from '../../src/images/icons/close.svg';
import Loading from '../../src/images/icons/loading.svg';
import Search from '../../src/images/icons/search-thin.svg';
import SearchProductCard from './SearchProductCard';
import CarouselScroll from '@/components/CarouselScroll';

const SearchBox = (props) => {
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const onChange = (e) => {
        e.target.value;
        setKeyword(e.target.value);
    }

    useEffect(() => {
        setResult();
    }, [keyword]);

    async function setResult () {
        console.log('setting result...');
        const productsResult = [
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 1',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 2',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 3',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 4',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 2',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 6',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 7',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 8',
                handle: '',
                url: '/'
            },
            {
                product_id: '000',
                img: 'https://via.placeholder.com/444x558',
                title: 'Search result 9',
                handle: '',
                url: '/'
            }
        ]

        setProducts(productsResult);
    }

    return (
        <div id="searchPanel" className="search-panel w-100 overflow-hidden bg-white mt-lg-0 d-none">
            <div className="search-panel__top w-100">
                <div className="bg-white px-g">
                    <div className="container position-relative d-flex align-items-center px-0 px-lg-g">
                        <Search className="svg search-panel__input-search-icon position-absolute h2 mb-0" />
                        <input type="text" placeholder="Search" name="q" className="col-12  border-0 py-2 ps-4 ps-lg-4" aria-label="search" onChange={onChange} />
                        <span className="search-panel__clear position-absolute align-items-center disabled" role="button">Clear</span>
                        <span className="search-panel__close position-absolute align-items-center fw-bold d-flex" role="button">
                            <Close className="svg" onClick={props.onToggleSearchBox} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="search-panel__no-result py-3 container d-none">
                <p className="fw-bold">0 results</p>
                <p className="mb-0">Whoops, there it isn’t. Try a new search or check out our <a href="#" className="text-underline">shop all page</a>.</p>
            </div>
            <div className="search-panel__loading py-3 container d-none text-center">
                <Loading className="svg text-primary" />
            </div>
            {keyword === '' ? (
                <div className="search-panel__home container px-g pt-3">
                    <div className="row">
                        <h4 className="col-12 col-lg-4 mb-lg-2 font-weight-normal order-1 font-weight-normal font-size-base">Popular searched items</h4>
                        <h4 className="col-12 col-lg-8 mb-lg-2 font-weight-normal order-3 order-lg-2 font-weight-normal font-size-base">Popular searched products</h4>
                        <div className="col-12 col-lg-4 order-2 mb-3">
                            <span className="search-panel__tag p-1 me-1 d-inline-block mb-1 rounded bg-gray-400 text-gray-600">Mask</span>
                            <span className="search-panel__tag p-1 me-1 d-inline-block mb-1 rounded bg-gray-400 text-gray-600">Shampoo</span>
                            <span className="search-panel__tag p-1 me-1 d-inline-block mb-1 rounded bg-gray-400 text-gray-600">Tan</span>
                            <span className="search-panel__tag p-1 me-1 d-inline-block mb-1 rounded bg-gray-400 text-gray-600">Scul scrub</span>
                            <span className="search-panel__tag p-1 me-1 d-inline-block mb-1 rounded bg-gray-400 text-gray-600">Mitt</span>
                            <span className="search-panel__tag p-1 me-1 d-inline-block mb-1 rounded bg-gray-400 text-gray-600">Bali Bod Bundle</span>
                        </div>
                        <SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4" />
                        <SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4" />
                        <SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4" />
                        <SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-4 mb-lg-1 pb-5 pb-lg-0 order-4" />
                    </div>
                </div>
            ) : (
                <div className="search-panel__result container mt-lg-2 px-g">
                    <div className="row">
                        <h4 className="container mt-2 mt-lg-0 font-size-base">{products.length} results</h4>
                        <CarouselScroll products={products} />
                    </div>
                </div>
            )}
        </div>
    );  
};

export default SearchBox;