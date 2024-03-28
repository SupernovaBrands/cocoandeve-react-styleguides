// import ProductCardQuiz from "@/components/product-card-quiz";
import ProductCard from "@/compounds/ProductCard";
import ProductCardQuiz from "@/compounds/ProductCardQuiz";
import { useEffect } from "react";
import { Fragment } from "react";

const Collection = (props: any) => {
    const { products } = props;

    return (
        <>
            <figure className="w-full relative items-center px-0 mb-g">
                <picture>
                    <source srcSet="https://via.placeholder.com/1920x372" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/828x442" className="w-full" alt="Collection Banner" />
                </picture>
                <figcaption className="w=full flex lg:visible absolute w-auto items-center my-auto top-0 bottom-0">
                    <h1 className="hidden mb-0">Shop All</h1>
                </figcaption>
            </figure>

            <div className="text-left terms--link mt-25">
                <a className="px-1 py-1 underline text-primary font-size-sm">Terms and Conditions</a>
            </div>

            <div className="container mt-3 px-0 lg:px-g">
                <div className="flex flex-wrap overflow-hidden lg:-mx-g">
                    <aside className="w-1/4 hidden px-g lg:block">
                        <span className="block collection-sidebar-label mb-1 mt-3"><strong>Category</strong></span>
                        <ul className="list-unstyled border border-body p-2 w-2/3 rounded-lg">
                            <li><a className="text-body hover:no-underline hover:text-primary" href="javascript:void(0)">Shop All</a></li>
                            <li className="mb-1"><a className="text-body hover:no-underline hover:text-primary" href="">Hair</a></li>
                            <li className="mb-1"><a className="text-body hover:no-underline hover:text-primary" href="">Tan &amp; SPF</a></li>
                            <li className="mb-1"><a className="text-body hover:no-underline hover:text-primary" href="">Skin</a></li>
                            <li className="mb-1"><a className="text-primary hover:no-underline hover:text-primary active" href="">Bodycare</a></li>
                            <li className="mb-1"><a className="text-body hover:no-underline hover:text-primary" href="">Kits &amp; Gift</a></li>
                            <li className="mb-1"><a className="text-body hover:no-underline hover:text-primary" href="">All Accesories</a></li>
                        </ul>
                    </aside>
                    <div className="w-full lg:w-3/4 collection-template__products flex flex-wrap">
                        <div className="flex flex-wrap w-full justify-between mb-25 lg:mb-2 lg:px-g">
                            <h2 className="h1 hidden lg:block w-full lg:w-3/5 lg:order-first self-center">Shop All</h2>
                            <div className="w-1/2 lg:hidden px-hg">
                                <select className="p-1 rounded-lg bg-white mb-2 border border-body w-full min-h-[50px]">
                                    <option>Filter by</option>
                                    <option value="all">Shop All</option>
                                    <option value="hair">Hair</option>
                                    <option value="tan">Tan &amp; SPF</option>
                                    <option value="skin">Skin</option>
                                    <option value="body">Body</option>
                                    <option value="kits-gifts">Kit &amp; Gifts</option>
                                    <option value="all-accesories">All Accesories</option>
                                </select>
                                <select className="p-1 rounded-lg bg-white mb-2 border border-body hidden w-full lg:block min-h-[50px]">
                                    <option>Filter by</option>
                                    <option value="tan">Tan &amp; SPF</option>
                                    <option value="hair">Hair</option>
                                    <option value="body">Body</option>
                                    <option value="kits-gifts">Kit &amp; Gifts</option>
                                    <option value="all-accesories">All Accesories</option>
                                    <option value="all">Shop All</option>
                                </select>
                            </div>
                            <div className="w-1/2 lg:w-2/5 lg:flex items-center justify-end px-hg">
                                <select className="p-1 w-full lg:w-auto rounded-lg mb-2 lg:mb-0 custom-select bg-white border border-body pr-1 lg:pr-3 min-h-[50px]">
                                    <option value="Manual">Featured</option>
                                    <option value="best-selling">Best Selling</option>
                                    <option value="title-ascending">Alphabetically, A-Z</option>
                                    <option value="title-descending">Alphabetically, Z-A</option>
                                    <option value="price-ascending">Price, low to high</option>
                                    <option value="price-descending">Price, high to low</option>
                                    <option value="created-ascending">Date, old to new</option>
                                    <option value="created-descending">Date, new to old</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap collection-grid overflow-hidden">
                            {products.map((item: any, index: number) => {
                                return index === 2 ? (
                                    <>
                                        <ProductCardQuiz />
                                        <ProductCard
                                            product={item}
                                            className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                            button={true}
                                        />
                                    </>
                                ) : (
                                    <ProductCard
                                        product={item}
                                        className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                        button={true}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="container collection-template">
                <div className="row">
                    <aside className="col-3 d-none d-lg-block">
                        <span className="d-block collection-sidebar-label mb-1 mt-3"><strong>Category</strong></span>
                        <ul className="list-unstyled collection-sidebar p-2 col-8 rounded">
                            <li className="mb-1"><a href="">Tan</a></li>
                            <li className="mb-1"><a href="">Hair</a></li>
                            <li className="mb-1"><a href="" className="active">Body</a></li>
                            <li className="mb-1"><a href="">Kits & Gift</a></li>
                            <li className="mb-1"><a href="">All Accesories</a></li>
                            <li><a href="#">Shop All</a></li>
                        </ul>
                    </aside>
                    <div className="col-12 col-lg-9">
                        <div className="row collection-grid overflow-hidden">
                            <div className="col-6 d-lg-none">
                                <select className="p-1 rounded mb-2 custom-select collection-selection-mobile">
                                    <option>Filter by</option>
                                    <option value="tan">Tan</option>
                                    <option value="hair">Hair</option>
                                    <option value="body">Body</option>
                                    <option value="kits-gifts">Kit & Gifts</option>
                                    <option value="all-accesories">All Accesories</option>
                                    <option value="all">Shop All</option>
                                </select>
                                <select className="p-1 rounded mb-2 custom-select d-none collection-selection-mobile collection-selection-variant">
                                    <option>Filter by</option>
                                    <option value="tan">Tan</option>
                                    <option value="hair">Hair</option>
                                    <option value="body">Body</option>
                                    <option value="kits-gifts">Kit & Gifts</option>
                                    <option value="all-accesories">All Accesories</option>
                                    <option value="all">Shop All</option>
                                </select>
                            </div>
                            <div className="col-6 col-lg-5 d-lg-flex align-items-center justify-content-end">
                                <span className="sortby-label d-none d-lg-inline-block fw-bold me-lg-1">Sort By</span>
                                <select className="p-1 rounded mb-2 mb-lg-0 custom-select pe-1 pe-lg-3">
                                    <option value="Manual">Featured</option>
                                    <option value="best-selling">Best Selling</option>
                                    <option value="title-ascending">Alphabetically, A-Z</option>
                                    <option value="title-descending">Alphabetically, Z-A</option>
                                    <option value="price-ascending">Price, low to high</option>
                                    <option value="price-descending">Price, high to low</option>
                                    <option value="created-ascending">Date, old to new</option>
                                    <option value="created-descending">Date, new to old</option>
                                </select>
                            </div>
                            <h2 className="h1 d-none d-lg-block col-12 col-lg-7 order-lg-first align-self-center mb-0">Shop All</h2>
                            <div className="col-12 mt-1 mb-1">
                                <hr className=" mt-0"/>
                                <div className="collection-grid__tags mb-4 d-none mt-1">
                                    <a className="me-1 py-1 px-2 text-body text-decoration-none active">All</a>
                                    <a className="me-1 py-1 px-2 text-body text-decoration-none">Shampoo & Conditioner</a>
                                    <a className="me-1 py-1 px-2 text-body text-decoration-none">Treatments</a>
                                    <a className="me-1 py-1 px-2 text-body text-decoration-none">Body</a>
                                </div>
                            </div>
                            <div className="col-12 loading collapse text-center"><div className="spinner-border mb-3" role="status" aria-label="Loading..."></div></div>
                            {products.length > 0 && products.map((product,index) => {
                                return index === 2 ? (
                                    <Fragment key={`block-${product.id}`}>
                                        <ProductCardQuiz key={`quiz-product-1`} title="Find your customised tan shade!" textButton="Take the quiz" imageDesktop={`/cocoandeve-react-styleguides/quiz-banner-desktop.jpg`} imageMobile="/cocoandeve-react-styleguides/quiz-banner-mobile.jpg"/>
                                        <ProductCardQuiz key={`quiz-product-2`} title="Find your customised tan shade!" isThreeLines={true} addNewLine={true} textButton="Take the quiz" imageDesktop={`/cocoandeve-react-styleguides/quiz-banner-desktop.jpg`} imageMobile="/cocoandeve-react-styleguides/quiz-banner-mobile.jpg"/>
                                        <ProductCard
                                            key={product.id}
                                            useCardTemplate={false}
                                            useCarousel={false}
                                            className="d-flex flex-column  col-6 col-md-4 mb-5 product-card text-center position-relative"
                                            activeIndex=""
                                            product={product}
                                            itemMovingNext=""
                                            itemMovingPrev=""
                                            abtestBtn={true}
                                        />
                                    </Fragment>
                                ) : (<ProductCard
                                    showTip={index===0}
                                    key={product.id}
                                    useCardTemplate={false}
                                    useCarousel={false}
                                    className="d-flex flex-column  col-6 col-md-4 mb-5 product-card text-center position-relative"
                                    activeIndex=""
                                    product={product}
                                    itemMovingNext=""
                                    itemMovingPrev=""
                                    abtestBtn={true}
                                    />)
                            })}
                        </div>
                    </div>
                </div>
            </div> */}
            <hr className="collection-footer border-gray-400" />
            <div className="container py-2 mb-2">
                <h2 className="mb-2">About our products</h2>
                <p className="mb-g">Treat your hair to the ultimate pamper routine, with Coco & Eve’s hair care products, straight from paradise. </p>
                <p className="mb-g">Explore our hydrating shampoo and conditioner to achieve instant gloss, shine and smoothness. </p>

                <p className="mb-g">Revive and renew your scalp with our scalp exfoliator and discover our Like a Virgin hair masque and Sweet Repair Hair Masque for hydrated and shiny hair! </p>

                <p className="mb-g">Need a quick fix? Try our Leave in Conditioner to instantly transform your hair. Looking to take your hair care routine to the next level? Browse our accessories and treat yourself to a shampoo brush or hair towel wrap for some extra pampering.</p>
            </div>
        </>
    )
}

export default Collection;
