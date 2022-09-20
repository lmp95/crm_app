import React from 'react';
import PropTypes from 'prop-types';

function Breadcrumb({ items }: { items: string[] }) {
    return (
        <div className='breadcrumb'>
            {
                items.map((item, i) => <li key={i}>{item}</li>)
            }
        </div>
    );
}

Breadcrumb.prototype = {
    items: PropTypes.array,
};

export default Breadcrumb;