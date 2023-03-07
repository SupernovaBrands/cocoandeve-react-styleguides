import { Container } from "react-bootstrap";
import LaunchWaitList from "@/compounds/launch-waitlist";

const Waitlist = () => {
  return (
    <Container className="px-g mt-4">
      <h1 className="mb-1">Product Waitlist</h1>
      <div className="row">
        <LaunchWaitList
            title="Join the waitlist"
            content="Get alerted when our newest product drops, and get a free gift with your purchase. You got to be quick! sign up now cause this is definitely goinf to sell out fast!"
            policy="By signing up via text you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Msg & Data rates may apply. View Privacy Policy & ToS."
            success_msg="Thank you for subcribing to our waitlist!"
            success_content="We'll keep you posted on our Bronzing Face Drop launch!. We hope you're exited as much as we are."
        />
      </div>
    </Container>
  );
};

export default Waitlist;
