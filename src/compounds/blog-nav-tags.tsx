const navTags = (props) => {
    return (
        <a href={props.href} className={`leading-[20px] hover:text-primary lg:leading-[25px] py-[5px] lg:py-1 px-2 hover:no-underline no-underline ${props.active ? 'active-dark' : ''}`}>{props.title}</a>
    );
};

export default navTags;
