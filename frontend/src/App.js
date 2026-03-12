// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";

// // PUBLIC PAGES
// import Home from "./pages/Home";
// import Events from "./pages/Events";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import EventDetails from "./pages/EventDetails";

// // ADMIN PAGES
// import AdminDashboard from "./pages/AdminDashboard";
// import AddEvent from "./pages/AddEvent";
// import AdminAllEvents from "./pages/AdminAllEvents";
// import EditEvent from "./pages/EditEvent";

// // STUDENT PAGE
// import StudentDashboard from "./pages/StudentDashboard";
// import EventRegister from "./pages/EventRegister";
// import AdminRegisteredEvents from "./pages/AdminRegisteredEvents";
// import AdminRegisteredStudents from "./pages/AdminRegisteredStudents";
// import RegisteredUsers from "./pages/RegisteredUsers";
// import AdminMyAccount from "./pages/AdminMyAccount";

// import Contact from "./pages/Contact";
// import ContactMessages from "./pages/ContactMessages";



 


// function App() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const role = localStorage.getItem("role");

//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<Home />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/events/:id" element={<EventDetails />} />
//         <Route path="/contact" element={<Contact />} />


//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             isLoggedIn && role === "admin" ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//           path="/add-event"
//           element={
//             isLoggedIn && role === "admin" ? (
//               <AddEvent />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//           path="/admin/all-events"
//           element={
//             isLoggedIn && role === "admin" ? (
//               <AdminAllEvents />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//             <Route 
//             path="/admin/contact-messages" 
//             element={
//             <ContactMessages />
//             } 
            
//             />
//         {/* ✅ THIS WAS MISSING */}
//         <Route
//           path="/admin/edit-event/:index"
//           element={
//             isLoggedIn && role === "admin" ? (
//               <EditEvent />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* STUDENT ROUTES */}
//         <Route
//           path="/student-dashboard"
//           element={
//             isLoggedIn && role === "student" ? (
//               <StudentDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//              path="/event/:id/register"
//                  element={<EventRegister />}
//                 />

//                 <Route path="/admin/registered-events" element={<AdminRegisteredEvents />} />
//                <Route
//                  path="/admin/registered-students/:eventId"
//                   element={<AdminRegisteredStudents />}
//                   />

//                   <Route
//                path="/admin/registered-users"
//                 element={
//                    isLoggedIn && role === "admin" ? (
//                   <RegisteredUsers />
//                   ) : (
//                    <Navigate to="/login" />
//                   )
//                      }
//                    />

//                    <Route
//               path="/admin/my-account"
//               element={
//               isLoggedIn && role === "admin" ? (
//                 <AdminMyAccount />
//             ) : (
//                 <Navigate to="/login" />
//              )
//          }
//            />
//       </Routes>
  
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// PUBLIC PAGES
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import About from "./pages/About";
import EventDetails from "./pages/EventDetails";
import EventRegister from "./pages/EventRegister";
import Contact from "./pages/Contact";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import AddEvent from "./pages/AddEvent";
import AdminAllEvents from "./pages/AdminAllEvents";
import EditEvent from "./pages/EditEvent";
import AdminRegisteredEvents from "./pages/AdminRegisteredEvents";
import AdminRegisteredStudents from "./pages/AdminRegisteredStudents";
import RegisteredUsers from "./pages/RegisteredUsers";
import AdminMyAccount from "./pages/AdminMyAccount";
import ContactMessages from "./pages/ContactMessages";
import AdminEventStudents from "./pages/AdminEventStudents";
// STUDENT PAGE
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/register" element={<EventRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />

          <Route
  path="/admin/event-students/:id"
  element={isLoggedIn && role === "admin" ? <AdminEventStudents /> : <Navigate to="/login" />}
/>

        <Route
          path="/add-event"
          element={isLoggedIn && role === "admin" ? <AddEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/all-events"
          element={isLoggedIn && role === "admin" ? <AdminAllEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/edit-event/:index"
          element={isLoggedIn && role === "admin" ? <EditEvent /> : <Navigate to="/login" />}
        />
        <Route path="/admin/contact-messages" element={<ContactMessages />} />
        <Route
          path="/admin/registered-events"
          element={isLoggedIn && role === "admin" ? <AdminRegisteredEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/registered-students/:eventId"
          element={isLoggedIn && role === "admin" ? <AdminRegisteredStudents /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/registered-users"
          element={isLoggedIn && role === "admin" ? <RegisteredUsers /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/my-account"
          element={isLoggedIn && role === "admin" ? <AdminMyAccount /> : <Navigate to="/login" />}
        />

        {/* STUDENT ROUTES */}
        <Route
          path="/student-dashboard"
          element={isLoggedIn && role === "student" ? <StudentDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;