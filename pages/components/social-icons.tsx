import Facebook from '../../src/images/icons/facebook-square.svg';
import Instagram from '../../src/images/icons/instagram.svg';
import Pinterest from '../../src/images/icons/pinterest-square.svg';

export default function Icons() {
	return (
		<div className="container">
            <ul className="list-none text-center mb-2 mt-2">
                <li className="inline-block mr-[0.5rem]">
                    <a href="#" className="text-primary text-[30px]" aria-label="Go to to CocoandEve Instagram">
                        <Instagram className="fill-primary h-[1em]" />
                    </a>
                </li>
                <li className="inline-block mr-[0.5rem]">
                    <a href="#" className="text-primary text-[30px]" aria-label="Go to to CocoandEve Facebook">
                        <Facebook className="fill-primary h-[1em]" />
                    </a>
                </li>
                <li className="inline-block mr-[0.5rem]">
                    <a href="#" className="text-primary text-[30px]" aria-label="Go to to CocoandEve Pinterest">
                        <Pinterest className="fill-primary h-[1em]" />
                    </a>
                </li>
            </ul>
        </div>
	);
}
