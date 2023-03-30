const navTags = (props) => {
    return (
        <a className={`mr-1 py-1 px-2 text-decoration-none ${props.active ? 'active' : ''}`}>{props.title}</a>
    );  
};

export default navTags;