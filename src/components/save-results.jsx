const SaveResults = (props) => {
    return (
        <>
            <div className="no-gutters__in-container align-items-center px-4 py-2 mb-2 bg-sm-primary-light-second text-center text-lg-start px-lg-0">
                <p className="h2">Save your quiz results!</p>
                <p>Don’t loose your results, log into your account and we save it for you!</p>
                <a href="#" id="login-on-result" data-toggle="modal" data-target="#modal-login">Log In or Sign Up</a>
            </div>
            <div className="no-gutters__in-container align-items-center px-4 py-2 mb-2 bg-sm-primary-light-second text-center text-lg-start px-lg-0">
                <p className="h2">We saved your result! 🎉</p>
                <p>You can find it in your account page!</p>
            </div>
            <div className="no-gutters__in-container align-items-center px-4 py-2 mb-2 bg-sm-primary-light-second text-center text-lg-start px-lg-0">
                <p className="h2">Save your quiz result!</p>
                <p>Don’t loose your result, we can save it on your account.</p>
                <button className="btn border-primary text-primary bg-white px-5">Yes, save my result</button>
            </div>
        </>
    );
};

export default SaveResults;

