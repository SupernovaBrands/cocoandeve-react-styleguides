import { useState } from 'react';
import BirthdayPopup from '@/compounds/birthday-popup';
import ExitIntentPopup from '@/compounds/exit-intent-popup';
import NewsletterPopup from '@/compounds/newsletter-popup';
import SweeptakesPopup from '@/compounds/sweepstakes-popup';
import CookiesBannerPopup from '@/compounds/cookies-banner-modal';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";

const Popups = () => {
    const [birthdayShow, setBirthdayShow] = useState(false);
    const [exitIntentShow, setExitIntentShow] = useState(false);
    const [newsletterShow, setNewsletterShow] = useState(false);
    const [sweeptakesShow, setSweeptakesShow] = useState(false);
    const [cookiesBannerShow, setCookiesBannerShow] = useState(false);
    
    const birthdayHandleShow = () => setBirthdayShow(true);
    const birthdayHandleHide = () => setBirthdayShow(false);

    const exitIntentHandleShow = () => setExitIntentShow(true);
    const exitIntentHandleHide = () => setExitIntentShow(false);

    const newsletterHandleShow = () => setNewsletterShow(true);
    const newsletterHandleHide = () => setNewsletterShow(false);

    const sweeptakesHandleShow = () => setSweeptakesShow(true);
    const sweeptakesHandleHide = () => setSweeptakesShow(false);

    const cookiesBannerHandleShow = () => setCookiesBannerShow(true);
    const cookiesBannerHandleHide = () => setCookiesBannerShow(false);
    
    return (
        <Container className='mt-4'>
            <h2>Birthday Popup</h2>

            <Button variant="primary" onClick={birthdayHandleShow}>
                Launch
            </Button>
            {birthdayShow && (
                <BirthdayPopup onShow={birthdayHandleShow} onHide={birthdayHandleHide} title="Don’t forget your birthday gift!" content="Tell us your birthday and enjoy $10 off to celebrate!">
                    Test
                </BirthdayPopup>
            )}

            <h2 className="mt-4">Exit Intent Popup</h2>

            <Button variant="primary" onClick={exitIntentHandleShow}>
                Launch
            </Button>
            {exitIntentShow && (
                <ExitIntentPopup onShow={exitIntentHandleShow} onHide={exitIntentHandleHide}>
                    Test
                </ExitIntentPopup>
            )}

            <h2 className="mt-4">Newsletter Signup Popup</h2>

            <Button variant="primary" onClick={newsletterHandleShow}>
                Launch
            </Button>
            {newsletterShow && (
                <NewsletterPopup onShow={newsletterHandleShow} onHide={newsletterHandleHide}>
                    Test
                </NewsletterPopup>
            )}

            <h2 className="mt-4">Sweepstakes Signup Popup</h2>

            <Button variant="primary" onClick={sweeptakesHandleShow}>
                Launch
            </Button>
            {sweeptakesShow && (
                <SweeptakesPopup onShow={sweeptakesHandleShow} onHide={sweeptakesHandleHide}>
                    Test
                </SweeptakesPopup>
            )}

            <h2 className="mt-4">Cookies Banner Popup</h2>

            <Button variant="primary" onClick={cookiesBannerHandleShow}>
                Launch
            </Button>
            {cookiesBannerShow && (
                <CookiesBannerPopup onShow={cookiesBannerHandleShow} onHide={cookiesBannerHandleHide}>
                    Test
                </CookiesBannerPopup>
            )}
        </Container>
    );
};

export default Popups;