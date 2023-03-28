/* global tSettings */
import React, { useEffect, useState } from 'react';

const AccountSwellScoreboard = () => {
	const [init, setInit] = useState(false);
	const [customerHistory, setCustomerHistory] = useState([]);
	const [errorMsg, setErrorMsg] = useState(false);
	const customerEmail = window.customerEmail;
	const apiEndpoint = 'https://loyalty.yotpo.com/api/v2';
	const { apiKey, guidKey } = tSettings.cartRedemption;
	useEffect(() => {
		const getCustomerHistory = async () => {
			try {
				await fetch(`${apiEndpoint}/customers?guid=${guidKey}&api_key=${apiKey}&with_history=true&customer_email=${encodeURIComponent(customerEmail)}&with_referral_code=true`)
					.then((response) => response.json())
					.then((resp) => {
						if (resp.errors) {
							setInit(true);
							setErrorMsg(resp.errors.customer);
						} else {
							const custHistory = resp.history_items;
							const orderedList = custHistory.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)));
							const filteredItems = orderedList.filter((item) => !item.action.toLowerCase().includes('[hide]'));
							setCustomerHistory(filteredItems);
							setInit(true);
						}
					});
			} catch (err) {
				console.log('error while fetching data1', err);
				setInit(true);
			}
		};

		getCustomerHistory();
	}, []);
	return !init ? (
		<div className="d-flex justify-content-center mt-4 col-12 col-lg-9 px-lg-0">
			<div className="spinner-border" role="status" aria-hidden="true" />
		</div>
	) : (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Action</th>
					<th scope="col">Points</th>
					<th scope="col">Status</th>
				</tr>
			</thead>
			<tbody>
				{!errorMsg && customerHistory.length > 0 && customerHistory.map((item, i, row) => {
					const date = new Date(item.date);
					return (
						<tr className={`${i + 1 === row.length ? 'border-bottom' : ''}`}>
							<td>{date.toLocaleDateString()}</td>
							<td>{item.action.replace('[hide]', '').replace('[HIDE]', '').trim()}</td>
							<td className={`text-center ${item.points >= 0 ? 'text-secondary' : 'text-primary'}`}>{item.points}</td>
							<td>{item.status}</td>
						</tr>
					);
				})}
				{customerHistory.length === 0 && (
					<tr>
						<td colSpan="4">No record found</td>
					</tr>
				)}
				{errorMsg && (
					<tr>
						<td colSpan="4">{errorMsg}</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default AccountSwellScoreboard;
