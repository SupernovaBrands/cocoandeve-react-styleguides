const Button = (props) => {
    const {id, label, type, lg, buttonClass, onClick} = props
    return (
        <button onClick={onClick} id={id} type={type ?? 'button'}
            className={`${buttonClass ?? 'btn-primary'} ${lg ?? 'btn-lg'} btn`}>
            {label}
        </button>
    )
}

export default Button;