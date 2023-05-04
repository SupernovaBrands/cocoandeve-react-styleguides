import { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import Item from "@/compounds/nav-category";
import BlogPost from "@/sections/blog-post";
import Close from '../../src/images/icons/close.svg';
import Search from '../../src/images/icons/search.svg';
import Link from "next/link";

const BlogFiltered = (props) => {

    const blogs = [
        {
			srcSet: 'https://via.placeholder.com/740x376.jpg/EFADBA',
            src: 'https://via.placeholder.com/828x420.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            date: '04 May, 2020'
		},
        {
			srcSet: 'https://via.placeholder.com/740x376.jpg/EFADBA',
            src: 'https://via.placeholder.com/828x420.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            date: '04 May, 2020'
		},
        {
			srcSet: 'https://via.placeholder.com/740x376.jpg/EFADBA',
            src: 'https://via.placeholder.com/828x420.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            date: '04 May, 2020'
		},
        {
			srcSet: 'https://via.placeholder.com/740x376.jpg/EFADBA',
            src: 'https://via.placeholder.com/828x420.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            date: '04 May, 2020'
		},
        {
			srcSet: 'https://via.placeholder.com/740x376.jpg/EFADBA',
            src: 'https://via.placeholder.com/828x420.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            date: '04 May, 2020'
		},
        {
			srcSet: 'https://via.placeholder.com/740x376.jpg/EFADBA',
            src: 'https://via.placeholder.com/828x420.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            date: '04 May, 2020'
		}
    ]

    return (
        <>
            <Container className="mt-4">
                <h1 className="text-center mb-0 h3">COCO & EVE BLOG</h1>
                <ul className="mt-1 mb-2 nav nav-category justify-content-center align-items-center">
                    <Item item="ALL" link="#" className="nav-link pb-0 pt-0 h4 font-weight-normal px-lg-1" />
                    <Item item="HAIR" link="#" className="nav-link active pb-0 pt-0 h4 font-weight-normal px-lg-1" />
                    <Item item="TAN" link="#" className="nav-link pb-0 pt-0 h4 font-weight-normal px-lg-1" />
                    <Item item="SUNCARE" link="#" className="nav-link pb-0 pt-0 h4 font-weight-normal px-lg-1" />
                    <Item item="BODY" link="#" className="nav-link pb-0 pt-0 h4 font-weight-normal px-lg-1" />
                    <Item item="HOW TO'S" link="#" className="nav-link pb-0 pt-0 h4 font-weight-normal px-lg-1" />
                </ul>
                <div className="blog-grid row mt-3 mt-lg-4 mb-lg-4">
                    <div className="blog-grid__search col d-none d-lg-block mb-2 align-items-start">
                        <div className="sidebar py-2 bg-primary-light">
                            <div className="search-box input-group input-group-sm">
                                <div className="input-group-prepend">
                                    <span className="input-group-text search-box__icon">
                                        <Search className="svg fill-primary" />
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="exampleSearch" placeholder="Search" />
                                <div className="input-group-append">
                                    <a className="input-group-text search-box__close align-items-center" href="#" role="button" aria-label="Close search box">
                                        <Close className="svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog-grid__post1 col-12 d-lg-flex px-0 flex-wrap">
                        {blogs.map((item, i) => (
                            <BlogPost
                                key={i}
                                item={item}
                            />
                        ))}
                    </div>
                    <div className="blog-grid__sidebar col-12 d-lg-block mb-4 mb-lg-0">
                        <aside className="blog__sidebar position-sticky sticky-top">
                            <div className="no-gutters__in-container sidebar bg-primary-light">
                                <h2 className="mb-3 h1 text-center text-lg-start">POPULAR READS</h2>
                                <div className="slide carousel--sidebar">
                                    <ol className="carousel-indicators carousel-indicators--primary mb-0 d-lg-none">
                                        <li data-target=".carousel--sidebar" data-slide-to="0" className="rounded-circle border-0 active"></li>
                                        <li data-target=".carousel--sidebar" data-slide-to="1" className="rounded-circle border-0"></li>
                                    </ol>
                                    <ul className="list-unstyled carousel-inner mb-0 pb-1">
                                        <li className="carousel-item active">
                                            <article className="post-card mb-2 mb-lg-3">
                                                <h3><a href="/cocoandeve-styleguides/templates/article.html" className="link-secondary">5 things you’re doing wrong with your hair care routine</a></h3>
                                                <p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </article>
                                            <article className="post-card mb-2 mb-lg-3">
                                                <h3><a href="/cocoandeve-styleguides/templates/article.html" className="link-secondary">5 things you’re doing wrong with your hair care routine</a></h3>
                                                <p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </article>
                                        </li>
                                        <li className="carousel-item">
                                            <article className="post-card mb-2 mb-lg-0">
                                                <h3><a href="/cocoandeve-styleguides/templates/article.html" className="link-secondary">5 things you’re doing wrong with your hair care routine</a></h3>
                                                <p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </article>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </Container>
            <div className="w-100 text-center">
                <Link href="#" className="btn btn-lg btn-outline-primary mb-4">Load more posts</Link>
            </div>
        </>
    )
}

export default BlogFiltered;