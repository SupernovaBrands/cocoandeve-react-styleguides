const BadgeCircleImage = (props) => {
	return (
		<picture className={`circle-badge position-absolute rounded-circle bg-primary d-flex p-1 ${props.className}`}>
			<img alt="25% Off" className="w-100" src="/badge-25.svg" />
		</picture>
	);
};

export default BadgeCircleImage;
