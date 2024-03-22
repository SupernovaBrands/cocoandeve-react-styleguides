import React, { ChangeEvent } from 'react';
import { Placeholder } from 'react-bootstrap';

interface TextAreaProps {
    id: string;
    rows?: number;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    groupClass?: string;
    placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ id, placeholder, rows, onChange, groupClass }) => {
    return (
        <label htmlFor={id} className={groupClass ?? 'w-full'}>
			<textarea
                id={id}
                className="block appearance-none w-full py-1 px-2 mb-2 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0"
                placeholder={placeholder}
                rows={rows ?? 7}
                onChange={onChange}
            ></textarea>
		</label>
    );
}

export default TextArea;
