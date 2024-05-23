const InstagramCard = (props: any) => {
    const { videoUrl, author, title, url, classes, product } = props;
    return (
        <div className={`text-left rounded ${classes}`}>
            <video preload={props.index === 1 ? 'metadata' : 'none'} className="w-full rounded mb-g lazy-video bg-shimmer lg:min-h-[386px] min-h-[364px]" muted={true} loop={true} webkit-playsinline="true" autoPlay={true}>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p className="font-bold mb-25">{author}</p>
            <a href={`/products/${product}`} className="font-size-sm text-body"><u>{title}</u></a>
        </div>
    );
};

export default InstagramCard;
