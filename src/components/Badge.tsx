const Badge = (props: any) => {
    return (
        <span className={`rounded px-[16px] py-h1 leading-tight inline-block p-1 text-center font-semibold text-base align-baseline ${props.badgeClasses}`}>{props.children}</span>
    )
}

export default Badge;