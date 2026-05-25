import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const existingUser = location.state?.user;

    const [form, setForm] = useState({
        name:              existingUser?.name              || '',
        email:             existingUser?.email             || '',
        role:              existingUser?.role              || '',
        major:             existingUser?.major             || '',
        phone_number:      existingUser?.phone_number      || '',
        date_of_birth:     existingUser?.date_of_birth     || '',
        current_address:   existingUser?.current_address   || '',
        permanent_address: existingUser?.permanent_address || '',
    });

    const [loading,  setLoading]  = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error,    setError]    = useState('');
    const [success,  setSuccess]  = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/show/${id}`, {
                    headers: { Accept: 'application/json' },
                });
                const data = await response.json();
                if (!response.ok) { setError(data.message || 'Failed to load.'); return; }
                const u = data.data;
                setForm({
                    name:              u.name              || '',
                    email:             u.email             || '',
                    role:              u.role              || '',
                    major:             u.major             || '',
                    phone_number:      u.phone_number      || '',
                    date_of_birth:     u.date_of_birth     || '',
                    current_address:   u.current_address   || '',
                    permanent_address: u.permanent_address || '',
                });
            } catch { setError('Server not reachable.'); }
            finally  { setFetching(false); }
        };
        fetchUser();
    }, [id]);

    const handle = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/update/${id}`, {
                method: 'PUT',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.errors) setError(Object.values(data.errors)[0][0]);
                else setError(data.message || 'Update failed');
                return;
            }
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1200);
        } catch { setError('Server not reachable. Please try again.'); }
        finally  { setLoading(false); }
    };

    if (fetching) return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f8f7f4', fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: 36, height: 36, border: '2px solid #e2e0db',
                    borderTop: '2px solid #1a1a1a', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
                }} />
                <p style={{ fontSize: 13, color: '#9e9b95' }}>Loading profile…</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    const inputStyle = {
        width: '100%', padding: '10px 14px', fontSize: 14,
        border: '1px solid #e2e0db', borderRadius: 8,
        background: '#faf9f7', color: '#1a1a1a',
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s, background 0.15s',
        fontFamily: "'DM Sans', system-ui, sans-serif",
    };

    const labelStyle = {
        display: 'block', fontSize: 11, fontWeight: 500,
        color: '#9e9b95', letterSpacing: '0.07em',
        textTransform: 'uppercase', marginBottom: 6,
    };

    const sectionStyle = {
        marginBottom: 4,
    };

    const sections = [
        {
            title: 'Basic info',
            icon: '○',
            fields: [
                { label: 'Full name', key: 'name', type: 'text', placeholder: 'Last Name + First Name', required: true, half: true },
                { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@gmail.com', required: true, half: true },
            ]
        },
        {
            title: 'Academic',
            icon: '◇',
            fields: [
                { label: 'Role', key: 'role', type: 'select', required: true, half: true,
                  options: ['admin', 'teacher', 'student'] },
                { label: 'Major', key: 'major', type: 'select', required: true, half: true,
                  options: ['Software Development', 'Cybersecurity', 'AI Engineer', 'Computer Science', 'Law', 'Business Administration'] },
            ]
        },
        {
            title: 'Personal',
            icon: '△',
            fields: [
                { label: 'Phone number', key: 'phone_number', type: 'tel', placeholder: '0987654321', half: true },
                { label: 'Date of birth', key: 'date_of_birth', type: 'date', half: true },
                { label: 'Current address', key: 'current_address', type: 'text', placeholder: 'Phnom Penh', half: true },
                { label: 'Permanent address', key: 'permanent_address', type: 'text', placeholder: 'Kampong Thom', half: true },
            ]
        },
    ];

    return (
        <div style={{
            minHeight: '100vh', background: '#f8f7f4',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            padding: '40px 16px',
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap');
                @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
                .edit-input:focus { border-color: #1a1a1a !important; background: #fff !important; }
                .edit-input:hover { border-color: #c5c2bc; }
                .save-btn:hover { background: #111 !important; }
                .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .cancel-btn:hover { background: #f0ede8 !important; }
            `}</style>

            <div style={{
                maxWidth: 640, margin: '0 auto',
                animation: 'fadeUp 0.4s ease both',
            }}>
                {/* Header */}
                <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: 11, color: '#9e9b95', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                            User #{id}
                        </div>
                        <h1 style={{
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            fontSize: 28, fontWeight: 400, color: '#1a1a1a',
                            margin: 0, lineHeight: 1.2,
                        }}>
                            Edit profile
                        </h1>
                        <p style={{ fontSize: 13, color: '#9e9b95', margin: '6px 0 0' }}>
                            Changes are saved to the database immediately
                        </p>
                    </div>
                    <button
                        className="cancel-btn"
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e0db',
                            background: 'transparent', color: '#6b6860', fontSize: 13,
                            cursor: 'pointer', transition: 'background 0.15s', marginTop: 4,
                        }}
                    >
                        ← Back
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '12px 16px', borderRadius: 8, marginBottom: 20,
                        background: '#fff5f5', border: '1px solid #fecaca',
                        color: '#dc2626', fontSize: 13,
                        animation: 'fadeUp 0.2s ease both',
                    }}>
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '12px 16px', borderRadius: 8, marginBottom: 20,
                        background: '#f0fdf4', border: '1px solid #86efac',
                        color: '#16a34a', fontSize: 13,
                    }}>
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Updated successfully — redirecting…
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {sections.map((section, si) => (
                        <div key={section.title} style={{
                            background: '#fff', borderRadius: 12,
                            border: '1px solid #e8e6e1', marginBottom: 12,
                            overflow: 'hidden',
                            animation: `fadeUp 0.4s ease ${si * 0.07}s both`,
                        }}>
                            {/* Section header */}
                            <div style={{
                                padding: '14px 20px', borderBottom: '1px solid #f0ede8',
                                display: 'flex', alignItems: 'center', gap: 10,
                            }}>
                                <span style={{ fontSize: 11, color: '#c5c2bc' }}>{section.icon}</span>
                                <span style={{ fontSize: 11, fontWeight: 500, color: '#9e9b95', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    {section.title}
                                </span>
                            </div>

                            {/* Fields */}
                            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                {section.fields.map((field) => (
                                    <div key={field.key} style={field.half ? {} : { gridColumn: '1 / -1' }}>
                                        <label style={labelStyle}>
                                            {field.label}
                                            {field.required && <span style={{ color: '#e87c6a', marginLeft: 3 }}>*</span>}
                                        </label>
                                        {field.type === 'select' ? (
                                            <select
                                                className="edit-input"
                                                style={inputStyle}
                                                value={form[field.key]}
                                                onChange={handle(field.key)}
                                                required={field.required}
                                            >
                                                <option value="" disabled>Select {field.label.toLowerCase()}</option>
                                                {field.options.map(opt => (
                                                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                className="edit-input"
                                                type={field.type}
                                                placeholder={field.placeholder || ''}
                                                style={inputStyle}
                                                value={form[field.key]}
                                                onChange={handle(field.key)}
                                                required={field.required}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Submit */}
                    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/dashboard')}
                            style={{
                                padding: '11px 24px', borderRadius: 8,
                                border: '1px solid #e2e0db', background: 'transparent',
                                color: '#6b6860', fontSize: 14, cursor: 'pointer',
                                transition: 'background 0.15s',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="save-btn"
                            disabled={loading || success}
                            style={{
                                flex: 1, padding: '11px 24px', borderRadius: 8,
                                border: 'none', background: '#1a1a1a',
                                color: '#fff', fontSize: 14, fontWeight: 500,
                                cursor: 'pointer', transition: 'background 0.15s',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}
                        >
                            {loading ? (
                                <>
                                    <svg style={{ animation: 'spin 0.8s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                    Saving…
                                </>
                            ) : success ? '✓ Saved' : 'Save changes'}
                        </button>
                    </div>
                </form>

                <p style={{ textAlign: 'center', fontSize: 11, color: '#c5c2bc', marginTop: 28 }}>
                    © 2025 SISAnalytic · All rights reserved
                </p>
            </div>
        </div>
    );
}

export default Edit;