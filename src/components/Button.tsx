const Button = (props) => {
    const {id, label, type, lg, buttonClass, onClick} = props
    return (
        <button onClick={onClick} id={id} type={type ?? 'button'}
            className={`${buttonClass ?? 'btn-primary'} ${lg ?? 'btn-lg'} btn block`}>
            {label} {props.children}
        </button>
    )
}

export default Button;