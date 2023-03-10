import { Container } from "react-bootstrap";
import Search from '../../src/images/icons/search.svg';

const Forms = (props) => {
	return (
        <div className="mobile-wrapper">
            <Container className="mt-4">
                <h1>Forms</h1>
                <div class="row mt-4">
                    <div class="col mb-3">
                        <div class="search-box input-group input-group-sm">
                            <div class="input-group-prepend">
                                <span class="input-group-text search-box__icon">
                                    <Search className="svg svg--current-color" />
                                </span>
                            </div>
                            <input type="text" class="form-control mb-0" id="exampleSearch" placeholder="Search" />
                            <div class="input-group-append">
                                <a class="input-group-text search-box__close align-items-center h-100" href="#" role="button">
                                </a>
                            </div>
                            <div class="input-group-append">
                                <button class="search-box-btn btn btn-primary" type="submit">Search</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <form>
                            <div class="row">
                                <div class="form-group col-lg-6 ">
                                    <input class="form-control" type="email" placeholder="Name" required />
                                </div>
                                <div class="form-group col-lg-6">
                                    <input class="form-control" type="email" placeholder="Email*" required />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-lg-6">
                                    <input class="form-control" type="text" placeholder="Name disabled" disabled />
                                </div>
                                <div class="form-group col-lg-6">
                                    <input class="form-control" type="email" placeholder="Email disabled" value="Email disabled with value" disabled />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-lg-6">
                                    <select class="custom-select p-g">
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                                <div class="form-group col-lg-6">
                                    <select class="custom-select p-g" disabled>
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col">
                                    <textarea class="form-control" placeholder="Your comment" rows="7" required></textarea>
                                </div>
                            </div>

                            <div class="row">
                                <div class="custom-control custom-checkbox col d-flex justify-content-center my-1">
                                    <input type="checkbox" name="tos" class="custom-control-input" id="agreement" />
                                    <label class="custom-control-label font-size-sm" for="agreement">I agree to <a href="#">Privacy Policy & ToS</a></label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group col">
                                    <button class="btn btn-lg btn-primary" type="submit">Submit form</button>
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