import React, { ChangeEvent } from 'react';

interface InputFormGroupProps {
    id?: string;
    type: string;
    name?: string;
    placeholder?: string;
    groupClass?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    value?: string;
}

const InputFormGroup: React.FC<InputFormGroupProps> = ({ id, type, placeholder, groupClass, onChange, disabled, name, value }) => {
    return (
        <div className={groupClass ?? 'w-full lg:w-1/2 pr-2 pl-2'}>
            <input
                className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0"
                type={type}
                name={name}
                placeholder={placeholder}
                id={id}
                defaultValue={value}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
};

export default InputFormGroup;
