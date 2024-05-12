import React, { useState, ChangeEvent } from 'react';

interface CheckBoxProps {
    id: string;
    label?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    checked?: boolean;
    labelClass?: string;
    value?: string;
    children?: any;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, label, onChange, name, checked, labelClass, value, children }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    const onChangeClick = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
        if (typeof onChange === 'function') {
            onChange(e);
        }
    };

    return (
        <label htmlFor={id} className={`${labelClass ? labelClass : 'flex justify-content-center my-1 relative pl-3'}`}>
            <input type="checkbox" checked={isChecked} name={name} className="hidden" id={id} onChange={onChangeClick} defaultValue={value}/>
            { label && <span
                dangerouslySetInnerHTML={{ __html: label }}
                className={`before:content-[''] before:size-[17.5px] before:absolute before:left-0 before:border before:inline-block before:rounded-h before:mr-1 ${isChecked ? 'before:bg-checkbox-checked before:border-primary' : 'before:bg-checkbox-unchecked'}`}
            ></span> }
            {!label && <span className={`before:content-[''] before:size-[17.5px] before:absolute before:left-0 before:border before:inline-block before:rounded-h before:mr-1 ${isChecked ? 'before:bg-checkbox-checked before:border-primary' : 'before:bg-checkbox-unchecked'}`}>{children}</span>}
        </label>
    );
};

export default CheckBox;
