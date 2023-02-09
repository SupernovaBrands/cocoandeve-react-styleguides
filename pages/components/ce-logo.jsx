
import BrandLogo from '@/components/CELogo';
import Cart from '../../src/images/icons/cart.svg';
import { Container } from "react-bootstrap";

const Logo = (props) => {
	return (
        <>
            <Container className='mt-4'>
                <h1>Logo</h1>
            </Container>

            <nav className="navbar">
                <div className="container">
                    <a href="#" className="navbar-brand mx-auto">
                        <BrandLogo />
                    </a>
                </div>
            </nav>
            <div class="container">
                <h3>Logo with menu</h3>
            </div>
            <header class="navbar navbar-expand-lg flex-lg-wrap">
                <nav class="container px-0 px-lg-g">
                    <button class="navbar-toggler col-2 border-0" type="button">
                        <span class="d-block"></span>
                    </button>

                    <ul class="navbar-nav align-items-center d-none d-lg-flex">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>

                    <a href="#" class="navbar-brand mx-0"><BrandLogo /></a>

                    <ul class="navbar-nav d-none d-lg-flex justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>

                    <a href="#" class="nav-link col-2 d-flex justify-content-end px-0 d-lg-none font-size-lg">
                        <Cart className="svg font-size-lg mr-25" />
                    </a>
                </nav>
            </header>
        </>
	);
};

export default Logo;