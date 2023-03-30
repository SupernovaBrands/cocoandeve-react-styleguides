const navItems = (props) => {
    return (
        <li className={`nav-item ${props.search ? 'd-lg-none' : ''}`}>
            <a href={props.link} className={props.className}>
                {props.search ? (
					props.children
				) : (
					props.item
				)}
            </a>
        </li>
    );  
};

export default navItems;