const Button = (props: any) => {
    const {id, label, type, lg, buttonClass, onClick, children, disabled, bgCtaColor} = props
    return (
        <button ref={props.forwardRef} disabled={disabled} onClick={onClick} id={id} type={type ?? 'button'}
            className={`${buttonClass ?? `${bgCtaColor === 'bg-dark' ? 'bg-dark border-dark text-white hover:bg-dark hover:text-white' : 'btn-primary'}`} ${lg ?? 'btn-lg'} btn block ${disabled ? 'opacity-70' : ''}`}>
            {children}
        </button>
    )
}

export default Button;
