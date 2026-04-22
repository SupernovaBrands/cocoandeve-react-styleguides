const navTags = (props) => {
    return (
        <a href={props.href} className={`leading-[20px] hover:text-primary lg:leading-[25px] py-[8px] px-[8px] lg:py-1 lg:px-2 hover:no-underline no-underline ${props.active ? 'active-dark' : ''}`}>{props.title}</a>
    );
};

export default navTags;
