import React from 'react';
import Breadcrumb from '@/components/Breadrumb';

interface BreadcrumbsProps {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
    const data = [
        {
            link: '#',
            title: 'Blog',
			className: '',
        },
        {
            link: null,
            title: 'The 5 Rules Of Hair Masking',
			className: '',
        },
    ];

    return (
        <div className="container py-4">
            <Breadcrumb data={data}></Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;
