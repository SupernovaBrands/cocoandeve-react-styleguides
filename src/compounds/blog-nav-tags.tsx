const navTags = (props) => {
    return (
        <a href={props.href} className={`me-1 mb-1 py-1 px-2 hover:no-underline lg:text-lg no-underline ${props.active ? `${props?.ctaBgColor === 'bg-dark' ? 'active-dark' : 'active' }` : ''}`}>{props.title}</a>
    );
};

export default navTags;
