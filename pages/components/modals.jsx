import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import EmblaCarousel from './EmblaCarousel'

const Modals = () => {
  const [emblaRef] = useEmblaCarousel();
  const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <>
    <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </>


  )
}

export default Modals;
