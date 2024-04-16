import Tooltip from '~/components/Tooltip';

const Tooltips = () => {
	return (
		<>
			<h1>Tooltips</h1>
			<div className='container mx-auto sm:px-4 relative'>
				<Tooltip show={true} />
			</div>
		</>
	);
}

export default Tooltips;