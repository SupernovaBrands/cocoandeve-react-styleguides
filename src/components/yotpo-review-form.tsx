/* global tStrings */
import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import {
  kebabCase,
  validateEmail,
} from '~/modules/utils_v2';

import SvgFull from '~/images/icons/star-full.svg';
import CheckBox from './CheckBox';
import RadioOption from './RadioOption';
import Button from './Button';

const tStrings = global.config.tStrings;

interface CustomQuestion {
  slug: string;
  question: string;
  options: string[];
  radio: boolean;
}

interface YotpoReviewFormProps {
  customQuestions: CustomQuestion[];
  onSubmit: (data: ReviewData) => void;
  activeForm: string;
}

interface ReviewData {
  review_score: number;
  review_title: string;
  review_content: string;
  display_name: string;
  email: string;
  custom_fields: { [key: string]: string[] };
}

const YotpoReviewForm: FC<YotpoReviewFormProps> = ({
  customQuestions,
  onSubmit,
  activeForm,
}) => {
  const [score, setScore] = useState<number>(0);
  const [hoverStar, setHoverStar] = useState<number>(0);
  const [errorScore, setErrorScore] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [review, setReview] = useState<string>('');
  const [errorReview, setErrorReview] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);

  const [hasError, setHasError] = useState<boolean>(false);

  const onSubmitButton = () => {
    const isScoreErr = score === 0;
    const isTitleErr = title === '';
    const isReviewErr = review === '';
    const isNameErr = name === '';
    const isEmailErr = !validateEmail(email);
    setErrorScore(isScoreErr);
    setErrorTitle(isTitleErr);
    setErrorReview(isReviewErr);
    setErrorName(isNameErr);
    setErrorEmail(isEmailErr);

    const error = isScoreErr || isTitleErr || isReviewErr || isNameErr || isEmailErr;
    setHasError(error);

    if (!error) {
      const form = document.getElementById('yotpoReviewForm') as HTMLFormElement;
      const custom: { [key: string]: string[] } = {};
      customQuestions.forEach((q) => {
        const checked = form.querySelectorAll<HTMLInputElement>(`input[name='${q.slug}']:checked`);
        if (checked && checked.length) {
          custom[q.slug] = Array.from(checked).map((c) => c.value);
        }
      });

      const data: ReviewData = {
        review_score: score,
        review_title: title,
        review_content: review,
        display_name: name,
        email,
        custom_fields: custom,
      };
      onSubmit(data);
    }
  };

  return (
    <div id="yotpoReviewForm" className={`${activeForm === 'review' ? 'collapsed' : 'collapse hidden'} mt-3`} data-parent="#yotpoFormCollapse">
      <div className="yotpo__review-fields flex flex-col">
        <div className="form-group mb-1">
          <h4 className="mb-2">{tStrings.yotpo.writeReview}</h4>
          <p className="text-sm mb-1">
            <span className="text-primary">* </span>
            {tStrings.yotpo.requiredField}
          </p>
        </div>
        <div className="form-group mb-1">
          <p className="text-sm mb-1">
            <span className="text-primary">* </span>
            {tStrings.yotpo.score}
            :
          </p>
          <div className="flex">
            {[...Array(5)].map((star, index) => {
              const i = index + 1;
              return (
                <SvgFull
                  role="button"
                  aria-label={`${tStrings.yotpo.rating} ${i}`}
                  key={i}
                  className={`svg w-1em h-1em mb-1 mr-1 ${i <= (hoverStar || score) ? 'fill-primary' : 'fill-gray-500'}`}
                  onClick={() => setScore(i)}
                  onMouseEnter={() => setHoverStar(i)}
                  onMouseLeave={() => setHoverStar(score)}
                />
              );
            })}
          </div>
          {errorScore && <small className="text-primary flex mb-1">{tStrings.yotpo.scoreError}</small>}
        </div>
        <div className="form-group mb-1">
          <p className="text-sm mb-1">
            <span className="text-primary">* </span>
            {tStrings.yotpo.title}
            :
          </p>
          <input type="text" className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0" id="yotpoFormTitle" value={title} onChange={(e) => setTitle(e.target.value)} required aria-label="review form title" />
          {errorTitle && <small className="text-primary mb-1">{tStrings.yotpo.titleError}</small>}
        </div>
        <div className="form-group mb-1">
          <p className="text-sm mb-1">
            <span className="text-primary">* </span>
            {tStrings.yotpo.review}
            :
          </p>
          <textarea className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none" id="yotpoFormReview" value={review} onChange={(e) => setReview(e.target.value)} rows={5} aria-label="review form" />
          {errorReview && <small className="text-primary mb-1">{tStrings.yotpo.reviewError}</small>}
        </div>
        {customQuestions.map((q) => (
          <div className="form-group mb-1" key={q.slug}>
            <p className="text-sm mb-1">{q.question}</p>
            {q.options.map((op) => (
              <div className={`custom-control custom-${q.radio ? 'radio' : 'checkbox'} mb-1`} key={op}>
                { !q.radio && <CheckBox name={q.slug} id={`${q.slug}-${kebabCase(op)}`} value={op} label={op}/> }
                { q.radio && <RadioOption name={q.slug} id={`${q.slug}-${kebabCase(op)}`} value={op} label={op}/> }
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-wrap mx-0 lg:mx-hg mb-3 lg:justify-end">
          <div className="lg:w-1/3 px-0 lg:px-g mb-1 lg:mb-0">
            <p className="text-sm mb-1">
              <span className="text-primary">* </span>
              {tStrings.yotpo.name}
              :
            </p>
            <input type="text" id="yotpoReviewName" className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="review form name" />
            {errorName && <small className="text-primary mb-1">{tStrings.yotpo.nameError}</small>}
          </div>
          <div className="lg:w-1/3 px-0 lg:px-g">
            <p className="text-sm mb-1">
              <span className="text-primary">* </span>
              {tStrings.yotpo.email}
              :
            </p>
            <input type="email" id="yotpoReviewEmail" className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="review form email" />
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

YotpoReviewForm.propTypes = {
  customQuestions: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activeForm: PropTypes.string.isRequired,
};

export default YotpoReviewForm;
