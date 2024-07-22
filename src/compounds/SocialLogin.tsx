const SocialLogin = (props: any) => {
	const googleLogin = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile%20https%3A//www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${process.env.GOOGLE_REDIRECT_PATH || process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH}&client_id=449650008430-lrrbgmjrlsjfac2vq2bc02h66idqjjtu.apps.googleusercontent.com`;
	const facebookLogin = `https://www.facebook.com/dialog/oauth?client_id=245452109181281&redirect_uri=${process.env.FACEBOOK_REDIRECT_PATH || process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_PATH}&scope=email&ret=login`
	return (
		<div className="auth-buttons CustomerLoginForm">
			<a className="btn btn-outline-dark mb-2 text-gray-600 bg-white btn-block flex items-center justify-center hover:no-underline hover:text-body" href={facebookLogin}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath={`url(#clip0_2515_31358_${props.idSuffix})`}>
						<path d="M10 0C4.47727 0 0 4.50029 0 10.0514C0 15.0908 3.69318 19.2516 8.50546 19.9785V12.7155H6.03136V10.0733H8.50546V8.31525C8.50546 5.40445 9.91636 4.12656 12.3232 4.12656C13.4759 4.12656 14.0855 4.21245 14.3741 4.25174V6.55808H12.7323C11.7105 6.55808 11.3536 7.5317 11.3536 8.62913V10.0733H14.3482L13.9418 12.7155H11.3536V20C16.2345 19.3343 20 15.1397 20 10.0514C20 4.50029 15.5227 0 10 0Z" fill="#425995"></path>
					</g>
					<defs>
						<clipPath id={`clip0_2515_31358_${props.idSuffix}`}>
							<rect width="20" height="20" fill="white"></rect>
						</clipPath>
					</defs>
				</svg>
				<span className="ml-1">Login with Facebook</span>
			</a>
			<a className="btn btn-outline-dark mb-2 text-gray-600 bg-white btn-block flex items-center justify-center hover:no-underline hover:text-body" href={googleLogin}>
				<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath={`url(#clip0_2515_31362_${props.idSuffix})`}>
						<path d="M4.88802 11.8038L4.19902 14.3318L1.68302 14.3848C0.903995 12.9734 0.496891 11.3869 0.500018 9.7748C0.500018 8.1578 0.898018 6.6368 1.60602 5.2998L3.84802 5.7028L4.83002 7.8928C4.38822 9.16263 4.40876 10.5476 4.88802 11.8038Z" fill="#FBBB00"></path>
						<path d="M20.3244 7.9502C20.5747 9.23058 20.5601 10.5487 20.2814 11.8232C19.7904 14.0403 18.5421 16.0169 16.7514 17.4132L13.8924 17.2712L13.4894 14.8052C14.663 14.1371 15.5706 13.0851 16.0594 11.8262H10.6934V7.9502H20.3244Z" fill="#518EF8"></path>
						<path d="M16.7592 17.4149C14.9663 18.8106 12.7573 19.5652 10.4852 19.5579C6.67016 19.5579 3.35116 17.4879 1.66016 14.4399L4.90916 11.8599C5.75416 14.0529 7.93416 15.6139 10.4852 15.6139C11.54 15.6156 12.5772 15.3434 13.4952 14.8239L16.7592 17.4149Z" fill="#28B446"></path>
						<path d="M16.8882 2.26704L13.6582 4.88104C12.7155 4.2993 11.6289 3.99276 10.5212 3.99604C9.29168 3.99272 8.0915 4.37126 7.0864 5.07936C6.0813 5.78746 5.32088 6.79018 4.91016 7.94904L1.66016 5.32004C2.51182 3.70995 3.78738 2.36329 5.34896 1.42564C6.91053 0.487987 8.69871 -0.00497742 10.5202 3.78899e-05C12.9402 3.78899e-05 15.1622 0.850038 16.8882 2.26704Z" fill="#F14336"></path>
					</g>
					<defs>
						<clipPath id={`clip0_2515_31362_${props.idSuffix}`}>
							<rect width="20" height="20" fill="white" transform="translate(0.5)"></rect>
						</clipPath>
					</defs>
				</svg>
				<span className="ml-1">Login with Google</span>
			</a>
		</div>
	);
};

export default SocialLogin;
