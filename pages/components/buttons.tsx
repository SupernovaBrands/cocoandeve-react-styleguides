import Search from '~/images/icons/search.svg';
import ChevronDown from '~/images/icons/chevron-down.svg';
import Spin from '~/images/icons/spin.svg';
import { Button } from '~/components/index';

export default function Buttons() {
	return (
		<div className="container my-4">
			<h1 className="mb-1">Buttons</h1>
			<Button label="Button" lg={false} buttonClass="bg-primary hover:bg-primary-darken border-transparent text-white">Button</Button>
			<br />
			<Button label="Button" lg={false} buttonClass="bg-transparent hover:bg-primary hover:text-white border-primary text-primary">Button</Button>
			<br />
			<Button label="Button a tag" lg={false} buttonClass="bg-primary hover:bg-primary-darken border-transparent text-white">Button a tag</Button>
			<br />
			<Button label="Button With icon" lg={false} buttonClass="bg-primary hover:bg-primary-darken border-transparent text-white inline-flex items-center mb-2">
				Button With icon <Search className="h-[12px] ml-[5px]" fill="white"/>
			</Button>
			<br />
			<Button label="Shop" lg={false} buttonClass="bg-primary hover:bg-primary-darken border-transparent text-white inline-flex items-center mb-2">
				Shop <ChevronDown className="h-[12px] ml-[5px]" fill="white"/>
			</Button>
			<br />
			<Button label="Button Large" buttonClass="bg-primary hover:bg-primary-darken border-primary text-white">Button Large</Button>
			<br />
			<Button buttonClass="bg-primary hover:bg-primary-darken border-transparent">
				<Spin className="animate-spin h-[16px] w-[16px] text-white" fill="white"/>
			</Button>
			<br />
			<Button label="Button Large" buttonClass="bg-transparent hover:bg-primary hover:text-white border-primary text-primary">Button Large</Button>
			<br />
			<Button label="Button Block" lg={false} buttonClass="bg-primary hover:bg-primary-darken w-full border-transparent text-white">Button Block</Button>
			<br />
			<Button label="Button Block" lg={false} buttonClass="bg-transparent hover:bg-primary hover:text-white w-full border-primary text-primary">Button Block</Button>
			<br />
			<Button label="Button Large Block" buttonClass="bg-primary hover:bg-primary-darken w-full border-transparent text-white">Button Large Block</Button>
			<br />
			<Button label="Button Large Block" buttonClass="bg-transparent hover:bg-primary hover:text-white w-full border-primary text-primary">Button Large Block</Button>
		</div>
	);
}
