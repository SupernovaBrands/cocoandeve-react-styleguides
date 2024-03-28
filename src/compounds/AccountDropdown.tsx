import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';


const AccountDropdown = (props) => {
    const { openAccountBox, toggleAccountDropdown } = props;
    const [activeFrame, setActiveFrame] = useState(false);
    return (
        <div id="account-dropdown" className={`w-[330px] top-[3.5em] right-0 left-auto border-0 rounded-0 pb-0 mt-sm-6 mt-lg-0 pt-0 absolute z-[1030] float-none  ${openAccountBox ? 'block' : 'hidden'}`}>
                {activeFrame && (
                    <div className='flex'>
                        <form id="dropdown__login" className="p-g [box-shadow:0_0.5rem_1rem_rgba(0,0,0,0.15)!important] bg-white">
                            <p className="font-bold text-center px-2 mb-2">Log In to your account</p>
                            <div className="mb-4">
                                <label htmlFor="dropdownLoginFormEmail" id="dropdownLoginFormEmailLabel" className="sr-only">Email</label>
                                <input type="email" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800  rounded" id="dropdownLoginFormEmail" placeholder="Email" aria-labelledby="dropdownLoginFormEmailLabelheaderDropdown" />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="dropdownLoginFormPassword" id="dropdownLoginFormPasswordLabel" className="sr-only">Password</label>
                                <input type="password" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800 border border-gray-200 rounded" id="dropdownLoginFormPassword" placeholder="Password" aria-labelledby="dropdownLoginFormPasswordLabel" />
                            </div>
                            <input type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 mt-0 mb-0 w-full" disabled value="Log In" />
                            <ul className="d-flex justify-content-between mt-2 mb-1 list-unstyled">
                                <li><a href="#" className="text-underline text-primary">Forgot your password?</a></li>
                                <li><a href="javascript:void(0);" className="underline text-primary" onClick={() => setActiveFrame(!activeFrame)}>Sign Up</a></li>
                            </ul>
                        </form>
                    </div>
                )}
                {!activeFrame && (
                    <div className={`flex `}>
                        <form id="dropdown__register" className="p-g [box-shadow:0_0.5rem_1rem_rgba(0,0,0,0.15)!important] bg-white">
                            <p className=" font-bold  text-center px-2 mb-2">Registration</p>
                            <div className="flex flex-wrap">
                                <div className="form-group w-1/2 pr-1 mb-2">
                                    <label htmlFor="dropdownFormFName" id="dropdownFormFNameLabel" className="sr-only">First name</label>
                                    <input type="text" className="block mb-0 appearance-none w-full py-1 px-2 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownFormFName" placeholder="First Name" aria-labelledby="dropdownFormFNameLabel" />
                                </div>
                                <div className="form-group w-1/2 pl-1 mb-2">
                                    <label htmlFor="dropdownRegisterFormLName" id="dropdownRegisterFormLNameLabel" className="sr-only">Last Name</label>
                                    <input type="text" className="block mb-0 appearance-none w-full py-1 px-2 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormLName" placeholder="Last Name" aria-labelledby="dropdownRegisterFormLNameLabel" />
                                </div>
                                <div className="form-group w-full mb-2">
                                    <label htmlFor="dropdownRegisterFormEmail" id="dropdownRegisterFormEmailLabel" className="sr-only">Email</label>
                                    <input type="email" className="block mb-0 appearance-none w-full py-1 px-2 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormEmail" placeholder="Email" aria-labelledby="dropdownRegisterFormEmailLabel" />
                                </div>
                                <div className="form-group w-full mb-2">
                                    <label htmlFor="dropdownRegisterFormPassword" id="dropdownRegisterFormPasswordLabel" className="sr-only">Password</label>
                                    <input type="text" className="block mb-0 appearance-none w-full py-1 px-2 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormPassword" placeholder="Password" aria-labelledby="dropdownRegisterFormPasswordLabel" />
                                </div>
                            </div>
                            <div className="custom-control custom-checkbox d-flex justify-content-start font-size-sm mb-1">
                                <input type="checkbox" name="offers" value="true" className="custom-control-input" id="offers" required={true} aria-required="true" aria-invalid="true" />
                                <label htmlFor="offers" className="custom-control-label">Keep me up to date on news and exclusive offers</label>
                            </div>
                            <div className="custom-control custom-checkbox d-flex justify-content-start font-size-sm">
                                <input type="checkbox" name="agreement" value="true" className="custom-control-input" id="agreement" required={true} aria-required="true" aria-invalid="true" />
                                <label htmlFor="agreement" className="custom-control-label">
                                    <span>By clicking here, I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></span>
                                </label>
                            </div>
                            <input type="submit" className="btn btn-primary mt-0 mb-0 w-100" value="Create Account" />
                            <div className="form-group text-center mt-2">
                                <a href="javascript:void(0);" className="underline text-primary" onClick={() => setActiveFrame(!activeFrame)}>Log In</a>
                            </div>
                        </form>
                    </div>
                )}
        </div>
    )
}

export default AccountDropdown;