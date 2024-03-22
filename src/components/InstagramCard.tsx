const InstagramCard = (props: any) => {
    const { videoUrl, author, product, url, classes } = props;
    return (
        <div className={`ig-card text-left ${classes} right-1`}>
            <video className="w-full rounded-lg mb-1" muted loop playsInline webkit-playsinline autoPlay>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p className="font-bold mb-25">{author}</p>
            <a href={url || '/'} className="font-size-sm text-body"><u>{product}</u></a>
        </div>
    );
};

export default InstagramCard;