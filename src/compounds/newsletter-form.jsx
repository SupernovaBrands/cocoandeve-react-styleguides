const NewsletterForm = (props) => {
    return (
        <form>
            <div className="input-group mb-3">
                <input type="text" className="form-control mb-0" placeholder="Enter your email" aria-label="Enter your email" />
                <div className="input-group-append d-flex">
                    <button className="btn btn-primary border-top-left-radius-0 border-bottom-left-radius-0" type="button">Subscribe</button>
                </div>
            </div>
        </form>
    );  
};

export default NewsletterForm;