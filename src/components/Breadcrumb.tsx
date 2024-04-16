import React from 'react';

interface BreadcrumbProps {
    data: { link: string | null; title: string | null; className: string | null;}[];
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ data, className }) => {
    return (
        <ol className={className ?? 'list-reset flex'}>
            {data.map((bread: { link: string; title: string; className: string }, index: number) => (
                <React.Fragment key={index}>
                    <li>
                        {bread.link && (
                            <a className={`${bread.className ?? ''} text-body cursor-pointer hover:text-primary underline`} href={bread.link}>
                                {bread.title}
                            </a>
                        )}
                        {!bread.link && bread.title}
                    </li>
                    {index < data.length - 1 && <li className="text-body mx-hg">/</li>}
                </React.Fragment>
            ))}
        </ol>
    );
};

export default Breadcrumb;
