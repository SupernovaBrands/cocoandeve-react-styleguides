import Facebook from '~/images/icons/facebook-square.svg';
import Instagram from '~/images/icons/instagram.svg';
import Twitter from '~/images/icons/twitter-square.svg';
import Pinterest from '~/images/icons/pinterest-square.svg';

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
                    <a href="#" className="text-primary text-[30px]" aria-label="Go to to CocoandEve Twitter">
                        <Twitter className="fill-primary h-[1em]" />
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
