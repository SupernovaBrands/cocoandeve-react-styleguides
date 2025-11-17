/* global tStrings */
import { FC, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  kebabCase,
  validateEmail,
} from '~/modules/utils_v2';

import SvgFull from '~/images/icons/star-full.svg';
import SvgClose from '~/images/icons/close-circle.svg';
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
  bgCtaColor: string
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
  bgCtaColor
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
	const [videoError, setErrorVideo] = useState('');

  const [hasError, setHasError] = useState<boolean>(false);
	const [thumbs, setThumbs] = useState([]);
	const [videosThumbs, setVideosThumbs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
	let filesArr = [];
	let videoArr = [];

	const removeFile = (index:any) => {
		const tmpThumbs = [...thumbs];
		tmpThumbs.splice(index, 1);
		setThumbs(tmpThumbs);
	};

	const removeVideo = (index:any) => {
		const tmpVideos = [...videosThumbs];
		tmpVideos.splice(index, 1);
		setVideosThumbs(tmpVideos);
		setErrorVideo('');
	};

	const getVideoCover = (file:any, seekTo = 0.0) => new Promise((resolve, reject) => {
		// load the file to a video player
		const videoPlayer = document.createElement('video');
		videoPlayer.setAttribute('src', URL.createObjectURL(file));
		videoPlayer.load();
		videoPlayer.addEventListener('error', (ex) => {
			// eslint-disable-next-line prefer-promise-reject-errors
			reject('error when loading video file');
		});
		// load metadata of the video to get video duration and dimensions
		videoPlayer.addEventListener('loadedmetadata', () => {
			// seek to user defined timestamp (in seconds) if possible
			if (videoPlayer.duration < seekTo) {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject('video is too short.');
				return;
			}
			// delay seeking or else 'seeked' event won't fire on Safari
			setTimeout(() => {
				videoPlayer.currentTime = seekTo;
			}, 200);
			// extract video thumbnail once seeking is complete
			videoPlayer.addEventListener('seeked', () => {
				// console.log('video is now paused at %ss.', seekTo);
				// define a canvas to have the same dimension as the video
				const canvas = document.createElement('canvas');
				canvas.width = videoPlayer.videoWidth;
				canvas.height = videoPlayer.videoHeight;
				// draw the video frame to canvas
				const ctx = canvas.getContext('2d');
				ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
				// return the canvas image as a blob
				ctx.canvas.toBlob(
					(blob) => {
						const reader = new FileReader();
						reader.onloadend = () => resolve(reader.result);
						reader.readAsDataURL(blob);
					},
					'image/jpeg',
					0.75, /* quality */
				);
			});
		});
	});

	const readFile = async (files:any, index:number) => {
		const reader = new FileReader();
		if (files[index]) {
			let cover:string = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCABkAGQDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z';
			if (files[index].type.includes('video')) {
				const resultCover = await getVideoCover(files[index]);
				if (resultCover) {
          // @ts-ignore
					cover = resultCover;
				}
			}
			reader.readAsDataURL(files[index]);
			reader.onloadend = () => {
				const size = files[index].size / 1000000;
        // @ts-ignore
				if (reader.result && reader.result.includes('data:video')) {
					if (size < 2000) {
						videoArr.push({
							cover, dataUrl: reader.result, isVideo: true, size: files[index].size, name: files[index].name, uniqueIdentifier: `${new Date().getTime()}-${files[index].name}`, file: files[index],
						});
					} else {
						setErrorVideo(`${files[index].name} size of video too large.`);
					}
        // @ts-ignore
      } else if (reader.result.includes('data:image')) {
					filesArr.push(reader.result);
				}
				readFile(files, index + 1);
			};
		} else {
			let images = thumbs.concat(filesArr);
			if (images.length > 10) {
				images = images.filter((img, ind) => ind < 10);
			}
			let videos = videosThumbs.concat(videoArr);
			if (videos.length > 3) {
				videos = videos.filter((img, ind) => ind < 3);
			}
			setThumbs(images);
			setVideosThumbs(videos);
		}
		return true;
	};

	const imageUpload =(e:any) => {
    console.log('image upload');
		filesArr = [];
		videoArr = [];
		setErrorVideo('');
		readFile(e.target.files, 0);
	};

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
			const form = document.getElementById('yotpoReviewForm');
			const custom = {};
			customQuestions.forEach((q) => {
				const checked = form.querySelectorAll(`input[name='${q.slug}']:checked`);
				if (checked && checked.length) {
          // @ts-ignore
					custom[q.slug] = [{...checked}].map((c) => c.value);
				}
			});

			const data = {
				review_score: score,
				review_title: title,
				review_content: review,
				display_name: name,
				review_source: 'widget_v2',
				email,
				custom_fields: custom,
        uploaded_images: [],
        uploaded_videos: [],
			};

			if (thumbs.length) {
				const uploadedImages = [];
				thumbs.forEach((thumb) => uploadedImages.push({ dataUrl: thumb }));
				data.uploaded_images = uploadedImages;
			}

			if (videosThumbs.length) {
				const uploadedVideos = [];
				videosThumbs.forEach((thumb) => uploadedVideos.push(thumb));
				data.uploaded_videos = uploadedVideos;
			}

			onSubmit(data);
      setSubmitting(true);
		}
	};

  return (
    <div id="yotpoReviewForm" className={`${activeForm === 'review' ? 'collapsed' : 'collapse hidden'} mt-3`}>
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
        <div className="form-group">
					<p className="font-size-sm mb-1">Add Media</p>
					<label className="btn border cursor-pointer" htmlFor="upload-btn">
						<input className="form-control" type="file" accept="image/*,video/*" multiple={true} hidden={true} onChange={imageUpload} id="upload-btn" />
						Upload
					</label>
					<small className="block mb-1 mt-1">Upload up to 10 images and 3 videos (max. file size 2 GB)</small>
					{ videoError && (<small className="text-primary mb-1">{videoError}</small>) }
					<div className="files-preview flex">
						{thumbs.map((thumb, index) => (
							<picture key={`thumb-upload-${index}`} className="img-thumbnail w-2/12 lg:w-1/12 mr-1 p-0 border bg-white rounded border-gray-500">
								<button type="button" aria-label="remove" className="border-0 inline-block absolute bg-transparent h2 text-primary" onClick={() => removeFile(index)}><SvgClose className="svg fill-primary" /></button>
								<img style={{ maxHeight: 100 }} className="w-full rounded object-contain h-full" src={thumb} alt={`thumbs-${index}`} />
							</picture>
						))}
						{videosThumbs.map((thumb, index) => (
							<div key={`thumb-video-${index}`} className="img-thumbnail w-2/12 lg:w-1/12 mr-1 p-0 border bg-dark rounded border-gray-500">
								<button type="button" aria-label="remove" className="border-0 inline-block absolute bg-transparent h2 text-primary" onClick={() => removeVideo(index)}><SvgClose className="svg fill-primary" /></button>
								<img style={{ maxHeight: 100 }} className="w-full rounded object-contain h-full" src={thumb.cover} alt={`thumbs-${index}`} />
							</div>
						))}
					</div>
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
        <div className="flex flex-wrap mx-0 lg:-mx-hg mb-3 lg:justify-end">
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
          <Button type="button" bgCtaColor={bgCtaColor} disabled={submitting} className="bg-white border border-primary hover:bg-primary hover:text-white text-primary font-bold w-[110px]" lg={false} onClick={onSubmitButton}>
            {!submitting && tStrings.yotpo.submit}
            {submitting && <span className="spinner-border spinner-border-sm text-white ml-1 !w-[15px] !h-[15px]" role="status" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

YotpoReviewForm.propTypes = {
  customQuestions: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activeForm: PropTypes.string,
};

export default YotpoReviewForm;
