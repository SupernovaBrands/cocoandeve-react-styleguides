const InstagramCard = (props: any) => {
    const { videoUrl, author, product, url, classes } = props;
    return (
        <div className={`text-left rounded ${classes}`}>
            <video className="w-full rounded mb-g" muted={true} loop={true} webkit-playsinline={true} autoPlay={true}>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p className="font-bold mb-25">{author}</p>
            <a href={url || '/'} className="font-size-sm text-body"><u>{product}</u></a>
        </div>
    );
};

export default InstagramCard;