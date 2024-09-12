import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	encryptParam,
} from '~/modules/utils';
import TrackConfirmed from '~/images/icons/track-confirmed.svg';
import TrackPickup from '~/images/icons/track-pickup.svg';
import TrackPickupDisabled from '~/images/icons/track-pickup-disabled.svg';
import TrackTransit from '~/images/icons/track-transit.svg';
import TrackTransitDisabled from '~/images/icons/track-transit-disabled.svg';
import TrackDelivered from '~/images/icons/track-delivered.svg';
import TrackDeliveredDisabled from '~/images/icons/track-delivered-disabled.svg';
import { useSearchParams } from 'next/navigation';
import { getCookie } from "~/modules/utils";

const TrackMyOrder = (props: any) => {
    const { store } = props;
    const [code, setCode] = useState('');
    const [showDelivery, setShowDelivery] = useState(false);
    const [dataTracking, setDataTracking] = useState(null);
    const [submitBtn, setSubmitbtn] = useState('Track Order');
    const inputRef = useRef(null);

    const fetchTrack = (trackingNumber: string) => {
        setSubmitbtn('Tracking...');
        setShowDelivery(false);
        // const trackingNumber = code;
        const date = new Date();
        const tse = date.getTime();
        const dataString = `{tracking:'${trackingNumber}',time:${tse}}`;
        const signature = encryptParam(dataString);
        const storeBrand = `cocoandeve_shopify_${getCookie('region')}`;
        fetch(`https://s-app.cocoandeve.com/track_order.json?order_number=${trackingNumber}&brand_name=${storeBrand}&signature=${signature}`, { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                setShowDelivery(true);
                setDataTracking(data?.data || null);
                setSubmitbtn('Track Order');
            });
    };

    const tracking = async (e) => {
        e.preventDefault();
        fetchTrack(inputRef?.current.value);
    }

    const searchParams = useSearchParams();
    const urlNum = searchParams.get('trackingNumber');
    // console.log('number', urlNum);
    // if (urlNum) {
    //     setCode(urlNum);
    // }

    useEffect(() => {
        if (urlNum) {
            setCode(urlNum);
        }
    }, [urlNum]);

    useEffect(() => {
        if (code) fetchTrack(code);
    },[code]);

    return (
        <>
            <section>
                <div className="container pb-0 lg:pb-2 px-g">
                    <div className="flex flex-wrap lg:-mx-g text-center justify-center">
                        <h1 className="block w-full mt-[10px] mx-[0] mb-[0] pt-[40px] px-[0] pb-[0] text-[20px] tracking-[.6px] bg-[#fff] uppercase leading-[1.1] text-[#484848]">TRACK MY ORDER</h1>
                        <div className="lg:w-[57%] pt-2 lg:mb-2">
                            <form className="form-group w-full" onSubmit={tracking}>
                                <input ref={inputRef} placeholder="Enter your order number or tracking number" defaultValue={code} className="w-full text-dark px-[15px] py-[12px] mb-[5px] border-[1px] border-[solid] !border-[#e4e4e4] rounded-[4px] text-sm placeholder:text-gray-700" id="tracking_number" name="order_number" type="text" />
                                <p className="font-size-xs text-left">To track a different order/shipment, please enter the correct order number or tracking number above.</p>
                                <button type="submit" className='mb-1 btn btn-primary w-100 block mt-g py-g w-full rounded'>{submitBtn}</button>
                            </form>
                        </div>
                    </div>
                    {showDelivery && dataTracking && (
                        <>
                            {!dataTracking?.fulfillment && !dataTracking?.order ? (
                                <div className='w-full text-center flex justify-center'>
                                    <p className="no_data_message lg:max-w-[70%] text-center mb-4 lg:mb-0">We are not able to find tracking details. If you have just placed the order, please allow two business days for the order to be fulfilled. You will receive a shipping notification email once the order is shipped. Otherwise, please <a href="https://support.cocoandeve.com/hc/en-us/requests/new" className=' whitespace-nowrap'>contact us</a> for help.</p>
                                </div>
                            ) : (
                                <>
                                    <div className='flex flex-col w-full justify-center '>
                                        {dataTracking?.fulfillment?.tracking_url && (
                                            <>
                                                <h2 className="mt-2 mb-1 text-base text-center">Your Order has been picked up by our Shipping Partner.</h2>
                                                <div className=' text-center  lg:mb-5'>
                                                    <a href={dataTracking?.fulfillment?.tracking_url} target="_blank" className='text-[#1c5c92] text-[20px] leading-[1.42857143]'>Click here to track your order now on our shipping partner's platform.</a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='flex flex-col w-full justify-center border-b-solid lg:border-b-[1px] border-b-[#e6e6e6] pb-1'>
                                        <h2 className='text-base w-full mt-2 mb-0 lg:mb-1 text-center'>Order Status: {dataTracking?.status?.toUpperCase()}</h2>
                                        <div className="lg:max-w-[700px] track-step-container flex lg:w-[70%] lg:mx-[auto] lg:my-[40px] lg:mb-[35px] mt-2">
                                            <div className="track-step track-ordered active text-center flex justify-center [flex-flow:column] items-center">
                                                <TrackConfirmed className="text-primary h-[2em]" />
                                                <span className='leading-tight block text-[12px] mt-[3px] h-[75px] bg-[url(/cdn/shop/files/track-confirmed.svg)]'>Ordered</span>
                                            </div>
                                            <div className="track-line w-1/5 mt-[5%] lg:mt-[2.5%] block mx-[auto] my-[0] h-[2px] bg-[#d1d1d1]"></div>
                                            <div className="track-step track-pickup active text-center flex justify-center [flex-flow:column] items-center">
                                                {!dataTracking?.status || dataTracking?.status === 'initial' ? (
                                                    <TrackPickupDisabled className="text-primary h-[2em]" />
                                                ) : (
                                                    <TrackPickup className="text-primary h-[2em]" />
                                                )}
                                                <span className='leading-tight block text-[12px] mt-[3px] h-[75px]'>Pick Up</span>
                                            </div>
                                            <div className="track-line w-1/5 mt-[5%] lg:mt-[2.5%] block mx-[auto] my-[0] h-[2px] bg-[#d1d1d1]"></div>
                                            <div className="track-step track-intransit active text-center flex justify-center [flex-flow:column] items-center">
                                                {!dataTracking?.status || dataTracking?.status === 'initial' || dataTracking?.status === 'pickup' ? (
                                                    <TrackTransitDisabled className="text-primary h-[2em]" />
                                                ) : (
                                                    <TrackTransit className="text-primary h-[2em]" />
                                                )}
                                                <span className='leading-tight block text-[12px] mt-[3px] h-[75px]'>In Transit</span>
                                            </div>
                                            <div className="track-line w-1/5 mt-[5%] lg:mt-[2.5%] block mx-[auto] my-[0] h-[2px] bg-[#d1d1d1]"></div>
                                            <div className="track-step track-delivered active text-center flex justify-center [flex-flow:column] items-center">
                                                {!dataTracking?.status || dataTracking?.status === 'initial' || dataTracking?.status === 'pickup' || dataTracking?.status === 'intransit' ? (
                                                    <TrackDeliveredDisabled className="text-primary h-[2em]" />
                                                ) : (
                                                    <TrackDelivered className="text-primary h-[2em]" />
                                                )}
                                                <span className='leading-tight block text-[12px] mt-[3px] h-[75px]'>Delivered</span>
                                            </div>
                                        </div>
                                        {(dataTracking?.status === 'initial' || !dataTracking.status) && (
                                            <p className='mb-1 text-center'>Your order has been placed successfully.</p>
                                        )}
                                        {dataTracking?.status === 'intransit' && (
                                        <p className='mb-1 text-center'>Your order is on its way</p>
                                        )}
                                        {dataTracking?.status === 'pickup' && (
                                            <p className='mb-1 text-center'>Your order has been picked up</p>
                                        )}
                                        {dataTracking?.status === 'delivered' && (
                                            <p className='mb-1 text-center'>Your order has been delivered</p>
                                        )}

                                    </div>
                                    <div className='flex flex-wrap w-full justify-center pb-0 lg:pt-3 lg:border-b-[1px_solid_#e6e6e6]'>
                                        <h2 className='text-base mt-0 lg:mt-2 mb-1 text-center'>Your Order Details {dataTracking?.order?.order_number}</h2>
                                        <div className="w-full overflow-x-auto">
                                            <table width="100%" className='border-[1px] border-[solid] border-[#e6e6e6] border-b-[0] rounded-[5px] mx-[0] my-[40px] bg-transparent border-collapse [border-spacing:0] lg:mb-1'>
                                                <thead>
                                                    <tr>
                                                        <th className='text-[12px] text-[#484848] p-[15px] text-left'>Product</th>
                                                        <th className='text-[12px] text-[#484848] p-[15px] text-left'>Qty</th>
                                                        <th className='text-[12px] text-[#484848] p-[15px] text-left'>Tracking Number</th>
                                                        <th className='text-[12px] text-[#484848] p-[15px] text-left'>Carrier</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataTracking?.fulfillment?.line_items.map((item) => (
                                                        <tr>
                                                            <td className='px-[10px] py-[25px] text-[#484848] bg-[#efefef] text-sm'>{item?.title}</td>
                                                            <td className='px-[10px] py-[25px] text-[#484848] bg-[#efefef] text-sm'>{item?.quantity}</td>
                                                            <td className='px-[10px] py-[25px] text-[#484848] bg-[#efefef] text-sm'>{dataTracking?.order?.tracking_number}</td>
                                                            <td className='px-[10px] py-[25px] text-[#484848] bg-[#efefef] text-sm'>{dataTracking?.order?.tracking_company}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

export default TrackMyOrder;
