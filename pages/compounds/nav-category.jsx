import { Container } from "react-bootstrap";
import Item from "@/compounds/nav-category";
import Search from '../../src/images/icons/search.svg';

const navCategory = () => {
	return (
		<Container>
            <div className="row">
                <div className="col text-center mb-2 mt-2 nav-category">
                    <ul className="nav justify-content-center align-items-center">
                        <Item item="ALL" link="#" className="nav-link pb-0 pt-0 active" />
                        <Item item="HAIR" link="#" className="nav-link pb-0 pt-0" />
                        <Item item="TAN" link="#" className="nav-link pb-0 pt-0" />
                        <Item item="BODY" link="#" className="nav-link pb-0 pt-0" />
                        <Item item="HOW TO'S" link="#" className="nav-link pb-0 pt-0" />
                        <Item search={true} link="#" className="nav-link pb-0 pt-0 link-search text-primary" >
                            <Search className="svg fill-primary" />
                        </Item>
                    </ul>
                </div>
            </div>
		</Container>
	);
};

export default navCategory;