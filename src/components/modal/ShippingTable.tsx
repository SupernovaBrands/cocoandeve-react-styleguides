import CloseButton from '~/components/modal/CloseButton';

const ShippingTable = (props: any) => {
	const { handleClose, content, store, shippingTable } = props;
	const shippingLineTable = content?.shippingLine?.[store];
	const { shipping_table_heading, shipping_table_heading_title } = shippingTable;
	return (
		<div className="bg-white flex items-center modal-content border border-[rgba(0,0,0,.2)] bg-clip-padding">
			<div className="max-w-[31em] overflow-hidden relative mx-auto">
				<CloseButton handleClose={handleClose} className="text-body" />
				<div className="px-3 py-3 lg:px-4 lg:py-4">
					<h2 dangerouslySetInnerHTML={{ __html: shipping_table_heading_title}} />
					<p dangerouslySetInnerHTML={{ __html: shipping_table_heading}} />
					<table className="shipping-table table table-bordered text-center mt-3 mb-2 aaa">
						<tr><th>Country<br />(min spend)</th><th>Standard Shipping<br />(Orders over min spend)</th><th>Standard Shipping<br />(Orders under min spend)</th></tr><tr><td>France<br />(€60)</td><td>3 - 4 days <br />FREE</td><td>3 - 4 days <br />9.90€</td></tr><tr><td> Germany<br />(€60)</td><td>3 - 4 days <br />FREE</td><td>3 - 4 days <br />9.90€</td></tr><tr><td> Italy<br />(€60)</td><td>3 - 4 days <br />FREE</td><td>3 - 4 days <br />10.90€</td></tr><tr><td> Austria<br />(€60)</td><td>3 - 4 days <br />FREE</td><td>3 - 4 days <br />9.90€</td></tr><tr><td> Belgium<br />(€60)</td><td>3 - 4 days <br />FREE</td><td>3 - 4 days <br />9.90€</td></tr><tr><td> Bulgaria<br />(€100)</td><td>6 - 10 days <br />12.90€</td><td>6 - 10 days <br />12.90€</td></tr><tr><td> Croatia<br />(€60)</td><td>5 - 7 days <br />9.90€</td><td>5 - 7 days <br />9.90€</td></tr><tr><td> Czech <br />Republic<br />(€60)</td><td>4 - 5 days <br />FREE</td><td>4 - 5 days <br />10.90€</td></tr><tr><td> Denmark<br />(€100)</td><td>3 - 5 days <br />FREE</td><td>3 - 5 days <br />19.90€</td></tr><tr><td> Estonia<br />(€100)</td><td>5 - 7 days <br />12.90€</td><td>5 - 7 days <br />12.90€</td></tr><tr><td> Finland<br />(€100)</td><td>6 - 10 days <br />19.90€</td><td>6 - 10 days <br />19.90€</td></tr><tr><td> Greece<br />(€100)</td><td>5 - 7 days<br />12.90€</td><td>5 - 7 days <br />12.90€</td></tr><tr><td> Hungary<br />(€60)</td><td>3 - 4 days<br />FREE</td><td>3 - 4 days <br />9.90€</td></tr><tr><td> Ireland<br />(€60)</td><td>3 - 4 days<br />FREE</td><td>3 - 4 days <br />10.90€</td></tr><tr><td> Latvia<br />(€100)</td><td>5 - 7 days<br />FREE</td><td>5 - 7 days <br />12.90€</td></tr><tr><td> Luxembourg<br />(€60)</td><td>4 - 5 days<br />FREE</td><td>4 - 5 days <br />9.90€</td></tr><tr><td> Malta<br />(€60)</td><td>3 - 5 days<br />27.90€</td><td>3 - 5 days <br />27.90€</td></tr><tr><td> Monaco<br />(€60)</td><td>3 - 4 days<br />24.90€</td><td>3 - 4 days <br />24.90€</td></tr><tr><td> Netherlands <br />(€60)</td><td>2 - 3 days<br />FREE</td><td>2 - 3 days <br />9.90€</td></tr><tr><td> Poland<br />(€60)</td><td>3 - 4 days<br />FREE</td><td>3 - 4 days <br />10.90€</td></tr><tr><td> Portugal<br />(€60)</td><td>3 - 5 days<br />FREE</td><td>3 - 5 days <br />6.90€</td></tr><tr><td> Slovakia<br />(€60)</td><td>6 - 10 days<br />FREE</td><td>6 - 10 days <br />10.90€</td></tr><tr><td> Slovenia<br />(€60)</td><td>6 - 10 days<br />FREE</td><td>6 - 10 days <br />9.90€</td></tr><tr><td> Spain<br />(€60)</td><td>3 - 4 days<br />FREE</td><td>3 - 4 days <br />6.90€</td></tr><tr><td> Sweden<br />(€100)</td><td>5 - 7 days<br />19.90€</td><td>5 - 7 days <br />19.90€</td></tr></table>
				</div>
			</div>
        </div>
	);
};

export default ShippingTable;
