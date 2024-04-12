import React from 'react';

interface BulletProps {
    data: { className: string; onClick:  React.MouseEventHandler;}[];
}

const Bullet: React.FC<BulletProps> = ({ data }) => {
    return (
        <ol className="flex flex-row absolute right-0 bottom-0 left-0 justify-center">
            {data.map((rows: {onClick:  React.MouseEventHandler; className: string}, index:number) => (
                <li key={`${index}-bullets`} onClick={rows.onClick} className={rows.className ?? `size-12 bg-primary rounded-full cursor-pointer ${index !== data.length - 1 ? 'mx-[3px]' : ''}`}></li>
            ))}
        </ol>
    );
};

export default Bullet;
