const navItems = (props) => {
    return (
        <li className={`nav-item ${props.search ? 'd-lg-none' : ''}`}>
            <a href={props.link} className={`nav-link pb-0 pt-0 ${props.active} ${props.search ? 'link-search text-primary' : ''}`}>
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