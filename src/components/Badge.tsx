const Badge = (props: any) => {
    return (
        <span className={`rounded px-g py-h1 leading-tight inline-block p-1 text-center font-semibold text-base align-baseline ${props.badgeClasses}`}>{props.children}</span>
    )
}

export default Badge;