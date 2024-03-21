const InstagramCard = (props: any) => {
    const { videoUrl, author, product, url, classes } = props;
    return (
        <div className={`ig-card text-left ${classes}`}>
            <video className="w-full rounded-lg mb-1" muted="" loop="" playsinline="" webkit-playsinline="" autoplay="" name="media">
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p className="font-bold mb-25">{author}</p>
            <a href={url || '/'} className="font-size-sm text-body"><u>{product}</u></a>
        </div>
    );
};

export default InstagramCard;