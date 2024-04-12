const Button = (props: any) => {
    const {id, label, type, lg, buttonClass, onClick, children} = props
    return (
        <button onClick={onClick} id={id} type={type ?? 'button'}
            className={`${buttonClass ?? 'btn-primary'} ${lg ?? 'btn-lg'} btn`}>
            {children}
        </button>
    )
}

export default Button;
