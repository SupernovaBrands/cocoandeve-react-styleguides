import Link from "next/link";
import { useEffect, useState } from "react";

type HomeProps = {
  path: string | undefined | null,
}

export default function Home(props: HomeProps) {
  const { path } = props;
  const pathLink = path ?? '.';

  return (
    <div className="container mx-auto px-g">
      <h1 className="py-2">Coco&Eve Styleguide</h1>
      <div className="lg:-mx-g flex flex-wrap mt-3">
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>components</h2>
          <Link href={`${pathLink}/components/grid`}>Grid</Link>
          <Link href={`${pathLink}/components/typography`}>Typography</Link>
          <Link href={`${pathLink}/components/accordions`}>Accordions</Link>
          <Link href={`${pathLink}/components/announcement-bar`}>Announcement Bar</Link>
          <Link href={`${pathLink}/components/badges`}>Badges</Link>
          <Link href={`${pathLink}/components/breadcrumbs`}>Breadcrumbs</Link>
          <Link href={`${pathLink}/components/bullets`}>Bullets</Link>
          <Link href={`${pathLink}/components/buttons`}>Buttons</Link>
          <Link href={`${pathLink}/components/carousels`}>Carousels</Link>
          <Link href={`${pathLink}/components/ce-logo`}>Ce Logo</Link>
          <Link href={`${pathLink}/components/modals`}>Modals</Link>
          <Link href={`${pathLink}/components/colors`}>Colors</Link>
          <Link href={`${pathLink}/components/dropdowns`}>Dropdowns</Link>
          <Link href={`${pathLink}/components/forms`}>Forms</Link>
          <Link href={`${pathLink}/components/social-icons`}>Social Icons</Link>
          <Link href={`${pathLink}/components/hr`}>Hr</Link>
          <Link href={`${pathLink}/components/svgs`}>Svgs</Link>
          <Link href={`${pathLink}/components/tabs-comp`}>Tabs</Link>
          <Link href={`${pathLink}/components/tooltips`}>Tooltips</Link>
          <Link href={`${pathLink}/components/video-cards`}>Video Cards</Link>
          <Link href={`${pathLink}/components/video-loops`}>Video Loop Gif</Link>
          <Link href={`${pathLink}/components/instagram-cards`}>Instagram Card</Link>
        </div>

        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>compounds</h2>
          <Link href={`${pathLink}/compounds/image-with-texts`}>Image With Texts</Link>
          <Link href={`${pathLink}/compounds/launch-waitlist`}>Launch Waitlist</Link>
          <Link href={`${pathLink}/compounds/nav-category`}>Nav Category</Link>
          <Link href={`${pathLink}/compounds/newsletter-form`}>Newsletter Form</Link>
          {/* <Link href={`${pathLink}/compounds/popups`}>Popups</Link> */}
          <Link href={`${pathLink}/compounds/post-cards`}>Post Cards</Link>
          <Link href={`${pathLink}/compounds/product-banner`}>Product Banner</Link>
          <Link href={`${pathLink}/compounds/product-card`}>Product Card</Link>
          <Link href={`${pathLink}/compounds/product-variant`}>Product Variant</Link>
          <Link href={`${pathLink}/compounds/result-card`}>Result Card</Link>
          <Link href={`${pathLink}/compounds/upsell`}>Upsell</Link>
          <Link href={`${pathLink}/compounds/waitlist-form`}>Waitlist Form</Link>
          <Link href={`${pathLink}/compounds/product-image-carousels`}>
            Product Image Carousels
          </Link>
        </div>
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>Sections</h2>
          <Link href={`${pathLink}/sections/cart-drawer`}>Cart Drawer</Link>
          <Link href={`${pathLink}/sections/comments`}>Comments</Link>
          <Link href={`${pathLink}/sections/footer`}>Footer</Link>
          <Link href={`${pathLink}/sections/header`}>Header</Link>
          <Link href={`${pathLink}/sections/hero-banner`}>Hero Banner</Link>
          <Link href={`${pathLink}/sections/howto`}>HowTo</Link>
          <Link href={`${pathLink}/sections/instagram`}>Instagram</Link>
          <Link href={`${pathLink}/sections/playground`}>Playground</Link>
          <Link href={`${pathLink}/sections/product-carousels`}>Product Carousel</Link>
          <Link href={`${pathLink}/sections/real-results`}>Real Results</Link>
          <Link href={`${pathLink}/sections/services`}>Services</Link>
          <Link href={`${pathLink}/sections/sidebars`}>Sidebar</Link>
          <Link href={`${pathLink}/sections/testimonials-carousel`}>Testimonials Carousel</Link>
          <Link href={`${pathLink}/sections/testimonials`}>Testimonials</Link>
          <Link href={`${pathLink}/sections/yotpo-widget`}>Yotpo Widget</Link>
          <Link href={`${pathLink}/sections/quiz-rewards`}>Discover More</Link>
        </div>
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>Templates</h2>
          <Link href={`${pathLink}/templates/article`}>Article</Link>
          <Link href={`${pathLink}/templates/blog-filtered`}>Blog Filtered</Link>
          <Link href={`${pathLink}/templates/collection`}>Collection</Link>
          <Link href={`${pathLink}/templates/product`}>Product</Link>
          <Link href={`${pathLink}/templates/homepage`}>Homepage</Link>
          <Link href={`${pathLink}/templates/real-results`}>RealResults</Link>
          <Link href={`${pathLink}/templates/blog`}>Blog</Link>
          <Link href={`${pathLink}/templates/stockist`}>Stockist</Link>
          <Link href={`${pathLink}/templates/sustainability`}>Sustainability</Link>
          <Link href={`${pathLink}/templates/sweepstakes`}>Sweepstakes</Link>
          <Link href={`${pathLink}/templates/our-story`}>Our Story</Link>
        </div>
      </div>
    </div>
  );
}
