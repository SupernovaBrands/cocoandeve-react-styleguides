const ConditionWrapper = ({
	condition, wrapper, wrapperFalse, children,
}: {condition:any, wrapper:any, wrapperFalse?:any, children:any}) => {
	if (condition) {
		return wrapper(children);
	}
	if (typeof wrapperFalse === 'function') {
		return wrapperFalse(children);
	}
	return children;
};

export default ConditionWrapper;
