import React, { useState, ChangeEvent } from 'react';

interface RadioProps {
    id: string;
    label: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    checked?: boolean;
    labelClass?: string;
    value?: string;
}

const RadioOption: React.FC<RadioProps> = ({ id, label, onChange, name, checked, labelClass, value }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    const onChangeClick = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if (typeof onChange === 'function') {
            onChange(e);
        }
    };

    return (
        <label htmlFor={id} className={`${labelClass ? labelClass : 'flex justify-content-center my-1 relative pl-3'}`}>
            <input type="radio" name={name} className="hidden" id={id} onChange={onChangeClick} defaultValue={value}/>
            <span
                dangerouslySetInnerHTML={{ __html: label }}
                className={`after:content[''] after:size-[18px] after:bg-white after:absolute after:rounded-full after:border after:top-0 after:left-0 after:z-[0] before:z-[2] before:top-[3px] before:left-[3px] before:content-[''] before:size-[12px] before:absolute before:left-0 before:inline-block before:rounded-full before:rounded`}
            ></span>
        </label>
    );
};

export default RadioOption;
