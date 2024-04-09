import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-g">
      <h1 className="py-2">Coco&Eve Styleguide</h1>
      <div className="lg:-mx-g flex flex-wrap mt-3">
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>components</h2>
          <Link href="./components/grid">Grid</Link>
          <Link href="./components/typography">Typography</Link>
          <Link href="./components/accordions">Accordions</Link>
          <Link href="./components/announcement-bar">Announcement Bar</Link>
          <Link href="./components/badges">Badges</Link>
          <Link href="./components/breadcrumbs">Breadcrumbs</Link>
          <Link href="./components/bullets">Bullets</Link>
          <Link href="./components/buttons">Buttons</Link>
          <Link href="./components/carousels">Carousels</Link>
          <Link href="./components/ce-logo">Ce Logo</Link>
          <Link href="./components/modals">Modals</Link>
          <Link href="./components/colors">Colors</Link>
          <Link href="./components/dropdowns">Dropdowns</Link>
          <Link href="./components/forms">Forms</Link>
          <Link href="./components/social-icons">Social Icons</Link>
          <Link href="./components/hr">Hr</Link>
          <Link href="./components/svgs">Svgs</Link>
          <Link href="./components/tabs-comp">Tabs</Link>
          <Link href="./components/tooltips">Tooltips</Link>
          <Link href="./components/video-cards">Video Cards</Link>
          <Link href="./components/video-loops">Video Loop Gif</Link>
          <Link href="./components/instagram-cards">Instagram Card</Link>
        </div>

        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>compounds</h2>
          <Link href="./compounds/image-with-texts">Image With Texts</Link>
          <Link href="./compounds/launch-waitlist">Launch Waitlist</Link>
          <Link href="./compounds/nav-category">Nav Category</Link>
          <Link href="./compounds/newsletter-form">Newsletter Form</Link>
          <Link href="./compounds/popups">Popups</Link>
          <Link href="./compounds/post-cards">Post Cards</Link>
          <Link href="./compounds/product-banner">Product Banner</Link>
          <Link href="./compounds/product-card-abtest">Product Card Abtest</Link>
          <Link href="./compounds/product-card">Product Card</Link>
          <Link href="./compounds/product-variant">Product Variant</Link>
          <Link href="./compounds/result-card">Result Card</Link>
          <Link href="./compounds/upsell">Upsell</Link>
          <Link href="./compounds/waitlist-form">Waitlist Form</Link>
          <Link href="./compounds/product-image-carousels">
            Product Image Carousels
          </Link>
        </div>
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>Sections</h2>
          <Link href="./sections/cart-drawer">Cart Drawer</Link>
          <Link href="./sections/comments">Comments</Link>
          <Link href="./sections/footer">Footer</Link>
          <Link href="./sections/header">Header</Link>
          <Link href="./sections/hero-banner">Hero Banner</Link>
          <Link href="./sections/howto">HowTo</Link>
          <Link href="./sections/instagram">Instagram</Link>
          <Link href="./sections/playground">Playground</Link>
          <Link href="./sections/product-carousels">Product Carousel</Link>
          <Link href="./sections/real-results">Real Results</Link>
          <Link href="./sections/services">Services</Link>
          <Link href="./sections/sidebars">Sidebar</Link>
          <Link href="./sections/testimonials-carousel">Testimonials Carousel</Link>
          <Link href="./sections/testimonials">Testimonials</Link>
          <Link href="./sections/yotpo-widget">Yotpo Widget</Link>
          <Link href="./sections/quiz-rewards">Discover More</Link>
        </div>
        <div className="w-full lg:w-1/2 px-0 lg:px-g mb-3 flex flex-col items-start">
          <h2>Templates</h2>
          <Link href="./templates/article">Article</Link>
          <Link href="./templates/blog-filtered">Blog Filtered</Link>
          <Link href="./templates/collection">Collection</Link>
          <Link href="./templates/product">Product</Link>
          <Link href="./templates/homepage">Homepage</Link>
          <Link href="./templates/real-results">RealResults</Link>
          <Link href="./templates/blog">Blog</Link>
          <Link href="./templates/stockist">Stockist</Link>
          <Link href="./templates/sustainability">Sustainability</Link>
          <Link href="./templates/sweepstakes">Sweepstakes</Link>
          <Link href="./templates/our-story">Our Story</Link>
        </div>
      </div>
    </div>
  );
}
