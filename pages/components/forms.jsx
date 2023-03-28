import { Container } from "react-bootstrap";
import Search from '../../src/images/icons/search.svg';

const Forms = (props) => {
	return (
        <div className="mobile-wrapper">
            <Container className="mt-4">
                <h1>Forms</h1>
                <div className="row mt-4">
                    <div className="col mb-3">
                        <div className="search-box input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text search-box__icon">
                                    <Search className="svg svg--current-color" />
                                </span>
                            </div>
                            <input type="text" className="form-control mb-0" id="exampleSearch" placeholder="Search" />
                            <div className="input-group-append">
                                <a className="input-group-text search-box__close align-items-center h-100" href="#" role="button">
                                </a>
                            </div>
                            <div className="input-group-append">
                                <button className="search-box-btn btn btn-primary" type="submit">Search</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form>
                            <div className="row">
                                <div className="form-group col-lg-6 ">
                                    <input className="form-control" type="email" placeholder="Name" required />
                                </div>
                                <div className="form-group col-lg-6">
                                    <input className="form-control" type="email" placeholder="Email*" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-6">
                                    <input className="form-control" type="text" placeholder="Name disabled" disabled />
                                </div>
                                <div className="form-group col-lg-6">
                                    <input className="form-control" type="email" placeholder="Email disabled" value="Email disabled with value" disabled />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-6">
                                    <select className="custom-select p-g">
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                                <div className="form-group col-lg-6">
                                    <select className="custom-select p-g" disabled>
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col">
                                    <textarea className="form-control" placeholder="Your comment" rows="7" required></textarea>
                                </div>
                            </div>

                            <div className="row">
                                <div className="custom-control custom-checkbox col d-flex justify-content-center my-1">
                                    <input type="checkbox" name="tos" className="custom-control-input" id="agreement" />
                                    <label className="custom-control-label font-size-sm" for="agreement">I agree to <a href="#">Privacy Policy & ToS</a></label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col">
                                    <button className="btn btn-lg btn-primary" type="submit">Submit form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
	);
};

export default Forms;