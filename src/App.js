import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities"
import Announcement from "./pages/Announcement.jsx";
import Events from "./pages/Event";
import Team from "./pages/Team";
import Glance from "./pages/Glance";
import About from "./pages/About";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Dashboard/PrivateRoute";
import Login from "./pages/Login";
import JobForm from "./components/core/Dashboard/addJobs/JobForm";
import FormSection from "./components/core/Dashboard/addJobs/FormSection";
import EditJob from "./components/core/Dashboard/addJobs/EditJob";
import CreateAnnounce from "./components/core/Dashboard/announce/CreateAnnounce";
import AnnouceSection from "./components/core/Dashboard/announce/AnnouceSection";
import EditAnnounce from "./components/core/Dashboard/announce/EditAnnounce";
import EventSection from "./components/core/Dashboard/events/EventSection";
import CreateEvent from "./components/core/Dashboard/events/CreateEvent";
import EditEvent from "./components/core/Dashboard/events/EditEvent";
import Setting from "./components/core/Dashboard/settings/Setting";
import Indexer from "./components/core/Dashboard/settings/Indexer";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import SuccessStory from "./components/core/Dashboard/successstory/SuccessStory";
import SuccessStories from "./pages/SuccessStories";
import MainSuccessStory from "./components/core/Dashboard/successstory/SuccessStorySection.jsx";
import EditSuccessStory from "./components/core/Dashboard/successstory/EditSuccessStory.jsx";
import Loader from "./components/common/Loader.jsx";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
            {loading && <Loader />}

      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/Announcement" element={<Announcement />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/glance" element={<Glance />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* to be check  */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/success-story" element={<SuccessStories />} />
        <Route path="/load" element={<Loader />} />



        <Route
          path="dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

          {/* edit option  */}
          <Route path="my-profile" element={<MyProfile />} />

          <Route path="Job_Form" element={<FormSection />} />
          <Route path="Job_Form/edit-form/:formId" element={<EditJob />} />
          <Route path="Job_Form/fillForm" element={<JobForm />} />

          <Route path="announce" element={<AnnouceSection />} />
          <Route path="create-announcement" element={<CreateAnnounce />} />
          <Route path="announce/edit-form/:announceId" element={<EditAnnounce />} />


          <Route path="Events" element={<EventSection />} />
          <Route path="Events/new-event" element={<CreateEvent />} />
          <Route path="Events/edit-event/:eventId" element={<EditEvent />} />


          <Route path="settings" element={<Indexer />} />

          <Route path="Add-success-story" element={<SuccessStory />} />

          <Route path="success-stories" element={<MainSuccessStory />} />

          <Route path="successtories/edit-story/:storyId" element={<EditSuccessStory />} />
          

          



        </Route>


      </Routes>

      <Footer />


    </div>

  );
}

export default App;
