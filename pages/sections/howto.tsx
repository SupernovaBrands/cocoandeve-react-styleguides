import HowToCarousel from "~/sections/HowTo";

const HowToSection: React.FC = () => {
    
    const videoData = [
        {
            label: 'Slide 1',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['TAN', 'NEW'],
        },
        {
            label: 'Slide 2',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['HAIR', 'HOT'],
        },
        {
            label: 'Slide 3',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['BODY', 'FEATURED'],
        }
    ];

    return (
        <div className="container mb-5">
            <h1 className="mt-4">Video Carousel</h1>
            <HowToCarousel videoData={videoData} />
        </div>
    );
}

export default HowToSection;
