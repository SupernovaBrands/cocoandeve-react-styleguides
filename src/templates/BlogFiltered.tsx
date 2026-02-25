import Item from "~/compounds/nav-category";
import BlogPost from "~/sections/blog-post";
import Sidebar from "~/sections/Sidebar";
import Link from "next/link";
import { InputSearch } from '~/components/index';

const BlogFiltered = (props) => {
    const onSearchChange = (e) => {
        // console.log(e, 'on Search Change Page');
    }
    const SIDEBAR_DATA = [
		{
			id: 1,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/320x_cc6d48a9-571b-4e87-ac4f-990f72049d5a.jpg?v=1772039388',
			srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/320x_cc6d48a9-571b-4e87-ac4f-990f72049d5a.jpg?v=1772039388',
			alt: 'Bond Building Pre-Shampoo Treatment',
		},
		{
			id: 2,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/320x_ed577119-84c9-453b-a474-d93817f912d3.jpg?v=1772039420',
			srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/320x_ed577119-84c9-453b-a474-d93817f912d3.jpg?v=1772039420',
			alt: 'Bond Building Pre-Shampoo Treatment',
		},
		{
			id: 3,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/320x_ed577119-84c9-453b-a474-d93817f912d3.jpg?v=1772039420',
			srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/320x_ed577119-84c9-453b-a474-d93817f912d3.jpg?v=1772039420',
			alt: 'Bond Building Pre-Shampoo Treatment',
		},
	];
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
                    <Item item="ALL" link="#" className="nav-link mb-1 block pb-0 pt-0 lg:text-lg font-normal lg:px-1 sm:px-hg" />
                    <Item item="HAIR" link="#" className="nav-link mb-1 block active pb-0 pt-0 lg:text-lg font-normal lg:px-1 sm:px-hg" />
                    <Item item="TAN & SPF" link="#" className="nav-link mb-1 block pb-0 pt-0 lg:text-lg font-normal lg:px-1 sm:px-hg" />
                    <Item item="BODY" link="#" className="nav-link mb-1 block pb-0 pt-0 lg:text-lg font-normal lg:px-1 sm:px-hg" />
                    <Item item="HOW TO'S" link="#" className="nav-link mb-1 block pb-0 pt-0 lg:text-lg font-normal lg:px-1 sm:px-hg" />
                </ul>
                <div className="blog-grid flex flex-wrap mt-3 lg:mt-4 lg:mb-4 lg:-mx-g">
                    <div className="blog-grid__search col hidden lg:block mb-2 items-start lg:px-g sm:px-hg">
                        <div className="py-2 px-2 bg-primary-light-second">
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

                    <div className="blog-grid__sidebar w-full lg:block mb-4 mb-lg-0">
                        <Sidebar data={SIDEBAR_DATA} />
                    </div>
                </div>
            </div>
            <div className="text-center mb-4">
                <Link href="#" className="bg-transparent hover:bg-primary hover:text-white border-primary text-primary btn-lg btn hover:no-underline rounded-full">Load more posts</Link>
            </div>
        </>
    )
}

export default BlogFiltered;
