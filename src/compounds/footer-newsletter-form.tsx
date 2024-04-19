const FooterNewsletterForm = (props) => {
	return (
		<form className={`w-full ${props.classes}`} onSubmit={(e) => props.onSubmit(e)}>
			<div className="relative flex items-stretch w-full">
				<input type="email" required className="placeholder-gray-600 focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400 block appearance-none w-full px-g py-g mb-0 text-base leading-base bg-gray-400 border border-[solid] border-gray-400 text-gray-800 border-gray-200 rounded-tl rounded-bl -mr-1" placeholder="Enter your email" aria-label="Enter your email"  value={props.email} onChange={props.handleEmail} />
				<div className="input-group-append flex -ml-[1px]">
					<button className="pl-4 pr-4 leading-base font-bold inline-block align-middle text-center select-none border whitespace-no-wrap no-underline bg-primary border-primary text-white  rounded" type="submit">Subscribe</button>
				</div>
			</div>
			{props.submitted && (<p className="mt-1">Signup successful! Stay tuned for updates and tips on Coco&Eve.</p>)}
		</form>
	);  
};

export default FooterNewsletterForm;