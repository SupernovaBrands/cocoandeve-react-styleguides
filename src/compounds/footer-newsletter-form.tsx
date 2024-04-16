const FooterNewsletterForm = (props) => {
	return (
		<form className={`w-full ${props.classes}`}>
			<div className="relative flex items-stretch w-full">
				<input type="text" className={`${props.background ? props.background : 'bg-gray-400 placeholder-gray-600' } focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400 block appearance-none w-full px-g py-g mb-0 text-base leading-base border border-[solid] border-gray-400 text-gray-800 border-gray-200 rounded-tl rounded-bl -mr-1`} placeholder="Enter your email" aria-label="Enter your email" />
				<div className="input-group-append flex -ml-[1px]">
					<button className="pl-4 pr-4 leading-base font-bold inline-block align-middle text-center select-none border whitespace-no-wrap no-underline bg-primary border-primary text-white  rounded" type="button">Subscribe</button>
				</div>
			</div>
		</form>
	);  
};

export default FooterNewsletterForm;