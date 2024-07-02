import parse from 'html-react-parser';
import Benefit1 from '~/images/icons/affiliate-benefits-1-money.svg';
import Benefit2 from '~/images/icons/affiliate-benefits-2-vip-card.svg';
import Benefit3 from '~/images/icons/affiliate-benefits-3-cookie.svg';
import Benefit4 from '~/images/icons/affiliate-benefits-4-photos.svg';
import Benefit5 from '~/images/icons/affiliate-benefits-5-exchange.svg';
import Benefit6 from '~/images/icons/affiliate-benefits-6-exchange.svg';

const Affiliate = (props: any) => {
	const { banner, content, benefit, hiw } = props;
	return (
		<>
			{banner && (
				<figure className="relative block bg-affiliate">
					<picture>
						<source srcSet={banner.back_img.url.replace('public', '1920x')} media="(min-width: 992px)" />
						<img src={banner.back_img_2.url.replace('public', '828x')} alt={banner.title} className="w-full" loading="lazy" />
					</picture>

					<figcaption className="relative bg-affiliate lg:bg-transparent lg:absolute w-full -top-2 lg:top-0 bottom-0 left-0 right-0">
						<div className="polygon-path bg-affiliate h-[5.625rem] absolute -translate-y-[50%] top-[1px] left-0 right-0 lg:hidden"></div>
						<div className="container lg:h-full">
							<div className="flex justify-center items-center h-full">
								<div className="grow-0 shrink-0 basis-[40%] hidden lg:block"></div>
								<div className="f-text border-t border-t-transparent text-center lg:flex-1 text-affiliate-black">
									<h5 className="text-base tracking-[.8px] lg:text-xl lg:tracking-[1.2px]">{banner.introducing}</h5>
									<h1 className="text-[2rem] leading-[2.25rem] mt-25 mb-1 max-w-[80%] mx-auto lg:my-2 lg:text-hero lg:leading-[4.5rem] lg:max-w-[90%]">{banner.title}</h1>
									<h2 className="hidden lg:block text-xl font-normal mb-[2.813rem] leading-[1.5rem]">{banner.subtitle}</h2>
									<h2 className="lg:hidden text-base text-[#000] font-normal mb-2">
										{banner.subtitle.split(' ').map((text: string, idx: number) => {
											return idx === 3 ? parse(`${text}${"<br />"}`) : `${text} `
										})}
									</h2>
									<a
										href={banner.cta}
										className="btn btn-primary block lg:inline-block fixed lg:static bottom-0 left-0 right-0 h-[3.125rem] z-10 w-full
											lg:w-auto rounded-none text-base border-none py-g lg:min-w-[13.438rem] lg:rounded-[6px] lg:text-lg lg:h-auto hover:no-underline hover:text-white"
										>{banner.cta_label}</a>
								</div>
							</div>
						</div>
					</figcaption>
				</figure>
			)}
			{hiw && (
				<div className="relative">
					<section className="pt-[3.438rem] lg:pt-[6.313rem] bg-affiliate-green">
						<div className="container -mb-4">
							<div className="flex justify-center flex-wrap lg:flex-row">
								<div className="grow-0 shrink-0 basis-full lg:basis-1/2 lg:order-2">
									<div className="relative min-h-[16.25rem]">
										{hiw.result_img_1 && (
											<div className="absolute result-7 w-[11.188rem] lg:w-[18.938rem] h-auto z-[2] left-0">
												<img src={hiw.result_img_1.url} className="w-full" loading="lazy" alt="" />
											</div>
										)}
										{hiw.result_img_2 && (
											<div className="absolute result-8 w-[13.5rem] right-25 top-3 lg:w-[22.813rem] lg:right-[1.563rem] lg:top-[3.125rem] h-auto z-[3]">
												<img src={hiw.result_img_2.url} className="w-full" loading="lazy" alt="" />
											</div>
										)}
										{hiw.result_img_3 && (
											<div className="absolute result-9 w-[9.25rem] left-3 top-[7.625rem] lg:w-[15.688rem] lg:left-[3.125rem] lg:top-[12.813rem] h-auto z-[4]">
												<img src={hiw.result_img_3.url} className="w-full" loading="lazy" alt="" />
											</div>
										)}
									</div>
								</div>
								<div className="grow-0 shrink-0 basis-full lg:basis-1/2 lg:order-1">
									<div className="max-w-[30.938rem] mx-auto text-center lg:text-left">
										<h2 className="text-[2rem] leading-[2.375rem] mt-[3.125rem] lg:mt-0 mb-2 text-[#000] lg:text-[3rem] lg:leading-[3.375rem]">{hiw.section_title}</h2>
										<div className="max-w-[85%] mx-auto lg:mx-0 lg:max-w-none">
											{parse(hiw.section_p.replace('<p>', '<p class="lg:text-[1.125rem] lg:leading-[1.5rem] mb-[1rem]">'))}
										</div>
										<div className="flex justify-center items-center badge-awards mt-4 lg:mt-[4.375rem] flex-wrap">
											{hiw.beauty_awards.map((award) => (
												<div key={award.id} className="text-center mb-2 py-[.5em] px-[1em] min-w-[3.375em] grow-0 shrink-0 basis-1/4">
													<img src={award.url.replace('public', '86x')} className="w-full max-w-[4.125rem] lg:max-w-[5.375rem]" loading="lazy" alt="" />
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
						<span className="-mt-[2.188rem] -z-[1] bottom-g translate-y-full hidden lg:inline-block absolute w-full">
							<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/301bd0f2-1acf-465d-be74-933a99d5ad00/public" alt="" className="w-full" loading="lazy" />
						</span>
						<span className="translate-y-full inline-block lg:hidden w-full mt-[1.563rem]">
							<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d12c4875-8037-4011-ea6a-6bbf5f8c4a00/public" alt="" className="w-full" loading="lazy" />
						</span>
					</section>
				</div>
			)}

			{benefit && (
				<section className="mt-[10.625rem] lg:max-w-[52.188rem] mx-auto lg:mt-[15rem] xxl:mt-[19.375rem]">
					<div className="container">
						<h2 className="text-[#000] text-[2rem] lg:text-[3rem] leading-[2.375rem] lg:leading-[3.625rem] mb-4 lg:mb-[4.063rem] text-center">{benefit.section_title}</h2>
						<div className="flex flex-wrap justify-center benefits">
							{[...Array(6)].map((data, i) => (
								<div key={`benefit-${i}`} className="w-1/2 lg:w-1/3 text-center mb-[2.188rem] lg:mb-[3.125rem]">
									<h4 className="w-[6.25rem] h-[6.25rem] inline-block rounded-full relative mx-auto bg-affiliate-green" role="presentation">
										{i === 0 && <Benefit1 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 1 && <Benefit2 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 2 && <Benefit3 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 3 && <Benefit4 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 4 && <Benefit5 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 5 && <Benefit6 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
									</h4>
									<p className="text-[.875rem] leading-[1.14285em] lg:text-[1.125rem] lg:leading-[1.5rem] max-w-[80%] lg:max-w-[90%] mt-[1rem] lg:mt-2 mx-auto">
										{parse(benefit[`txt_${i + 1}`])}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{content && (
				<section className="mt-3 lg:mt-0 overflow-hidden">
					<h2 className="text-center text-[#000] mb-[2.813rem] mt-[1.125rem] text-[2rem] leading-[2.375rem] lg:mt-3 lg:text-[3rem] lg:leading-[3.625rem]">{content.section_title}</h2>
					{[...Array(3)].map((idx, i) => (
							<div key={`affiliate-content-${i}`} className="flex flex-wrap flex-1 justify-center">
								{content[`section_ct_img_${i + 1}`] && (
									<div className={`w-full lg:w-1/2 p-0 bg-[#feb1be] ${content[`section_img_pos_${i + 1}`] === 'right' ? 'lg:order-2' : ''}`}>
										<img src={content[`section_ct_img_${i + 1}`].url} className="w-full" loading="lazy" alt="" />
									</div>
								)}
								<div className="w-full lg:w-1/2 p-0 flex items-center justify-center bg-[#f5dadf]">
									<div className="max-w-[41.563rem] pt-[1.75rem] lg:pt-4 pb-4">
										<div className="text-center lg:text-left max-w-[28.438rem]">
											<h3 className="mx-auto mb-[0.813rem] text-base leading-[1.5rem] tracking-[.8px] max-w-[80%] font-normal lg:text-[1.5rem] lg:leading-[1.5rem] lg:mb-[2rem] lg:tracking-[1.2px]  lg:max-w-none">{content[`section_ct_step_${i + 1}`]}</h3>
											<h2 className={`mx-auto mb-g text-[1.75rem] leading-[1.875rem] ${i === 2 ? 'max-w-[85%]' : 'max-w-[80%]'} lg:text-[3rem] lg:leading-[3.25rem] lg:mb-3 lg:max-w-none`}>{content[`section_ct_title_${i + 1}`]}</h2>
											{i <= 1 && (
												<p className="mt-2 max-w-[19.5rem] lg:max-w-none lg:text-[1.125rem] lg:leading-[1.5rem] mx-auto">
													{i === 0 && (
														<>{parse(content[`section_ct_text_${i + 1}`].replace('btn', 'btn btn-primary mt-g border-none rounded-[6px] lg:text-[1.125rem] lg:leading-[1.5rem] py-1 hover:text-white hover:no-underline'))}</>
													)}
													{i === 1 && (
														<>{parse(content[`section_ct_text_${i + 1}`])}</>
													)}
												</p>
											)}
											{i === 2 && (
												<div className="affiliate--content-li text-left px-0">
													{i === 2 && (
														<>{parse(content[`section_ct_text_${i + 1}`])}</>
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
				</section>
			)}
			{content && (
				<section className="mt-2 mb-1 lg:mb-5 overflow-hidden">
					<div className="container">
						<div className="max-w-[53rem] mx-auto mb-[4.375rem] lg:mb-0 px-2">
							<h2 className="text-[#000] my-4 text-[1.75rem] lg:text-[3rem] leading-[1.875rem] lg:leading-[3.625rem] lg:mb-5 text-center">{content.faq_heading}</h2>

							<h2 className="text-base mb-g lg:text-xl lg:leading-[1.75rem] lg:mb-[1.563rem]">{content.faq_title_1}</h2>
							<div className="mb-4">
								{parse(content.faq_content_1.replace('<p', '<p class="font-size-sm lg:text-[1.125rem] lg:leading-[1.5rem]"'))}
							</div>
							<h2 className="text-base mb-g lg:text-xl lg:leading-[1.75rem] lg:mb-[1.563rem]">{content.faq_title_2}</h2>
							<div className="mb-4">
								{parse(content.faq_content_2.replace('<p', '<p class="font-size-sm lg:text-[1.125rem] lg:leading-[1.5rem]"'))}
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Affiliate;
