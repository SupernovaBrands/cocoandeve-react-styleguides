import Footer from '~/sections/Footer';
import { shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';

const FooterSection = () => {
    return (
        <>
            <div className="container mt-4">
                <h1>Footer</h1>
            </div>
            <Footer
                aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu}
            />
        </>
    );
}

export default FooterSection;