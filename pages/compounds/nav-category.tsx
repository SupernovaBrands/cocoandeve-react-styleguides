import Item from "~/compounds/nav-category";
import Search from '~/images/icons/search.svg';

const navCategory = () => {
	return (
		<div className="container">
            <div className="flex flex-wrap">
                <div className="relative flex-grow max-w-full basis-0 text-center mb-2 mt-2 nav-category">
                    <ul className="flex flex-wrap justify-center border-0 mb-3">
                        <Item item="All" link="#" className="nav-link block h4 px-g pb-0 pt-0 active font-bold hover:text-body-color" />
                        <Item item="Hair" link="#" className="nav-link block h4 px-g pb-0 pt-0 hover:text-primary" />
                        <Item item="Tan & SPF" link="#" className="nav-link block h4 px-g pb-0 pt-0 hover:text-primary" />
                        <Item item="Body" link="#" className="nav-link block h4 px-g pb-0 pt-0 hover:text-primary" />
                        <Item search={true} link="#" className="h4 font-normal nav-link block bg-white border-0 px-g pb-0 link-search text-primary" >
                            <Search className="svg fill-primary h-[1em] text-[1.375em]" />
                        </Item>
                    </ul>
                </div>
            </div>
		</div>
	);
};

export default navCategory;