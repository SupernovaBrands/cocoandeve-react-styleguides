import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Toggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="fw-bold text-primary"
    >
        {children}
        &#x25bc;
    </a>
));

const DropdownCustom = (props) => {
    const [activeCountry, setActive] = useState('USA');
    return (
        <Dropdown>
            <Dropdown.Toggle as={Toggle} id="dropdown-basic">USA (USD)</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" className='py-1'>United Kingdom (GBP)</Dropdown.Item>
                <Dropdown.Item href="#/action-2" className='py-1' active={activeCountry === 'USA'}>USA (USD)</Dropdown.Item>
                <Dropdown.Item href="#/action-3" className='py-1'>Australia (AUD)</Dropdown.Item>
                <Dropdown.Item href="#/action-2" className='py-1'>Canada (CAD)</Dropdown.Item>
                <Dropdown.Item href="#/action-2" className='py-1'>Europe (EUR)</Dropdown.Item>
                <Dropdown.Item href="#/action-2" className='py-1'>Rest of the World (USD)</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownCustom;