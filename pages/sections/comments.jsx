import { Container } from "react-bootstrap";
import Comments from "@/sections/Comments";

const CommentSection = () => {

    return (
		<>
            <Container className="mt-4">
                <h1>Comments</h1>
                <Comments />
            </Container>
		</>
	);
}

export default CommentSection;