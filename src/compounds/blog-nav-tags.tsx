const navTags = (props) => {
    return (
        <a href={props.href} className={`me-1 py-1 px-2 hover:no-underline lg:text-lg no-underline ${props.active ? 'active' : ''}`}>{props.title}</a>
    );
};

export default navTags;
