import { Button } from '~/components/index';

const FooterNewsletterForm = (props) => {
	return (
		<form className={`w-full ${props.classes}`} onSubmit={(e) => props.onSubmit(e)}>
			<div className="relative flex items-stretch w-full">
				<input defaultValue={props.email} required type="email" onChange={props.handleEmail} className={`${props.background ? props.background : 'bg-gray-400' } flex-[1_1_auto] w-[1%] focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400 block appearance-none pl-[1rem] pr-0 py-[14px] mb-0 text-base leading-base border border-[solid] border-gray-400 text-body placeholder:text-gray-800 border-gray-200 rounded-tl-[4px] rounded-bl-[4px] -mr-1`} placeholder={`${props.placeholder ? props.placeholder : 'Enter your email' }`} aria-label={`${props.placeholder ? props.placeholder : 'Enter your email' }`} />
				<div className="input-group-append flex -ml-[1px]">
					<button className="py-[9px] px-4 leading-base font-bold inline-block align-middle text-center select-none border whitespace-no-wrap no-underline bg-primary border-primary text-white rounded min-w-[10em]" type="submit">{props.btnText ? props.btnText : 'Subscribe' }</button>
				</div>
			</div>
			{props.submitted && (<p className="mt-1 text-secondary">{props.successMsg ? props.successMsg : 'Signup successful! Stay tuned for updates and tips on Coco&Eve.' }</p>)}
		</form>
	);
};

export default FooterNewsletterForm;
