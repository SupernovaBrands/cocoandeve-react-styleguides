const Button = (props: any) => {
    const {id, label, type, lg, buttonClass, onClick, children, disabled} = props
    return (
        <button ref={props.forwardRef} disabled={disabled} onClick={onClick} id={id} type={type ?? 'button'}
            className={`${buttonClass ?? 'btn-primary'} ${lg ?? 'btn-lg'} btn block ${disabled ? 'opacity-65' : ''}`}>
            {children}
        </button>
    )
}

export default Button;
