import { useState } from 'react';
import BirthdayPopup from '@/compounds/birthday-popup';
import ExitIntentPopup from '@/compounds/exit-intent-popup';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";

const Popups = () => {
    const [birthdayShow, setBirthdayShow] = useState(false);
    const [exitIntentShow, setExitIntentShow] = useState(false);
    
    const birthdayHandleShow = () => setBirthdayShow(true);
    const birthdayHandleHide = () => setBirthdayShow(false);

    const exitIntentHandleShow = () => setExitIntentShow(true);
    const exitIntentHandleHide = () => setExitIntentShow(false);
    
    return (
        <Container className='mt-4'>
            <h2>Birthday Popup</h2>

            <Button variant="primary" onClick={birthdayHandleShow}>
                Launch
            </Button>
            {birthdayShow && (
                <BirthdayPopup onShow={birthdayHandleShow} onHide={birthdayHandleHide}>
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
        </Container>
    );
};

export default Popups;