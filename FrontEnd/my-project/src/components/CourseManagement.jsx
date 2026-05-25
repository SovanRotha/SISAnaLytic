import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GraduationCap, Layers3, ChevronRight, BookOpen } from "lucide-react";

const yearConfig = {
  1: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    label: "First Year",
  },
  2: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    label: "Second Year",
  },
  3: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-100",
    label: "Third Year",
  },
  4: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-100",
    label: "Fourth Year",
  },
};

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const { departmentId } = useParams();

  useEffect(() => {
    if (!departmentId) return;

    fetch(`http://127.0.0.1:8000/api/courseyear/${departmentId}`)
      .then((res) => res.json())
      .then((data) => setCourses(data.courseYear || []))
      .catch((err) => console.error(err));
  }, [departmentId]);

  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      <AdminSidebar />

      <div className="flex-1 px-8 py-7">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              Dashboard / Course Management
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Course Management
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Manage academic years and view course information.
            </p>
          </div>

          <button className="bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-sm">
            + Add New Year
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 max-w-3xl">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Years</p>

                <h2 className="text-4xl font-bold text-gray-900">
                  {courses.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <GraduationCap className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Departments</p>

                <h2 className="text-4xl font-bold text-gray-900">4</h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
                <Layers3 className="text-violet-600" size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-5">
          <div>
             
           

            <h3 className="text-lg font-semibold text-gray-900">
              Academic Years
            </h3>

            <p className="text-sm text-gray-400">
              Select a year to manage courses
            </p>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {courses.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
              <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />

              <p className="text-gray-500 font-medium">No course years found</p>

              <p className="text-sm text-gray-400 mt-1">
                Add your first academic year to get started.
              </p>
            </div>
          ) : (
            courses.map((c) => {
              const cfg = yearConfig[c.course_year] || yearConfig[1];

              return (
                <div
                  key={c.id}
                  onClick={() => navigate(`/dashboard/course/${departmentId}/${c.id}`)}
                  className={`group bg-white rounded-2xl border ${cfg.border} p-5 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-2xl ${cfg.bg} flex items-center justify-center`}
                      >
                        <GraduationCap className={cfg.text} size={28} />
                      </div>

                      {/* Text */}
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          Year {c.course_year}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {cfg.label}
                        </p>
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition">
                      <ChevronRight className="text-gray-400" size={22} />
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${cfg.bg} ${cfg.text}`}
                    >
                      View Courses
                    </span>

                    <p className="text-sm text-gray-400">Click to manage</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseManagement;
