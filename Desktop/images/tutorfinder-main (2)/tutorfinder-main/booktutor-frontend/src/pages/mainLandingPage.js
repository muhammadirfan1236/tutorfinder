import React from 'react'
import "../statics/css/mainlanding.css"
import HeroBg from "../statics/images/hero_bg.jpg"
import PersonOne from "../statics/images/person_1.jpg"
import PersonTwo from "../statics/images/person_2.jpg"
import PersonThree from "../statics/images/person_3.jpg"
import { FaFacebook } from "react-icons/fa";
import { CiInstagram, CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

const MainLandingPage = () => {
    return (
        <div class="site-wrap" id="home-section">

            <div class="site-mobile-menu site-navbar-target">
                <div class="site-mobile-menu-header">
                    <div class="site-mobile-menu-close mt-3">
                        <span class="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div class="site-mobile-menu-body"></div>
            </div>

            <header class="site-navbar light site-navbar-target header" role="banner">

                <div class="container">
                    <div class="row align-items-center position-relative">

                        <div class="col-3">
                            <div class="site-logo">
                                <a href="index.html" style={{ textDecoration: "none" }}><strong>TutorFinder A</strong></a>
                            </div>
                        </div>

                        <div class="col-9  text-right">

                            <span class="d-inline-block d-lg-none"><a href="#" class=" site-menu-toggle js-menu-toggle py-5 "><span class="icon-menu h3 text-black"></span></a></span>

                            <nav class="site-navigation text-right ml-auto d-none d-lg-block" role="navigation">
                                <ul class="site-menu main-menu js-clone-nav ml-auto ">

                                    <li><a href="/" class="nav-link">Home</a></li>
                                    <li class="active"><a href="/login" class="nav-link">Login</a></li>
                                    <li><a href="/signup" class="nav-link">Signup</a></li>
                                </ul>
                            </nav>
                        </div>


                    </div>
                </div>

            </header>


            <div class="site-section-cover overlay mainlandingbg">
                <div className="shadow"></div>
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-lg-10 text-center">
                            <h1><strong>About TutorFinder</strong></h1>
                        </div>
                    </div>
                </div>
            </div>




            <div class="site-section d-flex justify-content-center p-5 company-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2 p-5">
                            <div className="image ">
                                <img src={HeroBg} alt="Image" class="img-fluid rounded" />
                            </div>

                        </div>
                        <div class="col-lg-6 mr-auto d-flex align-items-center ">
                            <div>
                                <div class="heading mb-4">

                                    <h2>Our Company</h2>
                                </div>


                                <p> Discover skilled tutors tailored to your needs,
                                    with transparent profiles and user reviews for informed decisions.</p>
                                <p>Enjoy flexible scheduling and online sessions
                                    for convenient, global learning. Our user-friendly interface ensures a seamless experience, prioritizing safety
                                    and security. Empower your academic success with TutorFinder.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="site-section bg-light meet-team p-5">
                <div class="container">
                    <div class="row justify-content-center text-center mb-5 section-2-title">
                        <div class="col-md-6">
                            <div class="heading" style={{ marginBottom: "40px" }}>

                                <h2>Meet Our Tutors</h2>
                            </div>


                        </div>
                    </div>
                    <div class="row align-items-stretch">

                        <div class="col-lg-4 col-md-6 mb-5">
                            <div class="post-entry-1 h-100 person-1">
                                <div className="d-flex justify-content-center">
                                    <img src={PersonOne} alt="Image"
                                        class="img-fluid" />
                                </div>
                                <div class="post-entry-1-contents">
                                    <span class="meta mb-0">Chemistry</span>
                                    <h2>Adam John</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, sapiente.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-5">
                            <div class="post-entry-1 h-100 person-1">
                                <div className="d-flex justify-content-center">
                                    <img src={PersonTwo} alt="Image"
                                        class="img-fluid" />
                                </div>

                                <div class="post-entry-1-contents">
                                    <span class="meta">Social Sciences</span>
                                    <h2>Ola Patrick</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, sapiente.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 mb-5">
                            <div class="post-entry-1 h-100 person-1">
                                <div className="d-flex justify-content-center">
                                    <img src={PersonThree} alt="Image"
                                        class="img-fluid" />
                                </div>


                                <div class="post-entry-1-contents">
                                    <span class="meta">Computer Science</span>
                                    <h2>Patrycja bartoisz</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, sapiente.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="site-section mission p-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mb-5 mb-lg-0 p-3">
                            <img src={HeroBg} alt="Image" class="img-fluid rounded" />
                        </div>
                        <div class="col-lg-6 d-flex justify-content-center mt-4">
                            <div className='w-50'>
                                <div class="heading mb-4">
                                    <span class="caption">Why Founded</span>
                                    <h2>Mission and Vision </h2>
                                </div>
                                <p> At TutorFinder, our mission is to empower learners by facilitating
                                    meaningful connections between students and expert tutors.</p>
                                <p>We strive to create a dynamic learning ecosystem that
                                    transcends geographical boundaries, fostering global collaboration. Our commitment is to provide accessible,
                                    personalized education, enabling every student to achieve their academic goals with confidence.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div class="site-section bg-primary py-5 cta">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-7 mb-4 mb-md-0">
                            <h2 class="mb-0 text-white">What are you waiting for?</h2>

                        </div>
                        <div class="col-lg-5 text-md-right">
                            <a href="#" class="btn btn-primary" style={{ border: "1px solid #fff", padding: "8px 15px", fontSize: "14px" }}>Enroll Now</a>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="site-footer mt-5">
                <div class="container">
                    <div class="row">
                        <div class="">
                            <h2 class="footer-heading mb-4 fw-normal">About Us</h2>
                            <p className='mb-0 fw-normal fs-4' style={{ color: "#b7aaaa" }}>At TutorFinder, our mission is to empower learners by facilitating meaningful connections between students and expert tutors </p>
                            <ul class="list-unstyled social mt-3 d-flex gap-3 alin-items-center">
                                <li><a href="#" style={{ background: "blue", padding: "10px 10px", display: "flex", alignItems: "center", borderRadius: "100%" }}><FaFacebook color='#fff' fontSize={20} /></a></li>
                                <li><a href="#" style={{ background: "blue", padding: "10px 10px", display: "flex", alignItems: "center", borderRadius: "100%" }}><CiInstagram color='#fff' fontSize={20} /></a></li>
                                <li><a href="#" style={{ background: "blue", padding: "10px 10px", display: "flex", alignItems: "center", borderRadius: "100%" }}><CiTwitter color='#fff' fontSize={20} /></a></li>
                                <li><a href="#" style={{ background: "blue", padding: "10px 10px", display: "flex", alignItems: "center", borderRadius: "100%" }}><CiLinkedin color='#fff' fontSize={20} /></a></li>
                            </ul>
                        </div>



                    </div>
                    <div class="row pt-5 mt-5 text-center">
                        <div class="col-md-12">
                            <div class="border-top pt-5">

                            </div>
                        </div>

                    </div>
                </div>
            </footer>

        </div>
    )
}

export default MainLandingPage
