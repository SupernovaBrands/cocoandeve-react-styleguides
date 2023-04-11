import { useState } from 'react';
import Footer from '@/sections/Footer';
import { Container } from "react-bootstrap";

const FooterSection = () => {
    return (
        <>
            <Container className="mt-4">
                <h1>Footer</h1>
            </Container>
            <Footer />
        </>
    );
}

export default FooterSection;