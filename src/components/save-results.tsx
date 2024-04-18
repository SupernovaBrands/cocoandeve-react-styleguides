import Button from "./Button";

const SaveResults = (props: any) => {
    return (
        <>
            <div className="sm:-mx-2 lg:-mx-0 sm:bg-primary-light lg:bg-transparent items-center px-4 py-2 mb-2 bg-sm-primary-light-second text-center lg:text-left lg:px-0">
                <p className="h2 mb-1">Save your quiz results!</p>
                <p className="mb-1">Don’t loose your results, log into your account and we save it for you!</p>
                <a href="#" id="login-on-result" data-toggle="modal" data-target="#modal-login">Log In or Sign Up</a>
            </div>
            <div className="sm:-mx-2 lg:-mx-0 sm:bg-primary-light lg:bg-transparent items-center px-4 py-2 mb-2 bg-sm-primary-light-second text-center lg:text-left lg:px-0">
                <p className="h2 mb-1">We saved your result! 🎉</p>
                <p className="mb-1">You can find it in your account page!</p>
            </div>
            <div className="sm:-mx-2 lg:-mx-0 sm:bg-primary-light lg:bg-transparent items-center px-4 py-2 mb-2 bg-sm-primary-light-second text-center lg:text-left lg:px-0">
                <p className="h2 mb-1">Save your quiz result!</p>
                <p className="mb-1">Don’t loose your result, we can save it on your account.</p>
                <Button lg={false} buttonClass="border-primary text-primary bg-white px-5 py-1 mt-1 font-bold">Yes, save my result</Button>
            </div>
        </>
    );
};

export default SaveResults;
