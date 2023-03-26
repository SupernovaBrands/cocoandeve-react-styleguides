import { useEffect } from "react";

const Comments = (props) => {

    useEffect(() => {
        var d = document, s = d.createElement('script');
        s.src = 'https://ce-style-guides.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    
        return () => {
          (d.head || d.body).removeChild(s);
        }
    });

    return (
		<>
            <div id="disqus_thread" className="col-12 col-lg-8 mb-3"></div>
		</>
	);
};

export default Comments;
