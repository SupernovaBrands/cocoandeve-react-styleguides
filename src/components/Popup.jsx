import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Popup = (props) => {
    useEffect(() => {
        document.body.classList.remove('modal-open');
        if (props.show) {
            document.body.classList.add('modal-open');
        }
    }, [props]);

    const Backdrop = (props) => {
        return <div className="modal-backdrop fade show" onClick={props.onConfirm} />;
    };

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <div className={`modal fade show ${props.classes}`} id="birthdayModal" tabindex="-1" role="dialog" style={{display: `block`}}>
                    <div className="modal-dialog modal-lg modal-dialog-centered mx-g mx-lg-auto" role="document">
                        <div className="modal-content position-relative  overflow-hidden">
                            <div className="modal-body p-0">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}
        </>
    );
}

export default Popup;