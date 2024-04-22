/* global tStrings */
import '~/config';
const tStrings = global.config.tStrings;
// import dynamic from 'next/dynamic';
import React, {
	useState,
} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import {
	validateEmail,
} from '~/modules/utils_v2';
// const {
// 	validateEmail,
// } = dynamic(() => import('~/modules/utils_v2'), {
//     ssr: false,
// });

const YotpoQuestionForm = (props) => {
	const {
		onSubmit,
		activeForm,
	} = props;

	const [question, setQuestion] = useState('');
	const [errorQuestion, setErrorQuestion] = useState(false);
	const [name, setName] = useState('');
	const [errorName, setErrorName] = useState(false);
	const [email, setEmail] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);

	const [hasError, setHasError] = useState(false);

	const onSubmitButton = () => {
		const isQuestionErr = question === '';
		const isNameErr = name === '';
		const isEmailErr = !validateEmail(email);
		setErrorQuestion(isQuestionErr);
		setErrorName(isNameErr);
		setErrorEmail(isEmailErr);

		const error = isQuestionErr || isNameErr || isEmailErr;
		setHasError(error);

		if (!error) {
			const data = {
				review_content: question,
				display_name: name,
				email,
			};
			onSubmit(data);
		}
	};

	return (
		<div id="yotpoQuestionForm" className={`${activeForm === 'question' ? 'collapsed' : 'collapse hidden'} mt-3`}>
			<div className="yotpo__review-fields flex flex-col">
				<div className="form-group mb-1">
					<h4 className="mb-2">{tStrings.yotpo.askQuestion}</h4>
					<p className="text-sm mb-1">
						<span className="text-primary">* </span>
						{tStrings.yotpo.requiredField}
					</p>
				</div>
				<div className="form-group mb-1">
					<p className="text-sm mb-1">
						<span className="text-primary">* </span>
						{tStrings.yotpo.question}
						:
					</p>
					<textarea className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none" id="yotpoFormQuestion" value={question} onChange={(e) => setQuestion(e.target.value)} rows={5} aria-label="Question form" />
					{errorQuestion && <small className="text-primary mb-1">{tStrings.yotpo.questionError}</small>}
				</div>
				<div className="flex flex-wrap mx-0 lg:mx-hg mb-3 lg:justify-end">
					<div className="lg:w-1/3 px-0 lg:px-g mb-1 lg:mb-0">
						<p className="text-sm mb-1">
							<span className="text-primary">* </span>
							{tStrings.yotpo.name}
							:
						</p>
						<input type="text" id="yotpoReviewName" className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Question review name" />
						{errorName && <small className="text-primary mb-1">{tStrings.yotpo.nameError}</small>}
					</div>
					<div className="lg:w-1/3 px-0 lg:px-g">
						<p className="text-sm mb-1">
							<span className="text-primary">* </span>
							{tStrings.yotpo.email}
							:
						</p>
						<input type="email" id="yotpoReviewEmail" className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Question review email" />
						{errorEmail && <small className="text-primary mb-1">{tStrings.yotpo.emailError}</small>}
					</div>
				</div>
				<div className="flex form-group mb-1 items-center justify-end">
					{hasError && <small className="text-primary mr-1">{tStrings.yotpo.formError}</small>}
					<Button type="button" className="bg-white border border-primary hover:bg-primary hover:text-white text-primary font-bold" onClick={onSubmitButton}>{tStrings.yotpo.submit}</Button>
				</div>
			</div>
		</div>
	);
};

YotpoQuestionForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default YotpoQuestionForm;
