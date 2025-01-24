// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
// import { fetchSlidingData } from "../services/operations/announceApi";

// const AnnouncementCarousel = () => {
//     const [announcements, setAnnouncements] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await fetchSlidingData();
//                 console.log("Fetched sliding data:", result);
//                 setAnnouncements(result);
//             } catch (error) {
//                 console.error("Error fetching sliding data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="my-8 px-4 h-36 text-black">
//             <h2 className="text-3xl font-bold mb-6 text-center">Latest Announcements</h2>

//             <Swiper
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 loop={true}
//                 direction="vertical"
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 navigation={true} // Enable navigation buttons
//                 modules={[FreeMode, Pagination, Autoplay, Navigation]}
//                 className="rounded-lg overflow-hidden"
//                 style={{ height: "500px", width: "100%" }}
//                 breakpoints={{
//                     0: {
//                         slidesPerView: 1,
//                         spaceBetween: 10,
//                         height: "auto",
//                     },
//                     640: {
//                         slidesPerView: 1,
//                     },
//                     1024: {
//                         slidesPerView: 1,
//                     },
//                 }}
//             >
//                 {announcements.map((announcement) => (
//                     <SwiperSlide key={announcement._id}>
//                         <div className="w-full flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-lg bg-white">

//                             {/* Image Section */}
//                             <div className="w-full md:w-full h-auto">
//                                 <img
//                                     src={announcement.photo}
//                                     alt="Announcement"
//                                     className="object-cover w-full h-48 rounded-t-lg"
//                                 />
//                             </div>

//                             {/* Text Section */}
//                             <div className="w-full p-6 bg-richblack-800 flex flex-col justify-start">
//                                 <h3 className="font-bold text-2xl mb-2 text-richblack-5">
//                                     {announcement.name}
//                                 </h3>
//                                 <p className="text-richblack-5">
//                                     <span className="font-semibold">Position: </span>
//                                     {announcement.position}
//                                 </p>
//                                 <p className="mt-2 text-richblack-5">
//                                     <span className="font-semibold">Batch: </span>
//                                     {announcement.batch}
//                                 </p>
//                                 <p className="mt-2 text-richblack-5">{announcement.story}</p>
//                             </div>

//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default AnnouncementCarousel;
