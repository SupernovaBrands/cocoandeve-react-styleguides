
import BrandLogo from '@/components/CELogo';

const Logo = (props: any) => {
	return (
        <>
            <div className='mt-4'>
                <h1>Logo</h1>
            </div>

            <nav className="relative flex flex-wrap items-center content-between py-0 px-4">
                <div className="container justify-center items-center flex ">
                    <a href="#" className="mx-auto py-1 inline-block lg:[flex-basis:15%]">
                        <BrandLogo />
                    </a>
                </div>
            </nav>
        </>
	);
};

export default Logo;