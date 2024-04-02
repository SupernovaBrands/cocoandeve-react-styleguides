const navTags = (props) => {
    return (
        <a className={`me-1 py-1 px-2 no-underline ${props.active ? 'active' : ''}`}>{props.title}</a>
    );
};

export default navTags;
