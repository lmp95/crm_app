import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineRight } from 'react-icons/ai';

function Breadcrumb({ items }: { items: string[] }) {
    return (
        <div className='breadcrumb'>
            {
                items.map((item, i) => <div key={i}><li>{item}</li><span><AiOutlineRight /></span></div>)
            }
        </div>
    );
}

Breadcrumb.prototype = {
    items: PropTypes.array,
};

export default Breadcrumb;