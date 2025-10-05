import React, { useState, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import poscop from "../asset/poscop.jpg"
import psocos from "../asset/poscos.jpg"
import poscostd from "../asset/poscostd.jpg"
import torr from "../asset/torr.jpg"
import torr1 from "../asset/torr1.jpg"
import torr3 from "../asset/torr3.jpg"
import torr4 from "../asset/torr4.jpg"
const Gallery = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    // Sample gallery data - replace with your actual data
    const events = [
        {
            id: 1,
            title: "Posco Fellowship 2025",
            description: "Annual Posco Fellowship Award Ceremony",
            date: "Dec 02, 2024",
            coverImage: poscop,
            images: [
                poscop,
                psocos,
                poscostd,
                psocos,
            ]
        },
        {
            id: 2,
            title: "Highlights from the Torrent Power placement drive",
            description: "Highlights from the Torrent Power placement drive.",
            date: "June 21, 2025",
            coverImage: torr3,
            images: [
                torr,
                torr1,
                torr3,
                torr4,
            ]
        },
        {
            id: 3,
            title: "Hackathon 2024",
            description: "24-hour coding marathon where innovation meets competition",
            date: "January 10, 2024",
            coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
            images: [
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
                "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
            ]
        },
        {
            id: 4,
            title: "Career Guidance Seminar",
            description: "Expert advice on career paths and professional development",
            date: "December 5, 2023",
            coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
            images: [
                "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
                "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800",
                "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800",
                "https://images.unsplash.com/photo-1559223607-a43c990c2f46?w=800",
            ]
        },
        {
            id: 5,
            title: "Industry Visit 2023",
            description: "Students exploring real-world work environments and industry practices",
            date: "November 18, 2023",
            coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            images: [
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
            ]
        },
        {
            id: 6,
            title: "Entrepreneurship Summit",
            description: "Inspiring sessions with successful entrepreneurs and startup founders",
            date: "October 25, 2023",
            coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
            images: [
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
                "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
            ]
        },
    ];

    const openEventGallery = (event) => {
        setSelectedEvent(event);
        setCurrentImageIndex(0);
    };

    const closeEventGallery = () => {
        setSelectedEvent(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedEvent) {
            setCurrentImageIndex((prev) =>
                prev === selectedEvent.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedEvent) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedEvent.images.length - 1 : prev - 1
            );
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background with animation */}
            <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                {/* Animated blobs */}
                <div
                    className="animated-blob w-[600px] h-[600px] bg-blue-600/40 left-[10%] top-[30%]"
                    style={{ animationDelay: "0s" }}
                />
                <div
                    className="animated-blob w-[700px] h-[700px] bg-purple-600/40 right-[15%] top-[40%]"
                    style={{ animationDelay: "-5s" }}
                />
                <div
                    className="animated-blob w-[500px] h-[500px] bg-pink-600/40 left-[20%] bottom-[15%]"
                    style={{ animationDelay: "-10s" }}
                />
                <div
                    className="animated-blob w-[550px] h-[550px] bg-emerald-600/40 right-[25%] bottom-[25%]"
                    style={{ animationDelay: "-15s" }}
                />
                <div
                    className="animated-blob w-[650px] h-[650px] bg-indigo-600/40 left-[40%] top-[35%]"
                    style={{ animationDelay: "-7s" }}
                />
                <div
                    className="animated-blob w-[450px] h-[450px] bg-violet-600/40 left-[-5%] top-[45%]"
                    style={{ animationDelay: "-12s" }}
                />
                <div
                    className="animated-blob w-[580px] h-[580px] bg-cyan-600/40 right-[-10%] top-[50%]"
                    style={{ animationDelay: "-3s" }}
                />

                {/* Particles effect */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: Math.random() * 2 + 1 + "px",
                                height: Math.random() * 2 + 1 + "px",
                                background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 60 + 40}%`,
                                animation: `pulse ${5 + Math.random() * 5}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20">
                <Navbar />

                {/* Main Content Container */}
                <div className="container mx-auto px-4 pt-24 pb-12">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            {/* Our{" "} */}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">
                                Gallery
                            </span>
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Capturing moments of excellence and achievement
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="group backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                onClick={() => openEventGallery(event)}
                            >
                                {/* Event Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={event.coverImage}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    {/* Image count badge */}
                                    <div className="absolute top-4 right-4 backdrop-blur-md bg-black/40 px-3 py-1 rounded-full border border-white/20">
                                        <span className="text-white text-sm font-semibold flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                            </svg>
                                            {event.images.length}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-pink-300 text-sm font-semibold mb-1">
                                            {event.date}
                                        </p>
                                        <h3 className="text-white text-xl font-bold">
                                            {event.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Event Description */}
                                <div className="p-6">
                                    <p className="text-white/80 text-sm line-clamp-2">
                                        {event.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-blue-300 text-sm font-semibold">
                                        <span>View Gallery</span>
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Gallery Modal */}
                {selectedEvent && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                        <div className="max-w-7xl w-full h-full flex flex-col">
                            {/* Modal Header */}
                            <div className="backdrop-blur-lg bg-white/10 rounded-t-2xl border border-white/20 p-4 md:p-6 flex-shrink-0">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <p className="text-pink-300 text-xs md:text-sm font-semibold mb-1">
                                            {selectedEvent.date}
                                        </p>
                                        <h2 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                                            {selectedEvent.title}
                                        </h2>
                                        <p className="text-white/80 text-sm md:text-base">{selectedEvent.description}</p>
                                    </div>
                                    <button
                                        onClick={closeEventGallery}
                                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all flex-shrink-0"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Main Image Viewer */}
                            <div className="backdrop-blur-lg bg-white/10 border-x border-white/20 flex-1 flex items-center justify-center relative overflow-hidden">
                                <img
                                    src={selectedEvent.images[currentImageIndex]}
                                    alt={`${selectedEvent.title} - ${currentImageIndex + 1}`}
                                    className="max-h-full max-w-full object-contain"
                                />

                                {/* Navigation Arrows */}
                                {selectedEvent.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all border border-white/20"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all border border-white/20"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                <div className="absolute top-4 right-4 backdrop-blur-md bg-black/50 px-4 py-2 rounded-full border border-white/20">
                                    <span className="text-white font-semibold">
                                        {currentImageIndex + 1} / {selectedEvent.images.length}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="backdrop-blur-lg bg-white/10 rounded-b-2xl border border-white/20 p-4 flex-shrink-0 relative">
                                {selectedEvent.images.length > 3 && (
                                    <>
                                        <button
                                            onClick={scrollLeft}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all border border-white/20"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={scrollRight}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all border border-white/20"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-3 overflow-x-auto scrollbar-hide px-8"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {selectedEvent.images.map((image, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${currentImageIndex === index
                                                ? 'border-pink-400 scale-105'
                                                : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;