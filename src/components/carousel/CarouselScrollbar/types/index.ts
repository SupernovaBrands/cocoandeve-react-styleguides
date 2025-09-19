import { EmblaCarouselType } from 'embla-carousel'

export interface CarouselScrollbarProps {
  emblaApi: EmblaCarouselType | undefined
  scrollSnaps?: number[]
  className?: string
  prevArrow?: any
  nextArrow?: any
  visibleInScreen?: number
  carouselItemLength?: number
}
