import YotpoReviewWidget from '@/components/yotpo-review-widget';
import { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import ResultCard from '@/compounds/result-card';
import TestimonialCarousel from '@/sections/TestimonialCarousel';
import ProductCarousel from '@/sections/ProductCarousel';

const REVIEWS = [
    {
        id: 2,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Now that summer is officially over Coco & Eve is making sure I keep my tan for the rest of the year 🤍'
    },
    {
        id: 3,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 4,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Obsessed with how perfectly golden this leaves my skin! Best part: this is the WORLDS FIRST fake tan formula to help reduce cellulite AND have anti aging'
    },
    {
        id: 5,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'This hair oil made my hair VERY smooth, shiny and hydrated after using it 🥰 The elixir is very lightweight, no matter how much or how little you decide to use. I\'m obsessed!'
    },
    {
        id: 6,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Obsessed with how perfectly golden this leaves my skin! Best part: this is the WORLDS FIRST fake tan formula to help reduce cellulite AND have anti aging'
    },
    {
        id: 7,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'These Tan Drops give my face the most natural and healthy looking tan. It contains healthy ingredients including Banana, Coconut Water , Dragon Fruit. It is 100% natural and contains 5 different Hyaluronic Acids. For the smoothest application, I like to add a few drops to my moisturizer!'
    },
    {
        id: 8,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Ive never found a hair oil like this one! I love how my hair is hydrated, voluminous, shiny and strong! - I’d definitely recommend'
    },
    {
        id: 9,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Obsessed with how perfectly golden this leaves my skin! Best part: this is the WORLDS FIRST fake tan formula to help reduce cellulite AND have anti aging'
    },
    {
        id: 10,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 11,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 12,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 13,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 14,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Now that summer is officially over Coco & Eve is making sure I keep my tan for the rest of the year 🤍'
    },
    {
        id: 15,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 16,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 17,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 18,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'This hair oil made my hair VERY smooth, shiny and hydrated after using it 🥰 The elixir is very lightweight, no matter how much or how little you decide to use. I\'m obsessed!'
    },
    {
        id: 19,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Obsessed with how perfectly golden this leaves my skin! Best part: this is the WORLDS FIRST fake tan formula to help reduce cellulite AND have anti aging'
    },
    {
        id: 20,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'These Tan Drops give my face the most natural and healthy looking tan. It contains healthy ingredients including Banana, Coconut Water , Dragon Fruit. It is 100% natural and contains 5 different Hyaluronic Acids. For the smoothest application, I like to add a few drops to my moisturizer!'
    },
    {
        id: 21,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Ive never found a hair oil like this one! I love how my hair is hydrated, voluminous, shiny and strong! - I’d definitely recommend'
    },
    {
        id: 22,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 23,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 2,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 24,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Now that summer is officially over Coco & Eve is making sure I keep my tan for the rest of the year 🤍'
    },
    {
        id: 25,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 26,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Body',
        badgeColor: 'bali-bod-blue',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 27,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'This hair oil made my hair VERY smooth, shiny and hydrated after using it 🥰 The elixir is very lightweight, no matter how much or how little you decide to use. I\'m obsessed!'
    },
    {
        id: 28,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Obsessed with how perfectly golden this leaves my skin! Best part: this is the WORLDS FIRST fake tan formula to help reduce cellulite AND have anti aging'
    },
    {
        id: 29,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'These Tan Drops give my face the most natural and healthy looking tan. It contains healthy ingredients including Banana, Coconut Water , Dragon Fruit. It is 100% natural and contains 5 different Hyaluronic Acids. For the smoothest application, I like to add a few drops to my moisturizer!'
    },
    {
        id: 30,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        badgeColor: 'sh-purple',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'Ive never found a hair oil like this one! I love how my hair is hydrated, voluminous, shiny and strong! - I’d definitely recommend'
    },
    {
        id: 31,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Hair',
        badgeColor: 'secondary',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 32,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Tan',
        title: 'Bali Bronzing Foam (Dark)',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    },
    {
        id: 33,
        src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
        badge: 'Suncare',
        badgeColor: 'badge-orange',
        title: 'Daily Water Gel SPF50+',
        author: '@kaylaazjones',
        comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
    }
]

const carouselItems = [
    {
        index: 0,
        label: 'Slide 1',
        quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
        srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x50.png?v=1591087122',
        src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x25.png?v=1591087122'
    },
    {
        index: 1,
        label: 'Slide 2',
        quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
        srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Glamour_2x_1_x50.png?v=1591087107',
        src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Glamour_2x_1_x25.png?v=1591087107'
    },
    {
        index: 2,
        label: 'Slide 3',
        quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
        srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Harpers_Bazaar_logo_logotype_2x_65a7f362-98ec-471c-876e-f7a614a9d237_x50.png?v=1591087114',
        src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Harpers_Bazaar_logo_logotype_2x_65a7f362-98ec-471c-876e-f7a614a9d237_x25.png?v=1591087114'
    },
    {
        index: 3,
        label: 'Slide 4',
        quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
        srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x50.png?v=1591087122',
        src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x25.png?v=1591087122'
    }
]

const RealResults = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [reviewTab, setReviewTab] = useState('yotpo_tan');
    const [reviews, setReviews] = useState(REVIEWS);

    const handleChange = (evt) => {
		setActiveTab(evt.target.value);
	};

    const onSelect = (event) => {
		setActiveTab(event);
	};

    const onReviewTabSelect = (event) => {
		setReviewTab(event);
	};

    return (
		<>
            <section class="py-4 real-result">
                <Container>
                    <p className="mb-0 mb-lg-3 h1 text-center">Real Customers. Real Reviews</p>
                    <div className="mb-4 mx-auto d-sm-flex d-md-none my-3 row align-items-center justify-content-center">
                        <p className='h4 fw-normal mr-3 mb-0 col-3'>Filter by:</p>
                        <label htmlFor="rangeResultSelect" id="rangeResultSelectLabel" className="visually-hidden">Range Real Result</label>
                        <select defaultValue="All" id="rangeResultSelect" data-toggle="select" className="form-select form-select-lg custom-select custom-select-filter col-5 d-lg-none" aria-labelledby="rangeResultSelectLabel" onChange={handleChange}>
                            <option value="all">All</option>
                            <option value="tan">Tan</option>
                            <option value="hair">Hair</option>
                            <option value="suncare">Suncare</option>
                            <option value="body">Body</option>
                        </select>
                    </div>
                    <Tabs
                        defaultActiveKey="all"
                        activeKey={activeTab}
                        id="real-result-tab"
                        className="nav nav-tabs mx-auto nav-tabs--real-results-page nav-tabs--real-results text-center mb-5 justify-content-center d-none d-md-flex"
                        onSelect={onSelect}>
                        <Tab title="Filter By:" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                            
                        </Tab>
                        <Tab eventKey="tan" title="Tan" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                            <div class="row real-result__grid">
                                {reviews.length > 0 && (
                                    reviews.filter((i) => i.badge === 'Tan').map((review, i) => {
                                        return <ResultCard
                                            key={i}
                                            useCarousel={false}
                                            item={review}
                                        />
                                    })
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="hair" title="Hair" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                            <div class="row real-result__grid">
                                {reviews.length > 0 && (
                                    reviews.filter((i) => i.badge === 'Hair').map((review, i) => {
                                        return <ResultCard
                                            key={i}
                                            useCarousel={false}
                                            item={review}
                                        />
                                    })
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="body" title="Body" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                            <div class="row real-result__grid">
                                {reviews.length > 0 && (
                                    reviews.filter((i) => i.badge === 'Body').map((review, i) => {
                                        return <ResultCard
                                            key={i}
                                            useCarousel={false}
                                            item={review}
                                        />
                                    })
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="suncare" title="Suncare" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                            <div class="row real-result__grid">
                                {reviews.length > 0 && (
                                    reviews.filter((i) => i.badge === 'Suncare').map((review, i) => {
                                        return <ResultCard
                                            key={i}
                                            useCarousel={false}
                                            item={review}
                                        />
                                    })
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="all" title="All" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                            <div class="row real-result__grid">
                                {reviews.length > 0 && (
                                    reviews.map((review, i) => {
                                        return <ResultCard
                                            key={i}
                                            useCarousel={false}
                                            item={review}
                                        />
                                    })
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                    <div class="row">
                        <div class="col text-center">
                            <a href="#" class="btn btn-lg btn-outline-primary" id="real-result__show-more" data-load-more="4">Show more reviews</a>
                        </div>
                    </div>
                </Container>
            </section>
            <section>
                <h2 class="h1 text-center mb-2">Customer Reviews</h2>
                <div className='container'>
                    <div class="row justify-content-center">
                        <Tabs
                            defaultActiveKey="yotpo_tan"
                            activeKey={reviewTab}
                            id="yotpo-tab"
                            className="nav nav-tabs mx-auto nav-tabs--real-results nav-tabs--real-results-reviews text-center mb-5 justify-content-center"
                            onSelect={onReviewTabSelect}>
                            <Tab eventKey="yotpo_tan" title="Tan" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                                <YotpoReviewWidget
                                    productId='4543113265187'
                                    productName=''
                                    productUrl=''
                                    productImage=''
                                    productDesc=''
                                    canCreate={true}
                                    productSkus=''
                                />
                            </Tab>
                            <Tab eventKey="yotpo_hair" title="Hair" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                                <YotpoReviewWidget
                                    productId='4543113265187'
                                    productName=''
                                    productUrl=''
                                    productImage=''
                                    productDesc=''
                                    canCreate={true}
                                    productSkus=''
                                />
                            </Tab>
                            <Tab eventKey="yotpo_body" title="Body" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
                                <YotpoReviewWidget
                                    productId='4543113265187'
                                    productName=''
                                    productUrl=''
                                    productImage=''
                                    productDesc=''
                                    canCreate={true}
                                    productSkus=''
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </section>
            <section className="testimonials-carousel bg-light mt-4 py-4">
                <Container className="container text-center">
                    <h2 className="h1 mb-0">As seen in</h2>
                    <TestimonialCarousel id="testimonialsCarousel" indicatorClass="carousel-indicators--black" items={carouselItems} indicatorBorder={true} customArrows={true} />
                </Container>
            </section>
            <ProductCarousel />
		</>
    );
}

export default RealResults;