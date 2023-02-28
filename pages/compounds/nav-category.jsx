import { Container } from "react-bootstrap";
import Item from "@/compounds/nav-category";
import Search from '../../src/images/icons/search.svg';

const navCategory = () => {
	return (
		<Container>
            <div className="row">
                <div className="col text-center mb-2 mt-2 nav-category">
                    <ul className="nav justify-content-center align-items-center">
                        <Item item="ALL" link="#" active="active" />
                        <Item item="HAIR" link="#" active="" />
                        <Item item="TAN" link="#" active="" />
                        <Item item="BODY" link="#" active="" />
                        <Item item="HOW TO'S" link="#" active="" />
                        <Item search={true} link="#" active="">
                            <Search className="svg fill-primary" />
                        </Item>
                    </ul>
                </div>
            </div>
		</Container>
	);
};

export default navCategory;