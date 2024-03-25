import React, { useState, ChangeEvent } from 'react';
import SearchIcon from '../../src/images/icons/search.svg';

interface InputSearchProps {
    id: string;
    placeHolder: string;
    textButton: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ id, placeHolder, textButton, value, onChange }) => {
    const [searchText, setSearchText] = useState<string | undefined>(value);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        onChange(e);
    }

    return (
        <div className="relative flex items-stretch w-full">
            <span className="absolute top-[25%] left-1">
                <SearchIcon className="svg w-1em fill-primary"/>
            </span>
            <input type="text"
                defaultValue={searchText}
                className="block appearance-none w-full py-1 pl-3 pr-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded rounded-full outline-none mb-0"
                onChange={onChangeSearch}
                id={id} placeholder={placeHolder} />
            {searchText !== undefined && searchText !== null && searchText !== "" && (
            <div className="absolute right-0">
                <button className="rounded-full text-white inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-primary hover:bg-primary-dark" type="submit">{textButton}</button>
            </div>
            )}
        </div>
    );
};

export default InputSearch;
