import React from 'react';
import { CheckBox, InputFormGroup, Select, Button } from "../components";

interface LaunchWaitListProps {
    className?: string;
    title: string;
    content: string;
    policy: string;
    success_msg: string;
    success_content: string;
}

const LaunchWaitList: React.FC<LaunchWaitListProps> = (props) => {
    return (
        <>
            <div className={`product-waitlist bg-yellow-light product-waitlist__form w-100 p-3 mb-3 rounded text-center ${props.className}`}>
                <h3 className="mb-1">{props.title}</h3>
                <p className="mb-3 font-size-sm">{props.content}</p>
                <form data-pdp="false" data-product-id="product-id">
                    <div className="flex flex-wrap sm:-mx-2 md:-mx-0">
                        <InputFormGroup type="email" name="email" placeholder="Enter your email" groupClass="w-full pr-2 pl-2"/>
                        <small className="w-full text-primary email-error hidden">Please enter a valid email address</small>
                    </div>
                    <span className="block mb-1 -mt-1">or</span>
                    <div className="flex flex-wrap sm:-mx-2 md:-mx-0">
                        <Select border={false} groupClass="block w-1/3 lg:w-1/4 relative pl-2 pr-0" id="select-countries" placeholder="Select Country" masking={true} options={[{maskValue: '+65', value: 'SG', label: 'Singapore'}, {maskValue: '+1', value: 'US', label: 'United States'}]} selected="SG"></Select>
                        <InputFormGroup type="text" name="phone" placeholder="Enter your phone number" groupClass="w-2/3 lg:w-3/4 pr-2 pl-2"/>
                        <small className="w-full text-primary email-error hidden">Please enter a valid phone number</small>
                    </div>
                    <div className="flex flex-wrap items-center justify-start">
                        <div className="-mt-1">
                            <CheckBox label={`I agree to <a href="#">Privacy Policy & ToS<\/a>`} id="agreement" checked={true}/>
                            <small className="w-full text-danger terms-error hidden">You have not agreed to the Privacy Policy & ToS</small>
                        </div>
                    </div>
                    <div className="flex flex-wrap px-2 sm:-mx-2 md:-mx-0">
                        <Button label="Submit form" type="submit" buttonClass="bg-primary text-white hover:bg-primary-dark w-full my-hg"></Button>
                    </div>
                    <p className="font-size-xs">{props.policy}</p>
                </form>
            </div>
            <div className="product-waitlist product-waitlist--launch product-waitlist__submitted w-100 p-3 mb-3 rounded text-center hidden">
                <h3 className="mx-4 mx-lg-5">{props.success_msg}</h3>
                <p className="font-size-sm mb-0">{props.success_content}</p>
            </div>
        </>
    );
};

export default LaunchWaitList;
