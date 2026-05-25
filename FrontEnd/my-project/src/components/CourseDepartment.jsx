import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const deptConfig = {
    "Software Development": {
        gradient: "from-blue-500 to-cyan-400",
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "ti-code",
        sub: "Web & Application Development",
    },
    "Cybersecurity": {
        gradient: "from-emerald-500 to-green-400",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: "ti-shield-lock",
        sub: "Security & Network Protection",
    },
    "AI Engineering": {
        gradient: "from-violet-500 to-purple-400",
        bg: "bg-violet-50",
        text: "text-violet-700",
        icon: "ti-brain",
        sub: "Artificial Intelligence Systems",
    },
    "Computer Science": {
        gradient: "from-orange-400 to-amber-400",
        bg: "bg-orange-50",
        text: "text-orange-700",
        icon: "ti-cpu",
        sub: "Core Computing & Algorithms",
    },
    "Law": {
        gradient: "from-rose-500 to-pink-400",
        bg: "bg-rose-50",
        text: "text-rose-700",
        icon: "ti-scale",
        sub: "Legal Studies & Ethics",
    },
    "Business Administration": {
        gradient: "from-slate-600 to-slate-400",
        bg: "bg-slate-100",
        text: "text-slate-700",
        icon: "ti-briefcase",
        sub: "Management & Leadership",
    },
};

function CourseDepartment() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/coursedepartment")
            .then((res) => res.json())
            .then((data) => {
                setDepartments(data.course_departments || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex min-h-screen bg-[#f6f8fb]">
            <AdminSidebar />

            <div className="flex-1 px-8 py-7">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">
                            Dashboard / Course Management
                        </p>

                        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                            Course Departments
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage departments and academic course structures
                        </p>
                    </div>

                    <button className="cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition shadow-sm">
                        <i className="ti ti-plus text-base"></i>
                        Add Department
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-400 mb-2">
                            Total Departments
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-900">
                            {departments.length}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-400 mb-2">
                            Academic Years
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-900">
                            4
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-400 mb-2">
                            Total Courses
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-900">
                            24
                        </h2>
                    </div>

                </div>

                {/* Section title */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Departments
                        </h3>
                        <p className="text-sm text-gray-400">
                            Select a department to continue
                        </p>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse h-48"
                            />
                        ))}
                    </div>
                ) : departments.length === 0 ? (
                    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                        <i className="ti ti-folder-open text-4xl text-gray-300"></i>
                        <p className="text-gray-500 mt-3">
                            No departments found
                        </p>
                    </div>
                ) : (

                    /* Department cards */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {departments.map((dept) => {

                            const cfg =
                                deptConfig[dept.course_department] || {
                                    gradient: "from-gray-500 to-gray-400",
                                    bg: "bg-gray-100",
                                    text: "text-gray-700",
                                    icon: "ti-building",
                                    sub: "Academic Department",
                                };

                            return (
                                <div
                                    key={dept.id}
                                    onClick={() =>
                                        navigate(`/dashboard/course/${dept.id}`)
                                    }
                                    className="group relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
                                >

                                    {/* Top gradient */}
                                    <div
                                        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cfg.gradient}`}
                                    />

                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">

                                        <div
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cfg.bg}`}
                                        >
                                            <i
                                                className={`ti ${cfg.icon} text-2xl ${cfg.text}`}
                                            ></i>
                                        </div>

                                        <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 transition">
                                            <i className="ti ti-arrow-up-right text-gray-400 group-hover:text-white transition"></i>
                                        </div>

                                    </div>

                                    {/* Content */}
                                    <div>

                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                            {dept.course_department}
                                        </h2>

                                        <p className="text-sm text-gray-500 leading-relaxed mb-5">
                                            {cfg.sub}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between">

                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
                                            >
                                                {dept.course_years?.length || 4} Years
                                            </div>

                                            <span className="text-sm text-gray-400">
                                                View →
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseDepartment;