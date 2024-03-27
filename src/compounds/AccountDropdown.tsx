import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <a type="button" onClick={decoratedOnClick} href="#javascript">{children}</a>
    );
}
const AccountDropdown = (props) => {
    return (
        <div id="account-dropdown" className="account-dropdown dropdown-menu dropdown-menu-right border-0 rounded-0 pb-0 mt-sm-6 mt-lg-0 pt-0">
            <Accordion defaultActiveKey="0">
                <Accordion.Collapse eventKey="0">
                    <form id="dropdown__login" className="p-g shadow">
                        <p className=" fw-bold  text-center px-2 mb-2">Log In to your account</p>
                        <div className="form-group">
                            <label htmlFor="dropdownLoginFormEmail" id="dropdownLoginFormEmailLabel" className="sr-only">Email</label>
                            <input type="email" className="form-control font-size-sm" id="dropdownLoginFormEmail" placeholder="Email" aria-labelledby="dropdownLoginFormEmailLabelheaderDropdown" />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="dropdownLoginFormPassword" id="dropdownLoginFormPasswordLabel" className="sr-only">Password</label>
                            <input type="password" className="form-control font-size-sm" id="dropdownLoginFormPassword" placeholder="Password" aria-labelledby="dropdownLoginFormPasswordLabel" />
                        </div>
                        <input type="submit" className="btn btn-primary mt-0 mb-0 w-100" disabled value="Log In" />
                        <ul className="d-flex justify-content-between mt-2 mb-1 list-unstyled">
                            <li><a href="#" className="text-underline text-primary">Forgot your password?</a></li>
                            <li><CustomToggle className="text-underline text-primary" eventKey="1">Sign Up</CustomToggle></li>
                        </ul>
                    </form>
                </Accordion.Collapse >

                <Accordion.Collapse eventKey="1">
                    <form id="dropdown__register" className="p-g shadow">
                        <p className=" fw-bold  text-center px-2 mb-2">Registration</p>
                        <div className="row">
                            <div className="form-group col-6 pr-1">
                                <label htmlFor="dropdownFormFName" id="dropdownFormFNameLabel" className="sr-only">First name</label>
                                <input type="text" className="form-control font-size-sm" id="dropdownFormFName" placeholder="First Name" aria-labelledby="dropdownFormFNameLabel" />
                            </div>
                            <div className="form-group col-6 pl-1">
                                <label htmlFor="dropdownRegisterFormLName" id="dropdownRegisterFormLNameLabel" className="sr-only">Last Name</label>
                                <input type="text" className="form-control font-size-sm" id="dropdownRegisterFormLName" placeholder="Last Name" aria-labelledby="dropdownRegisterFormLNameLabel" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="dropdownRegisterFormEmail" id="dropdownRegisterFormEmailLabel" className="sr-only">Email</label>
                                <input type="email" className="form-control font-size-sm" id="dropdownRegisterFormEmail" placeholder="Email" aria-labelledby="dropdownRegisterFormEmailLabel" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="dropdownRegisterFormPassword" id="dropdownRegisterFormPasswordLabel" className="sr-only">Password</label>
                                <input type="text" className="form-control font-size-sm" id="dropdownRegisterFormPassword" placeholder="Password" aria-labelledby="dropdownRegisterFormPasswordLabel" />
                            </div>
                        </div>
                        <div className="custom-control custom-checkbox d-flex justify-content-start font-size-sm mb-1">
                            <input type="checkbox" name="offers" value="true" className="custom-control-input" id="offers" required="" aria-required="true" aria-invalid="true" />
                            <label htmlFor="offers" className="custom-control-label">Keep me up to date on news and exclusive offers</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex justify-content-start font-size-sm">
                            <input type="checkbox" name="agreement" value="true" className="custom-control-input" id="agreement" required="" aria-required="true" aria-invalid="true" />
                            <label htmlFor="agreement" className="custom-control-label">
                                <span>By clicking here, I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></span>
                            </label>
                        </div>
                        <input type="submit" className="btn btn-primary mt-0 mb-0 w-100" value="Create Account" />
                        <div className="form-group text-center mt-2">
                            <CustomToggle className="text-underline text-primary" eventKey="0">Back to login</CustomToggle>
                        </div>
                    </form>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}

export default AccountDropdown;