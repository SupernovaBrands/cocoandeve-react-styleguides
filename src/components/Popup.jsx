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

    let body_classes = "";
    let content_classes = "";
    let modal_size = "modal-lg modal-dialog-centered"

    if(props.body_classes) {
        body_classes = props.body_classes;
    }

    if(props.cotent_classes) {
        content_classes = props.cotent_classes;
    }

    if(props.modal_size) {
        modal_size = props.modal_size;
    }

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <div className={`modal fade show ${props.classes}`} id="birthdayModal" tabIndex="-1" role="dialog" style={{display: `block`}}>
                    <div className={`modal-dialog ${modal_size} mx-lg-auto`} role="document">
                        <div className={`modal-content position-relative overflow-hidden ${content_classes}`}>
                            {props.picture &&
                                <picture className="position-absolute w-100"> 
                                    <source srcSet="https://cdn.shopify.com/s/files/1/0277/5262/8295/files/Rectangle_2241_1.png?v=1646576057" media="(min-width: 992px)" />
                                    <img src="https://cdn.shopify.com/s/files/1/0073/5186/1332/files/newsletter-bigger-mobile.png?v=1646639302" className="w-100" />
                                </picture>
                            }
                            <div className={`modal-body ${body_classes}`}>
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