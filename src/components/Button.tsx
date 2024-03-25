const Button = (props) => {
    const {id, label, type, lg, buttonClass} = props
    return (
        <button id={id} type={type ?? 'button'}
            className={`${buttonClass ?? 'bg-primary text-white hover:bg-primary-dark'} ${lg ?? 'py-g px-4 leading-tight'} text-base inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-lg py-1 px-2 leading-normal no-underline`}>
            {label}
        </button>
    )
}

export default Button;