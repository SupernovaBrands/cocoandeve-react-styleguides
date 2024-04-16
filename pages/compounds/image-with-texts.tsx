import React from 'react';
import ImageWithText from '~/compounds/ImageWithText';

const ImageWithTexts: React.FC = () => {
    return (
        <div className="container mt-4">
            <h1>Image With Text</h1>
            <ImageWithText
                src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner03_DT_2x_1000x_a2009ba0-e16e-404e-9e49-f2c1572890ab.jpg?v=1618403172"
                srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner03_DT_2x_dcddf728-2bc3-4e2b-9f01-4fb0b3366751_400x.jpg?v=1590061764">
                <h1 className="mb-1">We've spent years testing, developing and perfecting our formulas</h1>
                <p>We’re passionate about our customers, so we never use drying and damaging sulfates, phthalates or parabens, (unlike 98.9% of beauty products!). We also love our furry friends, so Coco & Eve is proudly 100% vegan and cruelty-free.</p>
            </ImageWithText>

            <ImageWithText
                reverse={true}
                src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner04_DT_2x_1000x_74c1ad4b-cb44-4123-a152-12d7495fbca4.jpg?v=1618404879"
                srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner04_DT_2x_6b055d51-178d-47e5-a6b1-c273f08a76aa_800x.jpg?v=1590061796">
                <h1 className="mb-1">We've spent years testing, developing and perfecting our formulas</h1>
                <p>We’re passionate about our customers, so we never use drying and damaging sulfates, phthalates or parabens, (unlike 98.9% of beauty products!). We also love our furry friends, so Coco & Eve is proudly 100% vegan and cruelty-free.</p>
            </ImageWithText>
        </div>
    );
};

export default ImageWithTexts;
