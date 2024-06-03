import { useEffect, useState } from "react";

const deliveryLi = (countryName) => {
    return (<li>{countryName}</li>);
};

const DeliveryReturns = (props: any) => {
    const { content } = props;
    const [pageContent, setPageContent] = useState(null);
    console.log('content1', content?.body?.[0]?.Sections);
    const cols = [0, 1, 2, 3, 4, 5, 6];

    const getDataByIndex = (col) => {
        const countries = pageContent?.delivery?.esc_countries_list.split("\n");
        const perCol = 7;
        const startIndex = col * 7;
        const endIndex = startIndex + perCol;

        const countriesList = [];
        for(let i=startIndex; i<endIndex; i = i+1) {
            const countryName = countries[i];
            if (countryName) {
                countriesList.push(deliveryLi(countryName));
            }
        }
        return countriesList;
    }

    useEffect(() => {
        if (content?.body?.[0]?.Sections) {
            setPageContent(content?.body?.[0]?.Sections[0]);
        }
    }, [content]);
    return (
		<>
            <section>
                <div className="container max-w-screen-lg py-4">
                    <div className="flex flex-wrap -mx-hg lg:-mx-g text-center justify-center pb-4">
                        <h1 className="mb-1">Delivery & Returns</h1>
                    </div>
                    <div className="flex flex-col -mx-hg lg:-mx-g text-center justify-center py-g border-b-[#adadad] border-b-[1px] border-b-solid">
                        <h2 className="block mb-1">Standard delivery times</h2>
                        <p className="mb-1">(Including processing time)*</p>
                    </div>
                    <div className="flex flex-wrap -mx-hg lg:-mx-g text-center justify-center pt-g pb-5 border-b-[#adadad] border-b-[1px] border-b-solid">
                        <div className="flex flex-wrap w-full pb-5">
                            {pageContent?.delivery?.times_country.map((co) => (
                                <div className="relative max-w-full lg:w-1/4 px-g w-1/2 md:mt-3 md:mb-3 mb-2">
                                    <div className="bg-[#f9eeca] p-[12px] text-left h-full rounded">
                                        <h5 className="font-bold mb-1 text-lg">{co.title}</h5>
                                        <p>{co.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-g lg:px-3 flex flex-wrap -mx-hg lg:-mx-g text-center justify-center pt-3 pb-5 border-b-[#adadad] border-b-[1px] border-b-solid">
                        <h2 className="block mb-2 w-full">We deliver to the following countries:</h2>
                        {pageContent?.delivery?.esc_countries_list && cols.map((col) => {
                            if(getDataByIndex(col).length > 0) {
                                return (<div className="w-1/2 lg:lg:w-1/5 px-g pb-3">
                                    <ul className="delivery-countries-text m-0 text-left">{getDataByIndex(col)}</ul>
                                </div>)
                            }
                        })}
                    </div>
                    <div className="flex flex-col -mx-hg lg:-mx-g text-center justify-center pb-4 pt-3">
                        <h2 className="text-2xl mb-1">Didn’t find your answer?</h2>
                        <p>No worries, you can contact us <a aria-label="Contact us here" className="text-underline" href="https://support.cocoandeve.com/hc/en-us/requests/new" title="https://support.cocoandeve.com/hc/en-us/requests/new">here</a>.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DeliveryReturns;