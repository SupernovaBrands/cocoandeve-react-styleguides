import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import BlogFiltered from '@/templates/BlogFiltered';

const BlogFilteredTemplate = () => {
    return (
		<>
        	<Header />
			<BlogFiltered />
			<Footer />
		</>
    );
}

export default BlogFilteredTemplate;