import React, { ChangeEvent, KeyboardEvent } from 'react';

interface InputFormGroupProps {
    id?: string;
    type: string;
    name?: string;
    placeholder?: string;
    groupClass?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    value?: string;
    inputClass?: string;
    onKeyUp?: any
}

const InputFormGroup: React.FC<InputFormGroupProps> = ({ id, type, placeholder, groupClass, onChange, disabled, name, value, inputClass, onKeyUp }) => {
    return (
        <div className={groupClass ?? 'w-full lg:w-1/2 pr-2 pl-2'}>
            <input
                className={`block appearance-none w-full py-g pl-2 pr-0 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded-h outline-none mb-0 ${inputClass}`}
                type={type}
                name={name}
                placeholder={placeholder}
                id={id}
                defaultValue={value}
                disabled={disabled}
                onChange={onChange}
                onKeyUp={onKeyUp}
            ></input>
        </div>
    );
};

export default InputFormGroup;
