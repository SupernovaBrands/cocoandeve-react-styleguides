const Badge = (props: any) => {
    return (
        <span className={`rounded-none px-[8px] py-[4px] leading-[20px] inline-block text-center font-normal text-xs align-baseline ${props.badgeClasses}`}>{props.children}</span>
    )
}

export default Badge;