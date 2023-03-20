import { Container } from "react-bootstrap";
import PDPBanner from "@/compounds/product-banner";

const ProductBanner = () => {
  return (
    <div>
      <Container className="container mt-4 mb-2 px-g">
        <h1>Product Banner</h1>
      </Container>
      <PDPBanner
        background="bg-yellow-light"
				src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_828x.jpg?v=1585822408"
				srcset="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_1440x.jpg?v=1585822408">
				<h2 className="h1 mb-2 mb-lg-4">Which Sunny Honey shade is right for me?</h2>
        <h4 className="fw-normal mb-2 mb-lg-4"><b>Medium</b><br /> Gives skin a subtle glow. Great for lighter skin tones!</h4>
        <h4 className="fw-normal mb-2 mb-lg-4"><b>Dark</b><br /> For a back from vacay bronze. Ideal for medium skin tones!</h4>
        <h4 className="fw-normal mb-0"><b>Ultra Dark</b><br /> A deep, rich tan. For deeper skin tones!</h4>
			</PDPBanner>
      <PDPBanner
        background="bg-yellow-light"
        textTop={true}
        paddingTop="pt-lg-4"
				src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_828x.jpg?v=1585822408"
				srcset="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_1440x.jpg?v=1585822408">
				<h2 className="h1 mb-2 mb-lg-4">Get the perfect dewy glow!</h2>
        <ul className="list-check mb-0 h4 fw-normal">
          <li>Even, natural golden tan</li>
          <li>Hydrated, glowing, healthy skin</li>
        </ul>
			</PDPBanner>
      <PDPBanner
        background="bg-yellow-light"
        reverse={true}
				src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Image_6287d290-e6ad-4665-be74-25e26ddfd551_750x.png?v=1585822408"
				srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Image_6287d290-e6ad-4665-be74-25e26ddfd551_1440x.png?v=1601282221">
				<h2 className="h1 mb-2 mb-lg-4">Drop & Glow</h2>
        <h4 className="fw-normal mb-0">Our ultra hydrating water-based face tanner formula are easily mixable with your daily skincare routine.<br /><br />Just drop it
        into your day or night moisturizer (or use as-is for a more instant bronze) and wait for your tropical glow to kick-in.</h4>
			</PDPBanner>
      <PDPBanner
        background="bg-yellow-light"
				src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Malii_web_750x.jpg?v=1618816719"
				srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Malii_web_1440x.jpg?v=1618816719">
				<h2 className="h1 mb-2 mb-lg-4">Get glowy fresh skin</h2>
        <ul className="list-check mb-0 h4 fw-normal">
          <li>Water based formulas perfectly mix together for better absorption.</li>
          <li>Hyaluronic Acid leaves your skin naturally radiant and makes your tan last longer.</li>
          <li>Peptides in the cream speed up the tanning effect on the skin.</li>
          <li>Tasmanian water boosts glow by countering dulling pollution & toxins.</li>
          <li>Free from tan fading ingredients.</li>
        </ul>
			</PDPBanner>
      <PDPBanner
        background="bg-yellow-light"
        textTop={true}
        paddingTop="pt-4"
				src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_828x.jpg?v=1585822408"
				srcset="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_1440x.jpg?v=1585822408">
				<h2 className="h1 mb-2 mb-lg-4">Sunless tan on the go!</h2>
        <ul className="list-check mb-0 h4 fw-normal">
          <li>No streaks</li>
          <li>No bad smells</li>
          <li>No stress</li>
        </ul>
			</PDPBanner>
      <PDPBanner
        background="bg-primary-light"
        reverse={true}
				src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/cst_banner_1_750x.png?v=1597838932"
				srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/cst_banner_1_1440x.png?v=1597838932">
				<h2 className="h1 mb-2">Yes, you need a scalp scrub.</h2>
        <h4 className="mb-4">(We’d be lying if we said you didn’t.)</h4>
        <h4 className="fw-normal">The story doesn’t end with a flake-free scalp. Our pre-shampoo scalp treatment promotes hair growth while giving your
        hair the boost it didn’t know it had! Expect bouncier, thicker, super-clean hair, and a healthy scalp to go with it.</h4>
			</PDPBanner>
      <PDPBanner
        background="bg-blue text-white"
        reverse={true}
				src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBS_Benefits_750x.jpg?v=1586339083"
				srcset="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBS_Benefits_1440x.jpg?v=1586339083">
				<h2 className="h1 mb-2 mb-lg-4">The only sugar that’s good for you.</h2>
        <h4 className="fw-normal">Ramp up your skincare game with our triple exfoliating scrub. From achieving a perfect tan to firmer, youthful skin, our
        scrub is packed with the right ingredients that would give your skin the boost it needs without the crash.</h4>
			</PDPBanner>
      <PDPBanner
        background="bg-purple-light"
        reverse={true}
				src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBB_Benefits_750x.jpg?v=1586330879"
				srcset="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBB_Benefits_1440x.jpg?v=1586330879">
				<h2 className="h1 mb-2 mb-lg-4">Are you ready for your Bali Booty Call?</h2>
        <div className="bod-bundle-steps d-flex flex-wrap">
          <img className="mb-2 mb-lg-3" src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBB_Benefits_Prep.png?v=1586330980" />
          <h4 className="mb-2 mb-lg-3">
            <b>Prep:</b>
            <span className="font-size-sm fw-normal d-block mt-1">Gently exfoliate dead cells & hydrate skin with volcanic pumice, & coconut oil.</span>
          </h4>
          <img className="mb-2 mb-lg-3" src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBB_Benefits_Set.png?v=1586330980" />
          <h4 className="mb-2 mb-lg-3">
            <b>Set:</b>
            <span className="font-size-sm fw-normal d-block mt-1">Deeply cleanse & even out skin tone with Volcanic clay, green coffee and algae.</span>
          </h4>
          <img className="mb-2 mb-lg-3" src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/PP_GF_BBB_Benefits_Glow.png?v=1586330980" />
          <h4 className="mb-2 mb-lg-3">
            <b>Glow:</b>
            <span className="font-size-sm fw-normal d-block mt-1">Achieving visibly smoother & younger-looking skin with ultra nourishing body whip.</span>
          </h4>
        </div>
			</PDPBanner>
      <PDPBanner
        background="bg-purple-light"
        reverse={true}
				src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/bali-fruits-2_750x.jpg?v=1645454220"
				srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/bali-fruits-2_1440x.jpg?v=1645454220">
				<h2 className="h1 mb-2 mb-lg-4">All-day hydration</h2>
        <h4 className="fw-normal">
          Packed with Mangosteen, Papaya, Coconut, Mango & Guava that contain all your essential vitamins, minerals, amino acids & antioxidants for healthy-looking skin.
        </h4>
        <div className="d-flex flex-wrap bali-bundle-variants mt-2 mt-lg-4 align-items-center">
          <img className="mb-2 mb-lg-4" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/t/120/assets/scent-lychee-dragonfruit.svg?v=14552088448922970702" />
          <h4 className="mb-2 mb-lg-4 col-10 ps-0">
            <b>Lychee & Dragonfruit</b>
          </h4>
          <img className="mb-2 mb-lg-4" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/t/120/assets/scent-sweet-manggo.svg?v=9938120797124222652" />
          <h4 className="mb-2 mb-lg-4 col-10 ps-0">
            <b>Tropical Mango</b>
          </h4>
        </div>
			</PDPBanner>
      <PDPBanner
        background="bg-purple-light"
				src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/bali-fruits_750x.jpg?v=1645454244"
				srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/bali-fruits_1440x.jpg?v=1645454244">
				<h2 className="h1 mb-2 mb-lg-4">A Balinese fruit bowl of goodness!</h2>
			  <h4 className="fw-normal">
          Packed with Mangosteen, Papaya, Coconut, Mango & Guava that contain all your essential vitamins, minerals, amino acids & antioxidants for healthy-looking skin.
        </h4>
			</PDPBanner>
    </div>
  );
};

export default ProductBanner;
