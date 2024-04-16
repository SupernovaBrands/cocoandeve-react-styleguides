import Link from "next/link";
import { useEffect, useState } from "react";

type HomeProps = {
  path: string | null | undefined;
}

export default function Home(props: HomeProps) {
  const { path } = props;
  const linkPath = path ?? './';

  return (
    <div className="container mx-auto px-g">
      <h1 className="py-2">Coco&Eve Styleguide</h1>
      <div className="lg:-mx-g flex flex-wrap mt-3">
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>components</h2>
          <Link href={`${linkPath}components/grid`}>Grid</Link>
          <Link href={`${linkPath}components/typography`}>Typography</Link>
          <Link href={`${linkPath}components/accordions`}>Accordions</Link>
          <Link href={`${linkPath}components/announcement-bar`}>Announcement Bar</Link>
          <Link href={`${linkPath}components/badge`}>Badge</Link>
          <Link href={`${linkPath}components/breadcrumbs`}>Breadcrumbs</Link>
          <Link href={`${linkPath}components/bullets`}>Bullets</Link>
          <Link href={`${linkPath}components/buttons`}>Buttons</Link>
          <Link href={`${linkPath}components/carousels`}>Carousels</Link>
          <Link href={`${linkPath}components/ce-logo`}>Ce Logo</Link>
          <Link href={`${linkPath}components/modals`}>Modals</Link>
          <Link href={`${linkPath}components/colors`}>Colors</Link>
          <Link href={`${linkPath}components/dropdowns`}>Dropdowns</Link>
          <Link href={`${linkPath}components/forms`}>Forms</Link>
          <Link href={`${linkPath}components/social-icons`}>Social Icons</Link>
          <Link href={`${linkPath}components/hr`}>Hr</Link>
          <Link href={`${linkPath}components/svgs`}>Svgs</Link>
          <Link href={`${linkPath}components/tabs-comp`}>Tabs</Link>
          <Link href={`${linkPath}components/tooltips`}>Tooltips</Link>
          <Link href={`${linkPath}components/video-cards`}>Video Cards</Link>
          <Link href={`${linkPath}components/video-loops`}>Video Loop Gif</Link>
          <Link href={`${linkPath}components/instagram-cards`}>Instagram Card</Link>
        </div>

        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>compounds</h2>
          <Link href={`${linkPath}compounds/image-with-texts`}>Image With Texts</Link>
          <Link href={`${linkPath}compounds/launch-waitlist`}>Launch Waitlist</Link>
          <Link href={`${linkPath}compounds/nav-category`}>Nav Category</Link>
          <Link href={`${linkPath}compounds/newsletter-form`}>Newsletter Form</Link>
          <Link href={`${linkPath}compounds/popups`}>Popups</Link>
          <Link href={`${linkPath}compounds/post-cards`}>Post Cards</Link>
          <Link href={`${linkPath}compounds/product-banner`}>Product Banner</Link>
          <Link href={`${linkPath}compounds/product-card-abtest`}>Product Card Abtest</Link>
          <Link href={`${linkPath}compounds/product-card`}>Product Card</Link>
          <Link href={`${linkPath}compounds/product-variant`}>Product Variant</Link>
          <Link href={`${linkPath}compounds/result-card`}>Result Card</Link>
          <Link href={`${linkPath}compounds/upsell`}>Upsell</Link>
          <Link href={`${linkPath}compounds/waitlist-form`}>Waitlist Form</Link>
          <Link href={`${linkPath}compounds/product-image-carousels`}>
            Product Image Carousels
          </Link>
        </div>
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>Sections</h2>
          <Link href={`${linkPath}sections/cart-drawer`}>Cart Drawer</Link>
          <Link href={`${linkPath}sections/comments`}>Comments</Link>
          <Link href={`${linkPath}sections/footer`}>Footer</Link>
          <Link href={`${linkPath}sections/header`}>Header</Link>
          <Link href={`${linkPath}sections/hero-banner`}>Hero Banner</Link>
          <Link href={`${linkPath}sections/howto`}>HowTo</Link>
          <Link href={`${linkPath}sections/instagram`}>Instagram</Link>
          <Link href={`${linkPath}sections/playground`}>Playground</Link>
          <Link href={`${linkPath}sections/product-carousels`}>Product Carousel</Link>
          <Link href={`${linkPath}sections/real-results`}>Real Results</Link>
          <Link href={`${linkPath}sections/services`}>Services</Link>
          <Link href={`${linkPath}sections/sidebars`}>Sidebar</Link>
          <Link href={`${linkPath}sections/testimonials-carousel`}>Testimonials Carousel</Link>
          <Link href={`${linkPath}sections/testimonials`}>Testimonials</Link>
          <Link href={`${linkPath}sections/yotpo-widget`}>Yotpo Widget</Link>
          <Link href={`${linkPath}sections/quiz-rewards`}>Discover More</Link>
        </div>
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>Templates</h2>
          <Link href={`${linkPath}templates/article`}>Article</Link>
          <Link href={`${linkPath}templates/blog-filtered`}>Blog Filtered</Link>
          <Link href={`${linkPath}templates/collection`}>Collection</Link>
          <Link href={`${linkPath}templates/product`}>Product</Link>
          <Link href={`${linkPath}templates/homepage`}>Homepage</Link>
          <Link href={`${linkPath}templates/real-results`}>RealResults</Link>
          <Link href={`${linkPath}templates/blog`}>Blog</Link>
          <Link href={`${linkPath}templates/stockist`}>Stockist</Link>
          <Link href={`${linkPath}templates/sustainability`}>Sustainability</Link>
          <Link href={`${linkPath}templates/sweepstakes`}>Sweepstakes</Link>
          <Link href={`${linkPath}templates/our-story`}>Our Story</Link>
        </div>
      </div>
    </div>
  );
}
