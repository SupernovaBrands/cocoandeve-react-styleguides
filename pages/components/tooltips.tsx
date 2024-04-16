import Tooltip from '~/components/Tooltip';

const Tooltips = () => {
	return (
		<div className="mt-4 container">
            <h1>Tooltips</h1>
			<div className='container mx-auto sm:px-4 relative'>
            	<Tooltip show={true} />
			</div>
		</div>
	);
}

export default Tooltips;