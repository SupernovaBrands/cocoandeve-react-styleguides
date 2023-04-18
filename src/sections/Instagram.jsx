import { useState } from 'react';

const Instagram = (props) => {
    return (
        <section className="instagram pt-4 text-center bg-primary-light container-fluid">
            <div className="col-11 col-lg-8 text-center mx-auto pb-4 px-1">
                <p className="h1">Get social with us</p>
                <p className="h4">
                    <a href="#" target="_blank"  className="text-dark text-underline">@cocoandeve</a>
                </p>
                <p className="h4 fw-normal mb-0">Want to feature on our website or instagram? Tag us in your photos/reviews on instagram or social media using the hashtag #cocoandeve and @cocoandeve.</p>
            </div>
            <div className="instagram--feed container-fluid p-lg-0">
                <div className="row flex-nowrap p-sm-0 pb-sm-1 p-md-1">
                    <div className="instagram--feed--left col-12 p-0">
                        <div className="row  m-0">
                            <div className="col-12 col-lg-8 p-0">
                                <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                    <picture>
                                    <source srcset="https://via.placeholder.com/345x345"/>
                                    <img className="w-100 img-big" src="https://via.placeholder.com/345x345" />
                                    </picture>
                                </a>
                            </div>
                            <div className="col-12 col-lg-4 p-0">
                                <div className="row  m-0 ">
                                    <div className="col-lg-12 col-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                            <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                            </picture>
                                        </a>
                                    </div>
                                    <div className="col-6 col-lg-12 p-0 ">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                            <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                            </picture>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 p-0">
                                <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                    <picture>
                                    <source srcset="https://via.placeholder.com/345x345"/>
                                    <img className="w-100" src="https://via.placeholder.com/345x345" />
                                    </picture>
                                </a>
                            </div>
                            <div className="col-6 col-lg-4 p-0">
                                <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                    <picture>
                                    <source srcset="https://via.placeholder.com/345x345"/>
                                    <img className="w-100" src="https://via.placeholder.com/345x345" />
                                    </picture>
                                </a>
                            </div>
                            <div className="col-lg-4 p-0 d-none d-md-inline-block">
                                <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                    <picture>
                                    <source srcset="https://via.placeholder.com/345x345"/>
                                    <img className="w-100" src="https://via.placeholder.com/345x345" />
                                    </picture>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="instagram--feed--right col-12 d-none p-0 d-md-inline-block">
                        <div className="row  m-0">
                            <div className="col-lg-6 p-0">
                                <div className="row  m-0">
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                            <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                            </picture>
                                        </a>
                                    </div>
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                            <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                            </picture>
                                        </a>
                                    </div>
                                    <div className="col-12 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                        <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100 img-big" src="https://via.placeholder.com/345x345" />
                                        </picture>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 p-0">
                                <div className="row  m-0 ">
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                        <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                        </picture>
                                        </a>
                                    </div>
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                        <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                        </picture>
                                        </a>
                                    </div>
                                    <div className="col-lg-6  p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                        <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                        </picture>
                                        </a>
                                    </div>
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                            <picture>
                                                <source srcset="https://via.placeholder.com/345x345"/>
                                                <img className="w-100" src="https://via.placeholder.com/345x345" />
                                            </picture>
                                        </a>
                                    </div>
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                        <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                        </picture>

                                        </a>
                                    </div>
                                    <div className="col-lg-6 p-0">
                                        <a href="#" target="_blank"  className='d-block instagram--feed--link'>
                                        <picture>
                                            <source srcset="https://via.placeholder.com/345x345"/>
                                            <img className="w-100" src="https://via.placeholder.com/345x345" />
                                        </picture>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Instagram;