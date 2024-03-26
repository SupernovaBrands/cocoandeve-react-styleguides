import React from 'react';
import { InputFormGroup, InputSearch, Select, TextArea, CheckBox, Button } from '@/components/index';

const Forms: React.FC = () => {
    const onSearchChange = (e) => {
        console.log(e, 'on Search Change Page');
    }

    return (
        <div className="mobile-wrapper container">
            <div className="mt-4">
                <h1>Forms</h1>
                <div className="row mt-4">
                    <div className="w-full mb-3">
                        <InputSearch id="searchInput" placeHolder="Search" textButton="Search" onChange={onSearchChange}></InputSearch>
                    </div>
                </div>
                <div className="flex flew-wrap">
                    <div className="w-full">
                        <form>
                            <div className="flex flew-wrap -mx-2 flex-col lg:flex-row">
                                <InputFormGroup type="text" placeholder="Name" groupClass="w-full lg:w-1/2 pr-2 pl-2"></InputFormGroup>
                                <InputFormGroup type="email" placeholder="Email*" groupClass="w-full lg:w-1/2 pr-2 pl-2"></InputFormGroup>
                            </div>
                            <div className="flex flew-wrap -mx-2 flex-col lg:flex-row">
                                <InputFormGroup type="text" placeholder="Name disabled" groupClass="w-full lg:w-1/2 pr-2 pl-2" disabled={true}></InputFormGroup>
                                <InputFormGroup type="email" placeholder="Email disabled" groupClass="w-full lg:w-1/2 pr-2 pl-2" disabled={true}></InputFormGroup>
                            </div>
                            <div className="flex flew-wrap -mx-2 flex-col lg:flex-row">
                                <div className="w-full lg:w-1/2">
                                    <Select id="select-1" border={true} placeholder="Select Option" options={[{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]} selected="2"></Select>
                                </div>
                                <div className="w-full lg:w-1/2 flex-col lg:flex-row">
                                    <Select id="select-1" border={true} placeholder="Select Option" options={[{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]} selected="1" disabled={true}></Select>
                                </div>
                            </div>
                            <div className="flex flew-wrap flex-col lg:flex-row">
                                <div className="w-full">
                                    <TextArea id="text-area-1" rows={7} placeholder="Your Comment"></TextArea>
                                </div>
                            </div>
                            <div className="flex flew-wrap lg:justify-center">
                                <CheckBox label={`I agree to <a href=\"#\">Privacy Policy & ToS<\/a>`} id="agreement" checked={true}/>
                            </div>
                            <div className="flex flew-wrap">
                                <div className="w-full mt-1">
                                    <Button label="Submit form" type="submit"></Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forms;
