// import CloseButton from '~/components/modal/CloseButton';

const ShippingTable = (props: any) => {
	const { handleClose, content, store, shippingTable, isTableFull, shippingTableStore } = props;
	const shippingLineTable = content?.shippingLine?.[store];
	const { shipping_table_heading, shipping_table_heading_title, shipping_table_title1, shipping_table_title2, shipping_table_title3 } = shippingTable;
	const tableContent = shippingLineTable.shipping_popup_content?.split('::').map((tbl: any) => tbl.trim()) || [];
	let excludeRows = [];
	if (!isTableFull) {
		if (shippingTableStore.shipping_table_text1 !== '') excludeRows.push(shippingTableStore.shipping_table_text1);
		if (shippingTableStore.shipping_table_text21 !== '') excludeRows.push(shippingTableStore.shipping_table_text21);
		if (shippingTableStore.shipping_table_text31 !== '') excludeRows.push(shippingTableStore.shipping_table_text31);
		if (shippingTableStore.shipping_table_text41 !== '') excludeRows.push(shippingTableStore.shipping_table_text41);
		if (shippingTableStore.shipping_table_text51 !== '') excludeRows.push(shippingTableStore.shipping_table_text51);
	}

	return (
		<div className="bg-white flex items-center modal-content border border-[rgba(0,0,0,.2)] bg-clip-padding">
			<div className="overflow-hidden relative mx-auto">
				{/* <CloseButton handleClose={handleClose} className="text-body" /> */}

				<div className="px-3 py-g">
					<button type="button" className="close float-right text-[1.5em] leading-[1]" onClick={handleClose}>
						<span className="mb-0" aria-hidden="true">×</span>
					</button>
					{shipping_table_heading_title && (
						<h2 className="mb-[.625rem]" dangerouslySetInnerHTML={{ __html: shipping_table_heading_title}} />
					)}
					{shipping_table_heading && (
						<p className="mb-[1rem]" dangerouslySetInnerHTML={{ __html: shipping_table_heading}} />
					)}

					<table className="shipping-table table border border-gray-500 text-center mt-3 mb-2 aaa">
						<thead>
							<tr>
								<th className="p-[.5rem] border border-gray-500 align-top bg-secondary-light" dangerouslySetInnerHTML={{ __html: shipping_table_title1 }} />
								<th className="p-[.5rem] border border-gray-500 align-top bg-secondary-light" dangerouslySetInnerHTML={{ __html: shipping_table_title2 }} />
								<th className="p-[.5rem] border border-gray-500 align-top bg-secondary-light" dangerouslySetInnerHTML={{ __html: shipping_table_title3 }} />
							</tr>
						</thead>
						<tbody>
							{tableContent && tableContent.map((row) => {
								const cells = row.split(',').map((v) => v.trim());
								const exclude = excludeRows.some((r) => cells.includes(r));
								return !exclude && (
									<tr>
										{cells.map((cell) => (
											<td className="p-[.5rem] border border-gray-500 align-top" dangerouslySetInnerHTML={{ __html: cell }} />
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
        </div>
	);
};

export default ShippingTable;
