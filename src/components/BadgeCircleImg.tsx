import React, { ReactNode } from 'react';

type BadgeCircleImageProps = {
  className?: string;
  children?: ReactNode;
}

const BadgeCircleImage: React.FC<BadgeCircleImageProps> = (props) => {
  return (
    <picture className={`circle-badge position-absolute rounded-circle bg-primary d-flex p-1 ${props.className}`}>
      {props.children}
    </picture>
  );
};

export default BadgeCircleImage;
