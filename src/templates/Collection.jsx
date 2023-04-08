import ProductCardQuiz from "@/components/product-card-quiz";
import ProductCard from "@/compounds/ProductCard";

const Collection = (props) => {
    const { products } = props;

    return (
        <div className="price-cta-abtest">
        	<figure className="collection-banner container-fluid position-relative align-items-center px-0">
                <picture>
                    <source srcSet="https://via.placeholder.com/1440x200" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/828x442" className="w-100" alt="Collection Banner"/>
                </picture>
                <figcaption className="collection-banner__content col-12 d-flex d-lg-none position-absolute w-auto align-items-center my-auto top-0 bottom-0">
                    <h1 className="mb-0">Shop All</h1>
                </figcaption>
            </figure>
            <div className="container collection-template">
                <div className="row">
                    <aside className="col-3 d-none d-lg-block">
                        <span className="d-block collection-sidebar-label mb-1 mt-3"><strong>Category</strong></span>
                        <ul className="list-unstyled collection-sidebar p-2 col-8 rounded">
                            <li className="mb-1"><a href="">Tan</a></li>
                            <li className="mb-1"><a href="">Hair</a></li>
                            <li className="mb-1"><a href="" className="active">Body</a></li>
                            <li className="mb-1"><a href="">Kits & Gift</a></li>
                            <li className="mb-1"><a href="">All Accesories</a></li>
                            <li><a href="javascript:void(0)">Shop All</a></li>
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
                                <span className="sortby-label d-none d-lg-inline-block font-weight-bold me-lg-1">Sort By</span>
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
                                    <>
                                        <ProductCardQuiz title="Find your customised tan shade!" textButton="Take the quiz" imageDesktop="/quiz-banner-desktop.jpg" imageMobile="/quiz-banner-mobile.jpg"/>
                                        <ProductCardQuiz title="Find your customised tan shade!" addNewLine={true} textButton="Take the quiz" imageDesktop="/quiz-banner-desktop.jpg" imageMobile="/quiz-banner-mobile.jpg"/>
                                        <ProductCard
                                            key={product.id}
                                            useCardTemplate={false}
                                            useCarousel={false}
                                            className="d-flex flex-column  col-6 col-md-4 mb-5 product-card text-center"
                                            activeIndex=""
                                            product={product}
                                            itemMovingNext=""
                                            itemMovingPrev=""
                                            abtestBtn={true}
                                        />
                                    </>
                                ) : (<ProductCard
                                    showTip={index===0}
                                    key={product.id}
                                    useCardTemplate={false}
                                    useCarousel={false}
                                    className="d-flex flex-column  col-6 col-md-4 mb-5 product-card text-center"
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
            </div>
            <hr className="collection-footer" />
            <div className="container py-2 mb-2">
                <h2 className="mb-2">About our products</h2>
                <p>Treat your hair to the ultimate pamper routine, with Coco & Eve’s hair care products, straight from paradise. </p>
                <p>Explore our hydrating shampoo and conditioner to achieve instant gloss, shine and smoothness. </p>

                <p>Revive and renew your scalp with our scalp exfoliator and discover our Like a Virgin hair masque and Sweet Repair Hair Masque for hydrated and shiny hair! </p>

                <p>Need a quick fix? Try our Leave in Conditioner to instantly transform your hair. Looking to take your hair care routine to the next level? Browse our accessories and treat yourself to a shampoo brush or hair towel wrap for some extra pampering.</p>
            </div>
        </div>
    )
}

export default Collection;