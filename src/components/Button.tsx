const Button = (props) => {
    const {id, label, type, lg, buttonClass, onClick} = props
    return (
        <button onClick={onClick} id={id} type={type ?? 'button'}
            className={`${buttonClass ?? 'bg-primary hover:bg-primary-darken border-transparent text-white'} ${lg ?? 'rounded-lg border-2 py-g px-5'} rounded border font-bold text-base block align-middle text-center select-none whitespace-no-wrap py-1 px-3`}>
            {label} {props.children ? props.children : ''}
        </button>
    )
}

export default Button;