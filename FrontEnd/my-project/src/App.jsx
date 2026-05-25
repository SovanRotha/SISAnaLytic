import Login from "./components/Login";
import Admin from "./Page/Admin";
import Student from "./Page/student";
import Teacher from "./Page/Teacher";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Adduser from "./components/Adduser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import CourseManagement from "./components/CourseManagement";
import CourseDepartment from "./components/CourseDepartment";



// function GuestRoute({ children }) {
//   const token = localStorage.getItem('token');
//   const user  = JSON.parse(localStorage.getItem('user') || 'null');

//   if (token && user) {
//     if (user.role === 'admin')   return <Navigate to="/dashboard" replace />;
//     if (user.role === 'teacher') return <Navigate to="/teacher"   replace />;
//     if (user.role === 'student') return <Navigate to="/student"   replace />;
//   }

//   return children;
// }


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        

        <Route path="/dashboard/*" element={
          <ProtectedRoute allowedRole="admin">
            <Admin />
          </ProtectedRoute>
        } />

        <Route path="/student" element={
          <ProtectedRoute allowedRole={['student', 'admin']} >
            <Student />
          </ProtectedRoute>
        } />

        <Route path="/teacher" element={
          <ProtectedRoute allowedRole={['teacher', 'admin']}>
            <Teacher />
          </ProtectedRoute>
        } />

        <Route path="/adduser" element={
          <ProtectedRoute allowedRole="admin">
            <Adduser />
          </ProtectedRoute>
        } />

        {/* <Route path="/addDepartment" element={
          <ProtectedRoute allowedRole="admin">
            <AddDepartment />
          </ProtectedRoute>
        } /> */}

        <Route path="/dashboard/course" element={
          <ProtectedRoute allowedRole="admin">
            <CourseDepartment />
          </ProtectedRoute>
        } />

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;