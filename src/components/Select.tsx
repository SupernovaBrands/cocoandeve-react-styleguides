import React, { ChangeEvent } from 'react';

interface Option {
    maskValue?: string | '';
    value: string | number;
    label: string;
}

interface SelectProps {
    id?: string;
    options: Option[];
    selected?: string | number;
    groupClass?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    name?: string;
    placeholder: string;
    masking?: boolean;
    border?: boolean;
}

const Select: React.FC<SelectProps> = ({ id, options, selected, groupClass, onChange, disabled, placeholder, name, masking, border }) => {
    return (
        <label htmlFor={id} className={groupClass ?? 'block w-full lg:w-full pr-2 pl-2'}>
            { masking && (<span className={`block w-[85%] absolute appearance-none bg-select-arrow py-[10px] px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 ${border ? 'border' : ''} rounded outline-none mb-0`}>{options[0].maskValue}</span>) }
		    <select
                id={id}
                defaultValue={selected}
                onChange={onChange}
                className={`${masking ? 'opacity-0' : ''} appearance-none bg-select-arrow w-full py-[10px] px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 ${border ? 'border' : ''} rounded outline-none mb-0`}
                disabled={disabled}
                name={name}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={`${index}-${option.value}`} value={option.value}>{option.label}</option>
                ))}
			</select>
		</label>
    );
}

export default Select;
