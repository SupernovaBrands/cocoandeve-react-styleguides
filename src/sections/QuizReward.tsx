import React, { useEffect, useRef, useState } from 'react';
import {
    encryptParam,
} from '~/modules/utils_v2';

const AWARD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9213 10.4006C14.6428 9.33533 15.0643 8.05025 15.0643 6.66667C15.0643 2.98477 12.0795 0 8.3976 0C4.7157 0 1.73093 2.98477 1.73093 6.66667C1.73093 7.96208 2.10041 9.17125 2.73974 10.1944L0.111646 14.7464C-0.0327625 14.9965 -0.0373626 15.3036 0.0994791 15.5579C0.236329 15.8122 0.495104 15.9776 0.783404 15.9949L3.28053 16.1448L4.6589 18.2324C4.81803 18.4734 5.09061 18.6149 5.3793 18.6062C5.66799 18.5976 5.9316 18.4401 6.07601 18.1899L8.39826 14.1677L10.5926 17.9685C10.737 18.2186 11.0006 18.3761 11.2893 18.3847C11.578 18.3934 11.8506 18.252 12.0097 18.011L13.3202 16.0262L15.6943 15.8837C15.9826 15.8663 16.2414 15.701 16.3783 15.4467C16.5151 15.1923 16.5105 14.8852 16.3661 14.6352L13.9213 10.4006ZM8.3976 11.6667C11.159 11.6667 13.3976 9.42808 13.3976 6.66667C13.3976 3.90524 11.159 1.66667 8.3976 1.66667C5.63617 1.66667 3.3976 3.90524 3.3976 6.66667C3.3976 9.42808 5.63617 11.6667 8.3976 11.6667ZM9.76051 13.1939L11.3618 15.9674L12.1589 14.7602C12.3034 14.5412 12.5426 14.4032 12.8044 14.3874L14.2485 14.3007L12.7544 11.7128C11.9136 12.4394 10.8893 12.9594 9.76051 13.1939ZM2.2292 14.412L3.87375 11.5636C4.74461 12.3685 5.83064 12.944 7.03585 13.1942L5.30682 16.1889L4.4418 14.8787C4.29728 14.6599 4.05813 14.5218 3.7963 14.5061L2.2292 14.412Z" fill="#00635B"/>
</svg>`;

const MONEY_BACK = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <path d="M9.11874 0.374756C7.43049 0.375985 5.77864 0.865561 4.36237 1.78445C2.9461 2.70334 1.82588 4.01231 1.13678 5.55352C0.447687 7.09474 0.219143 8.80238 0.478708 10.4706C0.738272 12.1387 1.47486 13.6962 2.59966 14.9552C2.77098 15.1585 2.95356 15.352 3.14656 15.5349C3.26688 15.6498 3.39267 15.7646 3.52392 15.874C3.65518 15.9834 3.8466 16.1256 4.0052 16.2349H3.64971C3.50466 16.2349 3.36556 16.2926 3.26299 16.3951C3.16043 16.4977 3.10281 16.6368 3.10281 16.7818C3.10281 16.9269 3.16043 17.066 3.26299 17.1686C3.36556 17.2711 3.50466 17.3287 3.64971 17.3287H5.29042C5.43547 17.3287 5.57457 17.2711 5.67714 17.1686C5.7797 17.066 5.83732 16.9269 5.83732 16.7818V15.1411C5.83732 14.9961 5.7797 14.857 5.67714 14.7544C5.57457 14.6519 5.43547 14.5942 5.29042 14.5942C5.14537 14.5942 5.00627 14.6519 4.9037 14.7544C4.80114 14.857 4.74352 14.9961 4.74352 15.1411V15.3982C4.57945 15.2833 4.40991 15.163 4.2349 15.0263C4.05989 14.8896 4.02161 14.8403 3.92316 14.7419C3.82472 14.6435 3.57861 14.4083 3.41454 14.2278C2.24616 12.9207 1.56176 11.2522 1.47569 9.50109C1.38962 7.75 1.9071 6.02242 2.94166 4.60702C3.97623 3.19161 5.4652 2.17412 7.15978 1.72456C8.85436 1.275 10.6519 1.42062 12.252 2.13707C13.8521 2.85352 15.1579 4.09741 15.9512 5.66088C16.7444 7.22435 16.9771 9.0127 16.6103 10.7271C16.2435 12.4415 15.2995 13.9781 13.9359 15.0801C12.5724 16.1821 10.8719 16.7828 9.11874 16.7818C8.60437 16.784 8.09117 16.7327 7.58741 16.6287C7.51559 16.6143 7.44165 16.6143 7.36979 16.6285C7.29794 16.6427 7.2296 16.6709 7.16866 16.7115C7.10771 16.7522 7.05537 16.8044 7.01462 16.8653C6.97386 16.9261 6.94549 16.9944 6.93113 17.0662C6.91676 17.1381 6.91669 17.212 6.9309 17.2838C6.94511 17.3557 6.97334 17.424 7.01397 17.485C7.0546 17.5459 7.10683 17.5983 7.16769 17.639C7.22854 17.6798 7.29683 17.7082 7.36865 17.7225C8.56023 17.9477 9.78561 17.9228 10.9671 17.6494C12.1485 17.3759 13.2602 16.8599 14.2316 16.134C15.2031 15.4081 16.013 14.4882 16.6101 13.4327C17.2072 12.3773 17.5784 11.2092 17.7001 10.0026C17.8218 8.79607 17.6914 7.57739 17.3172 6.4239C16.9429 5.27042 16.333 4.20731 15.5262 3.30203C14.7193 2.39675 13.733 1.66907 12.63 1.16514C11.527 0.661223 10.3313 0.392068 9.11874 0.374756Z" fill="#00635B"/>
  <path d="M5.83732 15.1411C5.83732 15.0324 5.80519 14.9268 5.74575 14.8376L5.67714 14.7544C5.60026 14.6775 5.50291 14.6255 5.39785 14.6045L5.29042 14.5942C5.14537 14.5942 5.00627 14.6519 4.9037 14.7544L4.83511 14.8376C4.77567 14.9268 4.74352 15.0324 4.74352 15.1411V15.3982L4.2349 15.0263C4.14723 14.9578 4.09399 14.9111 4.0502 14.8694L3.92316 14.7419C3.82472 14.6435 3.57861 14.4083 3.41454 14.2278C2.31932 13.0023 1.64921 11.4588 1.49893 9.82788L1.47569 9.50109C1.39507 7.85942 1.84472 6.23794 2.75381 4.87549L2.94166 4.60702C3.91155 3.28014 5.28079 2.30257 6.84439 1.81519L7.15978 1.72456C8.85436 1.275 10.6519 1.42062 12.252 2.13707C13.8521 2.85352 15.1579 4.09741 15.9512 5.66088C16.7444 7.22435 16.9771 9.0127 16.6103 10.7271L16.5343 11.0461C16.1234 12.6317 15.2143 14.0469 13.9359 15.0801L13.6767 15.2808C12.3599 16.2549 10.7625 16.7828 9.11874 16.7818C8.60437 16.784 8.09117 16.7327 7.58741 16.6287C7.51559 16.6143 7.44165 16.6143 7.36979 16.6285C7.29794 16.6427 7.2296 16.6709 7.16866 16.7115L7.08365 16.781C7.05797 16.8067 7.03491 16.835 7.01462 16.8653C6.97386 16.9261 6.94549 16.9944 6.93113 17.0662L6.92007 17.1753C6.92005 17.2117 6.92381 17.248 6.9309 17.2838C6.94511 17.3557 6.97334 17.424 7.01397 17.485C7.0546 17.5459 7.10683 17.5983 7.16769 17.639C7.22854 17.6798 7.29683 17.7082 7.36865 17.7225C8.56023 17.9477 9.78561 17.9228 10.9671 17.6494C12.0008 17.4101 12.9813 16.9853 13.861 16.3965L14.2316 16.134C15.2031 15.4081 16.013 14.4882 16.6101 13.4327C17.1326 12.5091 17.482 11.4992 17.6427 10.4529L17.7001 10.0026C17.8218 8.79607 17.6914 7.57739 17.3172 6.4239C16.9429 5.27042 16.333 4.20731 15.5262 3.30203C14.8202 2.51001 13.9768 1.85397 13.0382 1.36475L12.63 1.16514C11.527 0.661223 10.3313 0.392068 9.11874 0.374756C7.43049 0.375985 5.77864 0.865561 4.36237 1.78445L4.10025 1.96167C2.80788 2.86819 1.78278 4.10885 1.13678 5.55352C0.447687 7.09474 0.219143 8.80238 0.478708 10.4706C0.738272 12.1387 1.47486 13.6962 2.59966 14.9552C2.77098 15.1585 2.95356 15.352 3.14656 15.5349C3.26688 15.6498 3.39267 15.7646 3.52392 15.874C3.65518 15.9834 3.8466 16.1256 4.0052 16.2349H3.64971C3.50466 16.2349 3.36556 16.2926 3.26299 16.3951L3.19449 16.4783C3.13501 16.5675 3.10281 16.6731 3.10281 16.7818L3.11392 16.8884C3.13484 16.9936 3.18615 17.0916 3.26299 17.1686C3.33988 17.2455 3.43731 17.2971 3.54239 17.3181L3.64971 17.3287H5.29042C5.39945 17.3287 5.50507 17.2961 5.59439 17.2363L5.67714 17.1686C5.75395 17.0916 5.80541 16.9936 5.82632 16.8884L5.83732 16.7818V15.1411ZM6.21206 16.7822C6.21196 17.0266 6.11509 17.2613 5.94229 17.4341C5.76942 17.6069 5.53484 17.7039 5.29043 17.7039H3.64981C3.40542 17.7039 3.17082 17.6068 2.99795 17.4341C2.82515 17.2613 2.72828 17.0266 2.72818 16.7822C2.72818 16.5378 2.82515 16.3032 2.99795 16.1304C3.03833 16.09 3.08212 16.0536 3.12857 16.0217C3.04643 15.9488 2.96431 15.8784 2.88809 15.8057C2.68777 15.6158 2.4986 15.4158 2.32046 15.2051L2.1044 14.9548C1.0528 13.6884 0.362337 12.1592 0.108548 10.5286C-0.16214 8.7889 0.0759578 7.00765 0.794583 5.40039C1.51321 3.79318 2.68191 2.42797 4.15884 1.46973C5.6357 0.511654 7.35815 0.00128197 9.11856 0H9.12466C10.3889 0.0181286 11.6355 0.29862 12.7856 0.823975C13.9358 1.34949 14.9641 2.10891 15.8056 3.05298C16.647 3.99705 17.2842 5.10568 17.6745 6.30859C18.0646 7.51134 18.2006 8.78223 18.0736 10.0403C17.9467 11.2985 17.5586 12.5162 16.9359 13.6169C16.3134 14.7175 15.4696 15.6774 14.4567 16.4343C13.4437 17.1912 12.2841 17.7299 11.0522 18.0151C9.82008 18.3003 8.54113 18.3257 7.29849 18.0908H7.29483C7.17478 18.0668 7.06086 18.0186 6.95913 17.9504C6.85736 17.8823 6.76951 17.7948 6.70157 17.6929C6.63384 17.5912 6.58742 17.477 6.56363 17.3572C6.53986 17.237 6.5396 17.1123 6.56363 16.9922C6.58768 16.8723 6.63474 16.7581 6.70279 16.6565C6.77094 16.5547 6.85844 16.4669 6.96035 16.3989C7.06225 16.331 7.17714 16.2847 7.29727 16.261C7.41738 16.2372 7.54098 16.237 7.66104 16.261H7.66348C8.14173 16.3597 8.62901 16.4083 9.11734 16.4062C10.7845 16.4072 12.4032 15.8367 13.6999 14.7888C14.9966 13.7408 15.895 12.2786 16.2438 10.6482C16.5925 9.01791 16.3707 7.31683 15.6164 5.83008C14.8619 4.34343 13.6199 3.16053 12.0983 2.47925C10.5766 1.79805 8.8672 1.6599 7.25576 2.0874C5.64442 2.51494 4.22837 3.48204 3.24453 4.82788C2.26069 6.1739 1.7687 7.81719 1.85049 9.48242C1.93229 11.1466 2.58154 12.7331 3.69131 13.9758C3.84732 14.1474 4.07858 14.3668 4.18814 14.4763C4.29276 14.5809 4.31301 14.6113 4.46524 14.7302L4.46768 14.7327C4.51168 14.644 4.56732 14.5611 4.63858 14.4897C4.81147 14.3169 5.04593 14.2188 5.29043 14.2188C5.53493 14.2188 5.7694 14.3169 5.94229 14.4897C6.11503 14.6626 6.21206 14.8972 6.21206 15.1416V16.7822Z" fill="#00635B"/>
  <path d="M9.82915 12.9732V12.8347C10.3382 12.6499 10.7661 12.2922 11.0381 11.824C11.3101 11.3557 11.4089 10.8068 11.3172 10.2731C11.2255 9.73939 10.9492 9.2549 10.5365 8.90431C10.1238 8.55373 9.60097 8.35934 9.05947 8.35514C8.85534 8.35514 8.65957 8.27405 8.51523 8.12971C8.37088 7.98536 8.28979 7.78959 8.28979 7.58546C8.28979 7.38133 8.37088 7.18556 8.51523 7.04122C8.65957 6.89688 8.85534 6.81579 9.05947 6.81579H10.5988C10.803 6.81579 10.9987 6.7347 11.1431 6.59035C11.2874 6.44601 11.3685 6.25024 11.3685 6.04611C11.3685 5.84198 11.2874 5.64621 11.1431 5.50187C10.9987 5.35753 10.803 5.27644 10.5988 5.27644H9.82915C9.82915 5.0723 9.74806 4.87653 9.60371 4.73219C9.45937 4.58785 9.2636 4.50676 9.05947 4.50676C8.85534 4.50676 8.65957 4.58785 8.51523 4.73219C8.37088 4.87653 8.28979 5.0723 8.28979 5.27644V5.41498C7.78075 5.59968 7.35282 5.95742 7.08081 6.42566C6.80879 6.8939 6.71 7.44285 6.8017 7.97654C6.8934 8.51024 7.16976 8.99473 7.58247 9.34531C7.99517 9.6959 8.51797 9.89029 9.05947 9.89449C9.2636 9.89449 9.45937 9.97558 9.60371 10.1199C9.74806 10.2643 9.82915 10.46 9.82915 10.6642C9.82915 10.8683 9.74806 11.0641 9.60371 11.2084C9.45937 11.3528 9.2636 11.4338 9.05947 11.4338H7.52012C7.31599 11.4338 7.12022 11.5149 6.97587 11.6593C6.83153 11.8036 6.75044 11.9994 6.75044 12.2035C6.75044 12.4076 6.83153 12.6034 6.97587 12.7478C7.12022 12.8921 7.31599 12.9732 7.52012 12.9732H8.28979C8.28979 13.1773 8.37088 13.3731 8.51523 13.5174C8.65957 13.6618 8.85534 13.7429 9.05947 13.7429C9.2636 13.7429 9.45937 13.6618 9.60371 13.5174C9.74806 13.3731 9.82915 13.1773 9.82915 12.9732Z" fill="#00635B"/>
</svg>`;

const STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <path d="M7.94852 1.03874C8.10865 0.653755 8.65401 0.653755 8.81414 1.03874L10.5858 5.29828C10.6533 5.46058 10.8059 5.57147 10.9811 5.58552L15.5797 5.95418C15.9953 5.9875 16.1638 6.50618 15.8472 6.77743L12.3436 9.77864C12.2101 9.89299 12.1518 10.0724 12.1925 10.2434L13.263 14.7308C13.3597 15.1364 12.9185 15.4569 12.5627 15.2396L8.62567 12.8349C8.47566 12.7433 8.287 12.7433 8.13699 12.8349L4.2 15.2396C3.84417 15.4569 3.40296 15.1364 3.49971 14.7308L4.57011 10.2434C4.6109 10.0724 4.5526 9.89299 4.4191 9.77864L0.915503 6.77743C0.598845 6.50618 0.767372 5.9875 1.18299 5.95418L5.78153 5.58552C5.95674 5.57147 6.10937 5.46058 6.17688 5.29828L7.94852 1.03874Z" stroke="#00635B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const apiUrl = 'https://reviews-api.cocoandeve.com/api';

const QuizReward = (props: any) => {
	const { store, generalSetting } = props;
    const ctaBgColor = generalSetting?.bfcm_cta_bg_color;
    const [totalReviews, setTotalReviews] = useState('28159');
    const sectionRef = useRef<HTMLElement>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasFetched.current) {
                    hasFetched.current = true;
                    const signature = encryptParam(`{brand:'cocoandeve',time:${new Date().getTime()}}`);
                    fetch(`${apiUrl}/reviews/total.json?brand=cocoandeve`, { headers: { 'signature': signature } })
                        .then((data) => data.json())
                        .then((r) => {
                            setTotalReviews(r?.response?.total_reviews?.toLocaleString());
                        })
                        .catch(() => { });
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="container text-center my-5">
            <p className="text-xl lg:text-2xl mb-[.75rem] lg:mb-3 font-bold">Discover more</p>
            {/* <div className="flex flex-wrap -mx-hg lg:-mx-g justify-center">
                <ProductCardQuiz
                    className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative"
                    imgMb="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d336dfd0-5036-429d-18bb-fef66ee83500/614x"
                    imgDt="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2569ea0a-b963-411d-7320-1bab3cd77000/540x"
                    ctaBgColor={ctaBgColor}
                />
				{store !== 'my' && (
					<figure className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative rounded">
                        <a href="/pages/rewards">
                            <picture className="block">
                                <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/704453dd-6f76-4a3a-1c09-c72dc47c5d00/540x" media="(min-width: 992px)" />
                                <img className="w-full rounded-[24px] lg:rounded-[32px]" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/66f96d20-d935-4759-f5d2-e0fc56748700/614x" loading="lazy" alt="Graphic showing the rewards program details, including points and free products" width={384} height={72} />
                            </picture>
                            <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center px-g lg:px-0 lg:mt-4 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                                <p className="lg:text-xl mb-0 lg:mb-25 font-bold text-body">Rewards Program</p>
                                <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body">Sign up for our reward program and <br className="hidden lg:block"/>stack up your points for free product</p>
                                <span className={`hidden lg:inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline ${ctaBgColor === 'bg-dark' ? 'bg-dark border-dark hover:bg-dark' : 'bg-primary border-primary hover:primary-dark' } text-white hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px]`}>Join Now</span>
                                <svg className="lg:hidden absolute right-[24px] -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg>
                            </figcaption>
                        </a>
					</figure>
				)}

                <BeautyConfidence parentClass="w-full lg:w-1/3 px-g mb-g lg:mb-0 block" />
			</div> */}

            <div className="grid gap-y-[.75rem] md:grid-cols-3 md:gap-x-[1rem] xl:grid-cols-[572px_278px_278px] px-hg lg:px-25">
                <div className="grid grid-cols-2 gap-x-[.75rem] md:contents">
                    <figure className="relative">
                        <a href="/pages/rewards" className="block relative">
                            <picture className="block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/discovermore_rewards_d_858x.jpg?v=1771217469" media="(min-width: 992px)" />
                                <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/discovermore_rewards_m_330x.jpg?v=1771217469" loading="lazy" alt="Graphic showing the rewards program details, including points and free products" width={165} height={165} />
                            </picture>
                            <figcaption className="text-body text-left absolute top-0 bottom-0 left-0 right-0 p-[1rem] lg:p-[1.5rem] flex flex-col justify-between">
                                <div className="">
                                    <p className="text-[18px] leading-[22px] lg:text-xl text-left text-body font-bold">Rewards Program</p>
                                    <p className="text-base leading-2 hidden lg:block mt-[.25rem]">Earn points. Get rewards. <br/>Free products made simple!</p>
                                </div>
                                <span className="text-underline text-left text-body font-bold underline-offset-[.125rem] text-sm lg:text-base leading-2">Join Now</span>
                            </figcaption>
                        </a>
                    </figure>
                    <figure>
                        <a href="/pages/self-tan-quiz" className="block relative">
                            <picture className="block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/discovermore_quiz_d_417x.jpg?v=1771217468" media="(min-width: 992px)" />
                                <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/discovermore_quiz_m_330x.jpg?v=1771217472" loading="lazy" alt="Illustration of a person taking a quiz to find their perfect self-tan solution" width={165} height={165} />
                            </picture>
                            <figcaption className="absolute top-0 bottom-0 left-0 right-0 p-[1rem] lg:p-[1.5rem] flex flex-col justify-between">
                                <p className="text-[18px] leading-[22px] lg:text-xl text-left text-body font-bold">Tan Quiz</p>
                                <span className="text-underline text-left text-body font-bold underline-offset-[.125rem] text-sm lg:text-base leading-2 hidden lg:block">Take the Quiz</span>
                            </figcaption>
                        </a>
                    </figure>
                </div>

                <div className="md:contents">
                    <figure className="lg:grid lg:grid-cols-[1fr] lg:items-center relative">
                        <picture className="block">
                            <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/discovermore_services_d_417x.jpg?v=1771217469" media="(min-width: 992px)" />
                            <img className="w-full h-[88px] lg:h-auto" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/discovermore_services_m_576x132.jpg?v=1771217468" loading="lazy" alt="Cocoandeve overview review" width={384} height={88} />
                        </picture>
                        <figcaption className="absolute top-0 bottom-0 left-0 right-0 py-[.75rem] px-[.625rem] lg:p-[1.5rem] items-center text-left">
                            <p className="hidden lg:block text-xl mb-[.5rem] font-bold">Beauty Confidence</p>
                            <div className="grid grid-cols-[99fr_83fr_107fr] lg:grid-cols-1 gap-[1rem] lg:gap-[.75rem]">
                                <div className="flex flex-auto min-w-0 flex-col lg:flex-row items-start lg:items-center lg:gap-[.5rem]">
                                    <i dangerouslySetInnerHTML={{ __html: AWARD_SVG }} className='w-2 h-2' />
                                    <p className="text-sm leading-[18px] lg:text-base lg:leading-2 mt-[.5rem] lg:mt-0">Award-winning beauty</p>
                                </div>
                                <div className="flex flex-auto min-w-0 flex-col lg:flex-row items-start lg:items-center lg:gap-[.5rem]">
                                    <i dangerouslySetInnerHTML={{ __html: MONEY_BACK }} className='w-2 h-2' />
                                    <p className="text-sm leading-[18px] lg:text-base lg:leading-2 mt-[.5rem] lg:mt-0">Money back guarantee</p>
                                </div>
                                <div className="flex flex-auto min-w-0 flex-col lg:flex-row items-start lg:items-center lg:gap-[.5rem]">
                                    <i dangerouslySetInnerHTML={{ __html: STAR }} className='w-2 h-2' />
                                    <p className="text-sm leading-[18px] lg:text-base lg:leading-2 mt-[.5rem] lg:mt-0">{totalReviews} Customer Reviews</p>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>

        </section>
    )
}

export default QuizReward;
