import Item from "@/compounds/nav-category";
import BlogPost from "@/sections/blog-post";
import Close from '../../src/images/icons/close.svg';
import Search from '../../src/images/icons/search.svg';
import Link from "next/link";
import { InputSearch } from '@/components/index';

const BlogFiltered = (props) => {
    const onSearchChange = (e) => {
        console.log(e, 'on Search Change Page');
    }
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
            <div className="container mt-4">
                <h1 className="text-center mb-0 h3">COCO & EVE BLOG</h1>
                <ul className="mt-1 mb-2 flex flex-wrap nav-category justify-center items-center">
                    <Item item="ALL" link="#" className="nav-link pb-0 pt-0 h4 font-normal lg:px-1 sm:px-hg" />
                    <Item item="HAIR" link="#" className="nav-link active pb-0 pt-0 h4 font-normal lg:px-1 sm:px-hg" />
                    <Item item="TAN & SPF" link="#" className="nav-link pb-0 pt-0 h4 font-normal lg:px-1 sm:px-hg" />
                    <Item item="BODY" link="#" className="nav-link pb-0 pt-0 h4 font-normal lg:px-1 sm:px-hg" />
                    <Item item="HOW TO'S" link="#" className="nav-link pb-0 pt-0 h4 font-normal lg:px-1 sm:px-hg" />
                </ul>
                <div className="blog-grid flex flex-wrap mt-3 lg:mt-4 lg:mb-4">
                    <div className="blog-grid__search col hidden lg:block mb-2 items-start lg:px-g sm:px-hg">
                        <div className="py-2 px-2 bg-primary-light">
                            <InputSearch id="searchInput" placeHolder="Search" textButton="Search" onChange={onSearchChange}></InputSearch>
                        </div>
                    </div>
                    <div className="blog-grid__post1 w-full lg:flex px-0 flex-wrap">
                        {blogs.map((item, i) => (
                            <BlogPost
                                key={i}
                                item={item}
                            />
                        ))}
                    </div>
                    <div className="blog-grid__sidebar w-full lg:block mb-4 mb-lg-0 lg:px-g sm:px-hg">
                    <aside className="blog-grid__sidebar lg:sticky w-full lg:block mb-4 lg:mb-0 self-start">
                        <div className="no-gutters__in-container sidebar bg-primary-light">
                            <h4 className="mb-3 h1 mb-1">POPULAR READS</h4>
                            <div className="">
                                <div className="mb-0 pb-1">
                                    <div className="">
                                        <article className="post-card mb-2 lg:mb-3">
                                            <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary">5 things you’re doing wrong with your hair care routine</a></h3>
                                            <p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                        </article>
                                        <article className="post-card mb-2 lg:mb-3">
                                            <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary">5 things you’re doing wrong with your hair care routine</a></h3>
                                            <p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                        </article>
                                    </div>
                                    <div className="">
                                        <article className="post-card mb-2 lg:mb-0">
                                            <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary">5 things you’re doing wrong with your hair care routine</a></h3>
                                            <p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    </div>
                </div>
            </div>
            <div className="w-full text-center mb-4">
                <Link href="#" className="bg-transparent hover:bg-primary hover:text-white rounded-lg border-2 border-primary font-bold text-primary py-[13px] px-[54px]">Load more posts</Link>
            </div>
        </>
    )
}

export default BlogFiltered;