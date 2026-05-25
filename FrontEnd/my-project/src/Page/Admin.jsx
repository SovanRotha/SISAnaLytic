import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "../components/Dashboard";
import Edit from "../components/Edit";
import { Routes, Route } from "react-router-dom";
import Adduser from "../components/Adduser";
import CourseManagement from "../components/CourseManagement";
import CourseSelection from "../components/CourseSelection";
import CourseDepartment from "../components/CourseDepartment";


function Admin() {
    return (
        <div className="flex">
            {/* Sidebar always visible */}
            

            {/* Page content changes */}
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/adduser" element={<Adduser />} />
                    <Route path="/course" element={<CourseDepartment />} />
                    <Route path="/course/:departmentId" element={<CourseManagement />} />
                    <Route path="/course/:departmentId/:yearId" element={<CourseSelection />} />
                    
                </Routes>
            </div>
        </div>
    );
}

export default Admin;