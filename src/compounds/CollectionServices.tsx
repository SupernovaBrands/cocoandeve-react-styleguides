import Service from "~/sections/Service";

const CollectionServices = (props) => {
	const { handle, initSub, parentCollection, extraClass, mainCollectionHandles, subHandles } = props;
	if (handle === 'all' ||
		(initSub && !['hair-benefits', 'kits-gifts'].includes(parentCollection?.collection?.handle) && handle !== 'kits-gifts')) {
			return <Service className={extraClass} />
	};
	if (handle === 'hair-benefits' || parentCollection?.collection?.handle === 'hair-benefits') {
		return <Service className={extraClass} />
	}
	if (handle === 'kits-gifts' || parentCollection?.collection?.handle === 'kits-gifts') {
		return <Service className={extraClass} />
	}
	if (!mainCollectionHandles?.split(',').includes(handle) && parentCollection === null && subHandles === '') {
		return <Service className={extraClass} />
	}
};

export default CollectionServices;
