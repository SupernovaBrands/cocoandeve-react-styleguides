const navItems = (props) => {
    return (
        <li className="nav-item">
            <a href={props.link} className={`nav-link pb-0 pt-0 ${props.active}`}>{props.item}</a>
        </li>
    );  
};

export default navItems;