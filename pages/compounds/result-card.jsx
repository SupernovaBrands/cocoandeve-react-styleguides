import { Container } from "react-bootstrap";
import ResultCard from "@/compounds/result-card";

const ResultCards = () => {
  return (
    <Container className="mt-4">
      <h1>Result Card</h1>
      <div className="row">
        <ResultCard
          badge="body"
          title="Bali Bronzing Foam (Dark)"
          author="@kaylaazjones"
          comment="I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼"
        />
      </div>
    </Container>
  );
};

export default ResultCards;
