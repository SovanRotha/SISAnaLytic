import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    GraduationCap,
    Users,
    Building2,
    Layers3,
} from "lucide-react";

function CourseSelection() {
    const { departmentId, yearId } = useParams();
    const navigate = useNavigate();

    const [courseSelect, setCourseSelect] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/courseselect/year/${yearId}`)
            .then(async (res) => {
                if (!res.ok)
                    throw new Error(await res.text() || "Failed to fetch");
                return res.json();
            })
            .then((data) => {
                setCourseSelect(data.courses || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [yearId]);

    const avgCredits = courseSelect.length
        ? Math.round(
              courseSelect.reduce((s, c) => s + c.credits, 0) /
                  courseSelect.length
          )
        : 0;

    // Loading UI
    if (loading)
        return (
            <div className="flex min-h-screen bg-[#f5f7fb]">
                <AdminSidebar />

                <div className="flex-1 p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-10 w-72 bg-gray-200 rounded-xl"></div>

                        <div className="grid grid-cols-3 gap-5">
                            <div className="h-32 bg-white rounded-2xl"></div>
                            <div className="h-32 bg-white rounded-2xl"></div>
                            <div className="h-32 bg-white rounded-2xl"></div>
                        </div>

                        <div className="h-40 bg-white rounded-2xl"></div>
                        <div className="h-40 bg-white rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );

    // Error UI
    if (error)
        return (
            <div className="flex min-h-screen bg-[#f5f7fb]">
                <AdminSidebar />

                <div className="flex-1 p-8 flex items-center justify-center">
                    <div className="bg-white border border-red-100 rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
                        <h2 className="text-xl font-semibold text-red-500 mb-2">
                            Something went wrong
                        </h2>

                        <p className="text-gray-500 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="flex min-h-screen bg-[#f5f7fb]">
            <AdminSidebar />

            <div className="flex-1 px-8 py-7">
                {/* Top Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <button
                            onClick={() => navigate("/dashboard/course")}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-3"
                        >
                            <ArrowLeft size={16} />
                            Back to Courses
                        </button>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Year {yearId} Courses
                        </h1>

                        <p className="text-gray-500 mt-2 text-sm">
                            Manage and view all available courses for this
                            academic year.
                        </p>
                    </div>

                    <button className="bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-sm">
                        + Add Course
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">
                                    Total Courses
                                </p>

                                <h2 className="text-4xl font-bold text-gray-900">
                                    {courseSelect.length}
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <BookOpen
                                    className="text-blue-600"
                                    size={26}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">
                                    Average Credits
                                </p>

                                <h2 className="text-4xl font-bold text-gray-900">
                                    {avgCredits}
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                <GraduationCap
                                    className="text-emerald-600"
                                    size={26}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">
                                    Sections
                                </p>

                                <h2 className="text-4xl font-bold text-gray-900">
                                    {
                                        new Set(
                                            courseSelect.map(
                                                (c) => c.section
                                            )
                                        ).size
                                    }
                                </h2>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
                                <Layers3
                                    className="text-violet-600"
                                    size={26}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Heading */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Available Courses
                        </h2>

                        <p className="text-sm text-gray-400">
                            List of courses in Year {yearId} for Department {departmentId}
                        </p>
                    </div>
                </div>

                {/* Empty State */}
                {courseSelect.length === 0 ? (
                    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                        <BookOpen
                            size={45}
                            className="mx-auto text-gray-300 mb-4"
                        />

                        <h3 className="text-lg font-semibold text-gray-700">
                            No courses found
                        </h3>

                        <p className="text-sm text-gray-400 mt-2">
                            There are currently no courses available for this
                            year.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        {courseSelect.map((course) => (
                            <div
                                key={course.id}
                                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                                            {course.course_code}
                                        </span>

                                        <h3 className="text-xl font-semibold text-gray-900 leading-snug">
                                            {course.course_name}
                                        </h3>
                                    </div>

                                    <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap">
                                        {course.credits} Credits
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mt-4 min-h-[70px]">
                                    {course.description ||
                                        "No description available for this course."}
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-100 my-5"></div>

                                {/* Bottom Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <Users
                                                size={18}
                                                className="text-gray-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Instructor
                                            </p>

                                            <p className="text-sm font-medium text-gray-700">
                                                {course.instructor}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <Building2
                                                size={18}
                                                className="text-gray-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Department
                                            </p>

                                            <p className="text-sm font-medium text-gray-700">
                                                {course.department}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <Layers3
                                                size={18}
                                                className="text-gray-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Section
                                            </p>

                                            <p className="text-sm font-medium text-gray-700">
                                                {course.section}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseSelection;