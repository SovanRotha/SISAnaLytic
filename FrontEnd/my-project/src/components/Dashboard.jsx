import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const roleBadge = {
    admin:   { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
    teacher: { bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
    student: { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
};

function Avatar({ name }) {
    const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
    const colors = ['#6366f1','#f59e0b','#10b981','#3b82f6','#ec4899','#8b5cf6','#ef4444'];
    const color = colors[name?.charCodeAt(0) % colors.length] || '#6366f1';
    return (
        <div style={{
            width: 30, height: 30, borderRadius: '50%', background: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#fff', flexShrink: 0,
        }}>{initials}</div>
    );
}

function DeleteModal({ user, onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 50, backdropFilter: 'blur(2px)',
            animation: 'fadeIn 0.15s ease',
        }}>
            <div style={{
                background: '#fff', borderRadius: 14, padding: '28px 28px 24px',
                width: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                animation: 'scaleIn 0.15s ease',
            }}>
                <div style={{
                    width: 44, height: 44, borderRadius: 12, background: '#fef2f2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                    <svg width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 6 }}>Delete user?</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24, lineHeight: 1.5 }}>
                    <strong style={{ color: '#111' }}>{user?.name}</strong> will be permanently removed. This action cannot be undone.
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={onCancel} style={{
                        flex: 1, padding: '9px', borderRadius: 8, border: '1px solid #e5e7eb',
                        background: '#fff', color: '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    }}>Cancel</button>
                    <button onClick={onConfirm} style={{
                        flex: 1, padding: '9px', borderRadius: 8, border: 'none',
                        background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/show");
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async () => {
        const id = deleteTarget?.id;
        if (!id) return;
        try {
            const response = await fetch(`http://localhost:8000/api/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const result = await response.json();
            if (response.ok) {
                setData((prev) => prev.filter((item) => item.id !== id));
            } else {
                alert(result.message || "Failed to delete user.");
            }
        } catch {
            alert("An error occurred while deleting.");
        } finally {
            setDeleteTarget(null);
        }
    };

    const filtered = data.filter(item => {
        const matchSearch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.major?.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'all' || item.role === roleFilter;
        return matchSearch && matchRole;
    });

    const counts = {
        all: data.length,
        admin: data.filter(d => d.role === 'admin').length,
        teacher: data.filter(d => d.role === 'teacher').length,
        student: data.filter(d => d.role === 'student').length,
    };

    return (
        // ✅ Outer wrapper: flex row so sidebar and content sit side by side
        <div style={{ display: 'flex', minHeight: '100vh' }}>

            <AdminSidebar />

            {/* ✅ Main content: flex: 1 so it fills remaining space */}
            <div style={{
                flex: 1,
                minHeight: '100vh',
                background: 'white',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                padding: '32px 28px',
                overflow: 'auto',
            }}>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');
                    @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
                    @keyframes scaleIn { from { opacity:0; transform:scale(0.95) } to { opacity:1; transform:scale(1) } }
                    @keyframes fadeUp  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
                    .row-hover:hover { background: #faf9f7 !important; }
                    .del-btn:hover  { background: #fef2f2 !important; color: #ef4444 !important; }
                    .edit-btn:hover { background: #eff6ff !important; color: #2563eb !important; }
                    .filter-pill:hover { border-color: #d1cfc9 !important; }
                    .search-input:focus { border-color: #1a1a1a !important; background: #fff !important; outline: none; }
                `}</style>

                {deleteTarget && (
                    <DeleteModal
                        user={deleteTarget}
                        onConfirm={handleDelete}
                        onCancel={() => setDeleteTarget(null)}
                    />
                )}

                {/* Header */}
                <div style={{ marginBottom: 28, animation: 'fadeUp 0.3s ease' }}>
                    <div style={{ fontSize: 11, color: '#9e9b95', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        Admin · User Management
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                        <h1 style={{
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            fontSize: 28, fontWeight: 400, color: '#1a1a1a', margin: 0,
                        }}>
                            All Users
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {/* Search */}
                            <div style={{ position: 'relative' }}>
                                <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                                    width="14" height="14" fill="none" stroke="#9e9b95" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                                </svg>
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder="Search users…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    style={{
                                        padding: '8px 14px 8px 34px', borderRadius: 8, fontSize: 13,
                                        border: '1px solid #e2e0db', background: '#faf9f7', color: '#1a1a1a',
                                        width: 200, transition: 'border-color 0.15s, background 0.15s',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role filter pills + Add User button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 8, animation: 'fadeUp 0.35s ease' }}>
                        {['all', 'admin', 'teacher', 'student'].map(role => (
                            <button
                                key={role}
                                className="filter-pill"
                                onClick={() => setRoleFilter(role)}
                                style={{
                                    padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                                    border: `1px solid ${roleFilter === role ? '#1a1a1a' : '#e2e0db'}`,
                                    background: roleFilter === role ? '#1a1a1a' : 'transparent',
                                    color: roleFilter === role ? '#fff' : '#6b6860',
                                    cursor: 'pointer', transition: 'all 0.15s',
                                }}
                            >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                <span style={{
                                    marginLeft: 6, fontSize: 10,
                                    color: roleFilter === role ? 'rgba(255,255,255,0.6)' : '#c5c2bc',
                                }}>
                                    {counts[role]}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/adduser')}
                        className="bg-black cursor-pointer text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center gap-2"
                    >
                        <span className="text-lg font-bold">+</span>
                        <span>Add User</span>
                    </button>
                </div>

                {/* Table card */}
                <div style={{
                    background: '#fff', borderRadius: 14, border: '1px solid #e8e6e1',
                    overflow: 'hidden', animation: 'fadeUp 0.4s ease',
                }}>
                    {loading ? (
                        <div style={{ padding: 48, textAlign: 'center' }}>
                            <div style={{
                                width: 32, height: 32, border: '2px solid #e2e0db',
                                borderTop: '2px solid #1a1a1a', borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
                            }} />
                            <p style={{ fontSize: 13, color: '#9e9b95', margin: 0 }}>Loading users…</p>
                            <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ padding: 48, textAlign: 'center' }}>
                            <div style={{ fontSize: 28, marginBottom: 10 }}>◎</div>
                            <p style={{ fontSize: 14, color: '#9e9b95', margin: 0 }}>
                                {search ? 'No users match your search' : 'No users found'}
                            </p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #f0ede8' }}>
                                        {['#', 'User', 'Email', 'Role', 'Major', 'Phone', 'DOB', 'Address', ''].map((h, i) => (
                                            <th key={i} style={{
                                                padding: '12px 16px', textAlign: 'left',
                                                fontSize: 10, fontWeight: 500, color: '#c5c2bc',
                                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                                whiteSpace: 'nowrap', background: '#faf9f7',
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((item, index) => {
                                        const badge = roleBadge[item.role] || roleBadge.student;
                                        return (
                                            <tr key={item.id} className="row-hover" style={{
                                                borderBottom: '1px solid #f7f5f2',
                                                transition: 'background 0.1s',
                                            }}>
                                                <td style={{ padding: '14px 16px', fontSize: 12, color: '#c5c2bc', width: 40 }}>
                                                    {index + 1}
                                                </td>
                                                <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <Avatar name={item.name} />
                                                        <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6860', whiteSpace: 'nowrap' }}>
                                                    {item.email}
                                                </td>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <span style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: 5,
                                                        padding: '3px 10px', borderRadius: 20,
                                                        background: badge.bg, color: badge.color,
                                                        fontSize: 11, fontWeight: 500,
                                                    }}>
                                                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: badge.dot }} />
                                                        {item.role}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6860', maxWidth: 160 }}>
                                                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {item.major || '—'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6860', whiteSpace: 'nowrap' }}>
                                                    {item.phone_number || '—'}
                                                </td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6860', whiteSpace: 'nowrap' }}>
                                                    {item.date_of_birth || '—'}
                                                </td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6860', maxWidth: 140 }}>
                                                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {item.current_address || '—'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <button
                                                            className="edit-btn"
                                                            onClick={() => navigate(`edit/${item.id}`, { state: { user: item } })}
                                                            style={{
                                                                padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 500,
                                                                border: '1px solid #e2e0db', background: 'transparent',
                                                                color: '#6b6860', cursor: 'pointer', transition: 'all 0.15s',
                                                                display: 'flex', alignItems: 'center', gap: 5,
                                                            }}
                                                        >
                                                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="del-btn"
                                                            onClick={() => setDeleteTarget(item)}
                                                            style={{
                                                                padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 500,
                                                                border: '1px solid #e2e0db', background: 'transparent',
                                                                color: '#6b6860', cursor: 'pointer', transition: 'all 0.15s',
                                                                display: 'flex', alignItems: 'center', gap: 5,
                                                            }}
                                                        >
                                                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                                                <path d="M10 11v6"/><path d="M14 11v6"/>
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Footer */}
                            <div style={{
                                padding: '12px 16px', borderTop: '1px solid #f0ede8',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <span style={{ fontSize: 12, color: '#c5c2bc' }}>
                                    {filtered.length} of {data.length} users
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;