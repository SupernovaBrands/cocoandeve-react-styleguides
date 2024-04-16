import Item from "~/compounds/nav-category";
import Search from '~/images/icons/search.svg';

const navCategory = () => {
	return (
		<div className="container">
            <div className="flex flex-wrap">
                <div className="relative flex-grow max-w-full flex-1 text-center mb-2 mt-2 nav-category">
                    <ul className="flex flex-wrap justify-center items-center">
                        <Item item="All" link="#" className="nav-link h4 px-g pb-0 pt-0 active" />
                        <Item item="Hair" link="#" className="nav-link h4 px-g pb-0 pt-0" />
                        <Item item="Tan & SPF" link="#" className="nav-link h4 px-g pb-0 pt-0" />
                        <Item item="Body" link="#" className="nav-link h4 px-g pb-0 pt-0" />
                        <Item search={true} link="#" className="nav-link h4 px-g pb-0 pt-0 link-search text-primary" >
                            <Search className="svg fill-primary" />
                        </Item>
                    </ul>
                </div>
            </div>
		</div>
	);
};

export default navCategory;