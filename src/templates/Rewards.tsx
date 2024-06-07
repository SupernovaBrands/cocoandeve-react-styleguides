import Script from "next/script";

const Rewards = (props: any) => {
    const { email, id, token, userTags } = props;
    return (
        <>
            <Script type="text/javascript" src="https://cdn-widgetsrepository.yotpo.com/v1/loader/UDQ6dSW-H2Gi-71iOvYtnw" />
            <div data-yotpo-instance-id="138067" className="yotpo-widget-instance"></div>
            <div
				id="swell-customer-identification"
				data-authenticated={!!email}
				data-email={email}
				data-id={id}
				data-token={token}
				data-tags={JSON.stringify(userTags)}
				className="hidden" />
        </>
    )
}

export default Rewards;