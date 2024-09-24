import { useEffect, useState } from "react";
import Austria from '~/images/countries/austria.svg';
import Belgium from '~/images/countries/belgium.svg';
import Bulgaria from '~/images/countries/bulgaria.svg';
import Croatia from '~/images/countries/croatia.svg';
import Czech from '~/images/countries/czech.svg';
import Denmark from '~/images/countries/denmark.svg';
import Estonia from '~/images/countries/estonia.svg';
import Finland from '~/images/countries/finland.svg';
import France from '~/images/countries/france.svg';
import Germany from '~/images/countries/germany.svg';
import Greece from '~/images/countries/greece.svg';
import Hungary  from '~/images/countries/hungary.svg';
import Ireland  from '~/images/countries/ireland.svg';
import Italy from '~/images/countries/italy.svg';
import Latvia from '~/images/countries/latvia.svg';
import Luxembourg from '~/images/countries/luxembourg.svg';
import Monaco from '~/images/countries/monaco.svg';
import Netherlands from '~/images/countries/netherlands.svg';
import Poland from '~/images/countries/poland.svg';
import Portugal from '~/images/countries/portugal.svg';
import Slovakia from '~/images/countries/slovakia.svg';
import Slovenia from '~/images/countries/slovenia.svg';
import Spain from '~/images/countries/spain.svg';
import Sweden from '~/images/countries/sweden.svg';
import Switzerland from '~/images/countries/switzerland.svg';
import UnitedKingdom from '~/images/countries/uk.svg';
import China from '~/images/countries/china.svg';
import Macao from '~/images/countries/monaco.svg';
import Malaysia from '~/images/countries/malaysia.svg';
import Philippines from '~/images/countries/philippines.svg';
import Singapore from '~/images/countries/singapore.svg';
import Australia from '~/images/countries/australia.svg';
import NewZealand from '~/images/countries/nz.svg';
import Canada from '~/images/countries/canada.svg';
import USA from '~/images/countries/usa.svg';

const deliveryLi = (countryName) => {
    return (<li>{countryName}</li>);
};

const DeliveryReturns = (props: any) => {
    const { content } = props;
    const [pageContent, setPageContent] = useState(null);
    const [pageTitle, setPageTitle] = useState('Delivery');
    const [isDesktop, setIsDesktop] = useState(false);
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
            setPageTitle(content?.body?.[0]?.title);
        }
    }, [content]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsDesktop(window.innerWidth >= 991);
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    return (
		<>
            <section>
                <div className="container lg:max-w-[1200px] pt-5 lg:pt-2 pb-0 lg:pb-0">
                    <div className="flex flex-wrap -mx-hg lg:-mx-g text-center justify-center lg:pb-4">
                        <h1 className="mb-1">{pageTitle}</h1>
                    </div>
                    <div className="flex flex-col mx-0 lg:-mx-0 text-center justify-center pt-g pb-[18px] lg:pb-g border-b-[#adadad] border-b-[1px] border-b-solid">
                        <h2 className="block mb-1">Standard delivery times</h2>
                        <p className="mb-1">(Including processing time)*</p>
                    </div>
                    <div className="flex flex-wrap -mx-hg lg:-mx-g text-center justify-center pt-[16px] lg:pt-[45px] pb-0 border-b-[#adadad] border-b-[1px] border-b-solid lg:px-g">
                        <div className="flex flex-wrap w-full pb-[50px] lg:pb-[105px]">
                            {pageContent?.delivery?.times_country.map((co) => (
                                <div className="relative max-w-full lg:w-1/4 px-hg lg:px-g w-1/2 md:mt-3 md:mb-3 mb-2">
                                    <div className="bg-[#f9eeca] p-[12px] lg:p-[24px] text-left h-full rounded">
                                        <h5 className="font-bold mb-1 text-lg">{co.title}</h5>
                                        <p className="mb-[12px] lg:mb-[15px]">{co.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" lg:px-0 flex flex-wrap -mx-hg lg:-mx-g text-center justify-center pt-3 pb-[15px] lg:pb-2 border-b-[#adadad] border-b-[1px] border-b-solid">
                        <h2 className="block mb-2 lg:mb-[29px] w-full text-base">We deliver to the following countries:</h2>
                        <div className="flex flex-wrap justify-start lg:justify-center w-full">
                            {/* {pageContent?.delivery?.esc_countries_list && cols.map((col) => {
                                if(getDataByIndex(col).length > 0) {
                                    return (<div className="w-1/2 lg:lg:w-[16.6%] px-hg lg:px-g pb-3">
                                        <ul className="delivery-countries-text m-0 text-left">{getDataByIndex(col)}</ul>
                                    </div>)
                                }
                            })} */}
                            <div className="lg:w-2/5 w-full px-hg lg:px-g pb-3">
                                <h5 className="font-bold mb-1 text-md text-left">Europe</h5>
                                <div className="flex flex-wrap justify-start w-full">
                                    {isDesktop ? (
                                        <>
                                            <ul className="w-[30%] delivery-countries-text m-0 text-left text-sm lg:block hidden">
                                                <li className="flex"><Austria className="mr-[7px] mt-[2px]" />Austria</li>
                                                <li className="flex"><Belgium className="mr-[7px] mt-[2px]" />Belgium</li>
                                                <li className="flex"><Bulgaria className="mr-[7px] mt-[2px]" />Bulgaria</li>
                                                <li className="flex"><Croatia className="mr-[7px] mt-[2px]" />Croatia</li>
                                                <li className="flex"><Czech className="mr-[7px] mt-[2px]" />Czech Republic</li>
                                                <li className="flex"><Denmark className="mr-[7px] mt-[2px]" />Denmark</li>
                                                <li className="flex"><Estonia className="mr-[7px] mt-[2px]" />Estonia</li>
                                                <li className="flex"><Finland className="mr-[7px] mt-[2px]" />Finland</li>
                                                <li className="flex"><France className="mr-[7px] mt-[2px]" />France</li>
                                                <li className="flex"><Germany className="mr-[7px] mt-[2px]" />Germany</li>
                                            </ul>
                                            <ul className="w-[30%] delivery-countries-text m-0 text-left text-sm lg:block hidden">
                                                <li className="flex"><Greece className="mr-[7px] mt-[2px]" />Greece</li>
                                                <li className="flex"><Hungary className="mr-[7px] mt-[2px]" />Hungary</li>
                                                <li className="flex"><Ireland className="mr-[7px] mt-[2px]" />Ireland</li>
                                                <li className="flex"><Italy className="mr-[7px] mt-[2px]" />Italy</li>
                                                <li className="flex"><Latvia className="mr-[7px] mt-[2px]" />Latvia</li>
                                                <li className="flex"><Luxembourg className="mr-[7px] mt-[2px]" />Luxembourg</li>
                                                <li className="flex"><Monaco className="mr-[7px] mt-[2px]" />Monaco</li>
                                                <li className="flex"><Netherlands className="mr-[7px] mt-[2px]" />Netherlands</li>
                                                <li className="flex"><Poland className="mr-[7px] mt-[2px]" />Poland</li>
                                            </ul>
                                            <ul className="w-[30%] delivery-countries-text m-0 text-left text-sm lg:block hidden">
                                                <li className="flex"><Portugal className="mr-[7px] mt-[2px]" />Portugal</li>
                                                <li className="flex"><Slovakia className="mr-[7px] mt-[2px]" />Slovakia</li>
                                                <li className="flex"><Slovenia className="mr-[7px] mt-[2px]" />Slovenia</li>
                                                <li className="flex"><Spain className="mr-[7px] mt-[2px]" />Spain</li>
                                                <li className="flex"><Sweden className="mr-[7px] mt-[2px]" />Sweden</li>
                                                <li className="flex"><Switzerland className="mr-[7px] mt-[2px]" />Switzerland</li>
                                                <li className="flex"><UnitedKingdom className="mr-[7px] mt-[2px]" />United Kingdom</li>
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <ul className="w-1/2 delivery-countries-text m-0 text-left text-sm lg:hidden block">
                                                <li className="flex"><Austria className="mr-[7px] mt-[2px]" />Austria</li>
                                                <li className="flex"><Belgium className="mr-[7px] mt-[2px]" />Belgium</li>
                                                <li className="flex"><Bulgaria className="mr-[7px] mt-[2px]" />Bulgaria</li>
                                                <li className="flex"><Croatia className="mr-[7px] mt-[2px]" />Croatia</li>
                                                <li className="flex"><Czech className="mr-[7px] mt-[2px]" />Czech Republic</li>
                                                <li className="flex"><Denmark className="mr-[7px] mt-[2px]" />Denmark</li>
                                                <li className="flex"><Estonia className="mr-[7px] mt-[2px]" />Estonia</li>
                                                <li className="flex"><Finland className="mr-[7px] mt-[2px]" />Finland</li>
                                                <li className="flex"><France className="mr-[7px] mt-[2px]" />France</li>
                                                <li className="flex"><Germany className="mr-[7px] mt-[2px]" />Germany</li>
                                                <li className="flex"><Greece className="mr-[7px] mt-[2px]" />Greece</li>
                                                <li className="flex"><Hungary className="mr-[7px] mt-[2px]" />Hungary</li>
                                                <li className="flex"><Ireland className="mr-[7px] mt-[2px]" />Ireland</li>
                                            </ul>
                                            <ul className="w-1/2 delivery-countries-text m-0 text-left text-sm lg:hidden block">
                                            <li className="flex"><Italy className="mr-[7px] mt-[2px]" />Italy</li>
                                                <li className="flex"><Latvia className="mr-[7px] mt-[2px]" />Latvia</li>
                                                <li className="flex"><Luxembourg className="mr-[7px] mt-[2px]" />Luxembourg</li>
                                                <li className="flex"><Monaco className="mr-[7px] mt-[2px]" />Monaco</li>
                                                <li className="flex"><Netherlands className="mr-[7px] mt-[2px]" />Netherlands</li>
                                                <li className="flex"><Poland className="mr-[7px] mt-[2px]" />Poland</li>
                                                <li className="flex"><Portugal className="mr-[7px] mt-[2px]" />Portugal</li>
                                                <li className="flex"><Slovakia className="mr-[7px] mt-[2px]" />Slovakia</li>
                                                <li className="flex"><Slovenia className="mr-[7px] mt-[2px]" />Slovenia</li>
                                                <li className="flex"><Spain className="mr-[7px] mt-[2px]" />Spain</li>
                                                <li className="flex"><Sweden className="mr-[7px] mt-[2px]" />Sweden</li>
                                                <li className="flex"><Switzerland className="mr-[7px] mt-[2px]" />Switzerland</li>
                                                <li className="flex"><UnitedKingdom className="mr-[7px] mt-[2px]" />United Kingdom</li>
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="lg:w-1/5 sm:w-1/2 px-hg lg:px-g pb-3">
                                <h5 className="font-bold mb-1 text-md text-left">Asia</h5>
                                <ul className="delivery-countries-text m-0 text-left text-sm">
                                    <li className="flex"><China className="mr-[7px] mt-[2px]" />China <br className="block lg:hidden"/>(Hong Kong, Macao)</li>
                                    <li className="flex"><Malaysia className="mr-[7px] mt-[2px]" />Malaysia</li>
                                    <li className="flex"><Philippines className="mr-[7px] mt-[2px]" />Philippines</li>
                                    <li className="flex"><Singapore className="mr-[7px] mt-[2px]" />Singapore</li>

                                </ul>
                            </div>
                            <div className="lg:w-1/5 sm:w-1/2 px-hg lg:px-g pb-3">
                                <h5 className="font-bold mb-1 text-md text-left">Oceania</h5>
                                <ul className="delivery-countries-text m-0 text-left text-sm">
                                    <li className="flex"><Australia className="mr-[7px] mt-[2px]" />Australia</li>
                                    <li className="flex"><NewZealand className="mr-[7px] mt-[2px]" />New Zealand</li>
                                </ul>
                            </div>
                            <div className="lg:w-1/5 w-full px-hg lg:px-g pb-3">
                                <h5 className="font-bold mb-1 text-md text-left">North America</h5>
                                <ul className="delivery-countries-text m-0 text-left text-sm">
                                    <li className="flex"><Canada className="mr-[7px] mt-[2px]" />Canada</li>
                                    <li className="flex"><USA className="mr-[7px] mt-[2px]" />United States</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col -mx-hg lg:-mx-g text-center justify-center pb-4 pt-3">
                        <h2 className="text-2xl mb-1 mx-g">Didn’t find your answer?</h2>
                        <p>No worries, you can contact us <a aria-label="Contact us here" className="text-underline" href="https://support.cocoandeve.com/hc/en-us/requests/new" title="https://support.cocoandeve.com/hc/en-us/requests/new">here</a>.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DeliveryReturns;
