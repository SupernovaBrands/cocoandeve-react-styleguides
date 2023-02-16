import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="container">
      <h1 className="py-2">Coco&Eve Styleguide</h1>
      <div className="row mt-3">
        <div className="col-12 col-lg-6 mb-3 d-flex flex-column align-items-start">
          <h2>components</h2>
          <a href="./components/accordions">Accordions</a>
          <a href="./components/announcement-bar">Announcement Bar</a>
          <a href="./components/badge">Badge</a>
          <a href="./components/breadcrumbs">Breadcrumbs</a>
          <a href="./components/bullets">Bullets</a>
          <a href="./components/buttons">Buttons</a>
          <a href="./components/carousels">Carousels</a>
          <a href="./components/ce-logo">Ce Logo</a>
          <a href="./components/colors">Colors</a>
          <a href="./components/cookie-banners">Cookie Banners</a>
          <a href="./components/dropdowns">Dropdowns</a>
          <a href="./components/forms">Forms</a>
          <a href="./components/grid">Grid</a>
          <a href="./components/hr">Hr</a>
          <a href="./components/product-image-carousels">
            Product Image Carousels
          </a>
          <a href="./components/svgs">Svgs</a>
          <a href="./components/tabs">Tabs</a>
          <a href="./components/tooltips">Tooltips</a>
          <a href="./components/vide-cards">Vide Cards</a>
          <a href="./components/video-loop-gif">Video Loop Gif</a>
        </div>

        <div className="col-12 col-lg-6 mb-3 d-flex flex-column align-items-start">
          <h2>compounds</h2>
          <a href="/compounds/image-with-texts">Image With Texts</a>
          <a href="/compounds/launch-waitlist">Launch Waitlist</a>
          <a href="/compounds/nav-category">Nav Category</a>
          <a href="/compounds/newsletter-form">Newsletter Form</a>
          <a href="/compounds/popups">Popups</a>
          <a href="/compounds/post-cards">Post Cards</a>
          <a href="/compounds/product-banner">Product Banner</a>
          <a href="/compounds/product-card">Product Card</a>
          <a href="/compounds/product-variant">Product Variant</a>
          <a href="/compounds/result-card">Result Card</a>
          <a href="/compounds/upsell">Upsell</a>
          <a href="/compounds/waitlist-form">Waitlist Form</a>
        </div>
      </div>
    </div>
  );
}
