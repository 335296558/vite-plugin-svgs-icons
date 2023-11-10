import React, { useEffect } from 'react';

const Icon = ({ name = '', size = 0, color = '', className = '' }) => {
    useEffect(() => {
        const icons = Array.from(document.querySelectorAll('[id^="icona-"]'));
        icons.forEach((icon) => {
            icon.parentNode.removeChild(icon);
        });
    }, []);

    let domAttr = {
        dangerouslySetInnerHTML: {
            __html: <use href="#icona-${name}" />,
        },
        fill: color || '#718190',
        'aria-hidden': true,
    };

    let width = size;
    let height = size;

    if (typeof size == 'object') {
        width = size[0];
        height = size[1] || size[0];
    }

    if (size) {
        domAttr.width = size;
        domAttr.height = size;
    }
    if (width) {
        domAttr.width = width;
    }
    if (height) {
        domAttr.height = height;
    }
    if (className) {
        domAttr.className = className;
    }

    return React.createElement(
        'svg',
        { ...domAttr },
        React.createElement('use', { href: `#icona-${name}` })
    )
};

export default Icon;
