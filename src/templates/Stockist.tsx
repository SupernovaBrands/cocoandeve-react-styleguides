import { useEffect, useState } from "react";

const Stockist = (props) => {
    const [region, setRegion] = useState('usa');
    const [regionTitle, setRegionTitle] = useState('USA');

    const regionChangeHandler = (event) => {
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index]
        let label =  optionElement.getAttribute('data-label');
        setRegion(event.target.value);
        setRegionTitle(label);
    }

    const items = [
        {
            'region': 'united-kingdom',
            'href': 'https://www.asos.com/women/face-body/a-to-z-of-brands/coco-eve/cat/?cid=28100',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Asos_2x_0337b3f4-d947-4656-a7ca-3ffc13dfdc5f_X100.png?v=1590061693',
            'img_alt': 'Asos',
            'status': 'Available online',
            'id': '1'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.cultbeauty.co.uk/coco-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Cult_Beauty_2x_bc78b491-259c-4fd2-8281-ff87f34c2110_X100.png?v=1590062256',
            'img_alt': 'Cult_Beauty',
            'status': 'Available online',
            'id': '2'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.selfridges.com/SG/en/cat/coco-eve/',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/SelfridgesCo_2x_23bdca4c-ed53-46fd-a24d-9645cff36283_X100.png?v=1590066838',
            'img_alt': 'SelfridgesCo',
            'status': 'Available in selected stores',
            'id': '3'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.prettylittlething.com/beauty/brands/coco-eve.html',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/PLT_2x_c76bfaa0-210f-4b1a-b7a3-e772c38d423a_X100.png?v=1590065390',
            'img_alt': 'SelfridgesCo',
            'status': 'Available online',
            'id': '4'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.oliverbonas.com/beauty/coco-and-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/OliverBonas_2x_1_X100.png?v=1593593674',
            'img_alt': 'OliverBonas',
            'status': 'Available in select stores',
            'id': '5'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.beautybay.com/l/cocoeve/',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Beauty_Bay_2x_738fdcde-2894-4b5a-8501-8168617f063d_X100.png?v=1590061686',
            'img_alt': 'Beauty_Bay',
            'status': 'Available online',
            'id': '6'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.birchbox.com/brand/11892/coco-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Birchbox_2x_2146e6c6-cc3a-419d-b8f8-af60f6912124_X100.png?v=1590061714',
            'img_alt': 'Birchbox',
            'status': 'Available online',
            'id': '7'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.harveynichols.com/int/brand/coco-and-eve/',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/HarveyNichols_2x_3e1cb43a-1de4-4558-a85f-a76346d44e7c_X100.png?v=1590064316',
            'img_alt': 'HarveyNichols',
            'status': 'Available in select stores',
            'id': '8'
        },
        {
            'region': 'united-kingdom',
            'href': 'https://www.libertylondon.com/uk/brands/c/coco-and-eve/',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Liberty_London_2x_b3980434-667c-4a9b-a456-19c5868ae3c5_X100.png?v=1590064355',
            'img_alt': 'Liberty_London',
            'status': 'Available in store',
            'id': '9'
        },
        {
            'region': 'usa',
            'href': 'https://www.birchbox.com/brand/11892/coco-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Birchbox_2x_2146e6c6-cc3a-419d-b8f8-af60f6912124_X100.png?v=1590061714',
            'img_alt': 'Birchbox',
            'status': 'Available online',
            'id': '20'
        },
        {
            'region': 'usa',
            'href': 'https://www.ulta.com/brand/coco-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Ulta_2x_75f415fb-feef-4d6f-9587-88da438e02c3_X100.png?v=1590066840',
            'img_alt': 'Ulta',
            'status': 'Available online',
            'id': '10'
        },
        {
            'region': 'usa',
            'href': 'https://www.revolve.com/coco-eve/br/499065/',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Revolve_2x_f572fcbb-5af9-46a8-94a6-a87954e80dc8_X100.png?v=1590065407',
            'img_alt': 'Revolve',
            'status': 'Available online',
            'id': '11'
        },
        {
            'region': 'australia',
            'href': 'https://www.myer.com.au/b/Coco%20%26%20Eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Myer_2x_70e3adce-a8d5-47b1-af35-3c29ce8c6519_X100.png?v=1590064322',
            'img_alt': 'Myer',
            'status': 'Available in select stores',
            'id': '13'
        },
        {
            'region': 'australia',
            'href': 'https://www.adorebeauty.com.au/coco-and-eve.html',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Adore_Beauty_2x_cc07c7c4-375a-47c3-b5a5-429125642d85_X100.png?v=1590061709',
            'img_alt': 'Adore_Beauty',
            'status': 'Available online',
            'id': '14'
        },
        {
            'region': 'europe',
            'href': 'https://www.sephora.fr/marques/de-a-a-z/coco-et-eve-coco/',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Sephora_2x_62df55e7-b72f-4579-8dee-8e285b046c91_X100.png?v=1590066835',
            'img_alt': 'Sephora',
            'status': 'FR, DE, IT, GR, PL, PT, ES, CZ, DK, SE, BG, RS: Available in select stores',
            'id': '15'
        },
        {
            'region': 'europe',
            'href': 'https://www.birchbox.com/brand/11892/coco-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Birchbox_2x_2146e6c6-cc3a-419d-b8f8-af60f6912124_X100.png?v=1590061714',
            'img_alt': 'Birchbox',
            'status': 'FR: Available online',
            'id': '16'
        },
        {
            'region': 'europe',
            'href': 'https://www.galerieslafayette.com/c/beaute-soin/fm/coco+and+eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Galeries_Lafayette_2x_13e4e924-0837-4e00-9398-d2bb0793ea95_X100.png?v=1590062242',
            'img_alt': 'Galeries_Lafayette',
            'status': 'FR: Available in select stores',
            'id': '17'
        },
        {
            'region': 'europe',
            'href': 'https://www.douglas.de/Coco-%26-Eve/index_b5709.html',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Douglas_2x_118aa045-1799-4427-b420-aae4f9b908be_X100.png?v=1590062227',
            'img_alt': 'Douglas',
            'status': 'DE, NL: Available in select stores',
            'id': '18'
        },
        {
            'region': 'asia',
            'href': 'https://www.sephora.sg/brands/coco-and-eve',
            'img': '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Sephora_2x_62df55e7-b72f-4579-8dee-8e285b046c91_X100.png?v=1590066835',
            'img_alt': 'Sephora',
            'status': 'HK, SG, PH, MY, TH: Available in select stores',
            'id': '19'
        }
    ];

    const filteredItems = items.filter(item => {
        return item.region === region;
    })

    return (
        <>
            <section className="container text-center stockist my-4">
                <h1 className="mb-1">Find us in a store near you</h1>
                <form className="flex flex-wrap justify-center items-center">
                    <label className="w-full md:w-auto my-1 lg:text-lg sm:=text-sm font-bold">Choose your region:</label>
                    <div className="w-2/3 md:w-1/4 my-1 px-[5px]">
                        <select className="border-body custom-select mb-0 md:ml-2 stockist__select" value={region} onChange={regionChangeHandler} >
                            <option value="united-kingdom" data-label="United Kingdom">United Kingdom</option>
                            <option value="usa" data-label="USA">USA</option>
                            <option value="asia" data-label="Asia">Asia</option>
                            <option value="europe" data-label="europe">Europe</option>
                            <option value="australia" data-label="Australia">Australia</option>
                        </select>
                    </div>
                </form>
                <p>If we don't stock near you, you can buy online <a href="#" className="underline">here</a> and take advantage of our worldwide delivery</p>
                <h2 className="mt-4 mb-3">Stockists in <span className="stockist__location">{regionTitle}</span></h2>
                <hr className="lg:hidden my-3"></hr>
                <div className="flex flex-wrap justify-center">
                {filteredItems.map((filteredItem) => (
                    <figure key={filteredItem.id} className="m-0 w-1/2 md:w-1/3 px-g lg:px-g" data-toggle={filteredItem.region}>
                        <a href={filteredItem.href} className="block lg:py-g rounded" target="_blank">
                            <img src={filteredItem.img} alt={filteredItem.img_alt} />
                        </a>
                        <figcaption className="h4 my-2 lg:mb-4 lg:mx-4">{filteredItem.status}</figcaption>
                    </figure>
                ))}
                </div>
                <h2 className="h1 mt-2 mb-1">Didn’t find your answer?</h2>
                <p className="lg:text-lg sm:text-sm font-normal">No worries, you can email us: <a href="mailto:hello@cocoandeve.com" className="underline lg:text-lg font-bold">hello@cocoandeve.com</a></p>
            </section>
        </>
    );
};

export default Stockist;