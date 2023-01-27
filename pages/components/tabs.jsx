import { Container } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function TabsComponents() {
	return (
		<Container className="mt-4">
            <h1>Tabs Product</h1>
			<div className="row">
                <Tabs
                    defaultActiveKey="bestsellers"
                    id="uncontrolled-tab-example"
                    className="nav nav-tabs mx-auto nav-tabs--product text-center mb-2 justify-content-center"
                >
                    <Tab eventKey="new" title="New" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>What is Lorem Ipsum?</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Tab>
                    <Tab eventKey="bestsellers" title="Bestsellers" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>Why do we use it?</h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </Tab>
                    <Tab eventKey="value-sets" title="Value Sets" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>Where can I get some?</h2>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </Tab>
                </Tabs>
			</div>

            <h1>Tabs Real Result</h1>
			<div className="row">
                <Tabs
                    defaultActiveKey="hair"
                    id="uncontrolled-tab-example"
                    className="nav nav-tabs mx-auto nav-tabs--real-results text-center mb-2 justify-content-center"
                >
                    <Tab eventKey="tan" title="Tan" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>What is Lorem Ipsum?</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Tab>
                    <Tab eventKey="hair" title="Hair" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>Why do we use it?</h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </Tab>
                    <Tab eventKey="body" title="Body" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>Where can I get some?</h2>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </Tab>
                    <Tab eventKey="all" title="All" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
                        <h2>Where can I get some?</h2>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </Tab>
                </Tabs>
			</div>
		</Container>
	);
}
