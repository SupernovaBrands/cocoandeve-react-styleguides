import React, { useEffect, useState } from 'react';

const Page = (props: any) => {
    const { content, isLoading, bodyContent } = props;
    // console.log('test', content)
    const cssGrid = `
        .page-content p {
            margin-bottom: 1rem;
        }

        .page-content ul {
            list-style-type: disc;
            padding-inline-start: 40px;
            margin-block-end: 1em;
        }
        .page-content .font-italic {
            font-style: italic;
        }
    `;
    return (
        <div className="pt-4">
            <div className="container">
                <div className="flex flex-wrap lg:-mx-g sm:-mx-hg justify-center">
                    <div className="lg:px-g sm:px-hg lg:w-8/12 w-full relative page-content">
                        <h1 className="text-center md:mb-7 mb-5">
                            {content?.title}
                        </h1>
                        <style jsx>{cssGrid}</style>
                        {/* {parse(content?.content.replace('<a class="link-color"', '<a class="link-color underline"'))} */}
                        <div className={`${!isLoading ? '' : 'invisible'} transition-all lg:mb-3`} dangerouslySetInnerHTML={{
							__html: bodyContent ?? content?.content,
						}} />
                    </div>
                </div>
                <div className="flex flex-wrap lg:-mx-g sm:-mx-hg justify-center">
                    <div className="lg:w-2/3 lg:px-g sm:px-hg w-full text-center md:pt-10 md:pb-8 pt-6 pb-6 mb-3">
                        <h2 className="md:mb-1 mb-3">
                            Didn’t find your answer?
                        </h2>
                        <p>No worries, you can email us <a href="mailto:hello@cocoandeve.com" aria-label="Contact us here"><strong>here</strong></a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
