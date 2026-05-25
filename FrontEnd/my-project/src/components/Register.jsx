import Logo from '../assets/SISLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        major: '',
        currentAddress: '',
        permanentAddress: '',
        phone: '',
        dob: '',
        profile: null,
    });
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview]         = useState(null);

    const handle = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm((f) => ({ ...f, profile: file }));
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const required = ['name', 'email', 'password', 'major'];
        for (const key of required) {
            if (!form[key]) {
                setError('Please fill in all required fields.');
                return;
            }
        }

        setLoading(true);
        try {
            const body = new FormData();
            Object.entries(form).forEach(([k, v]) => { if (v) body.append(k, v); });

            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body,
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.errors) setError(Object.values(data.errors)[0][0]);
                else setError(data.message || 'Registration failed');
                return;
            }
            navigate('/login');
        } catch (err) {
            setError('Server not reachable. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /* ── shared input class ── */
    const inputCls =
        'w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 ' +
        'bg-gray-50 text-gray-900 placeholder-gray-400 ' +
        'focus:outline-none focus:border-blue-500 focus:bg-white transition-colors';

    const labelCls =
        'block text-xs font-medium uppercase tracking-widest text-gray-500 mb-1.5';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="flex w-full max-w-3xl rounded-xl overflow-hidden shadow-lg border border-gray-200">

                {/* ── Left brand panel (identical to Login) ── */}
                <div
                    className="relative hidden md:flex flex-col justify-between w-1/2 p-10 overflow-hidden"
                    style={{ background: '#0F2456' }}
                >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 600"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <line x1="0"   y1="480" x2="340" y2="240" stroke="rgba(59,130,246,0.15)" strokeWidth="1"/>
                        <line x1="0"   y1="540" x2="340" y2="300" stroke="rgba(59,130,246,0.10)" strokeWidth="1"/>
                        <line x1="0"   y1="600" x2="340" y2="360" stroke="rgba(59,130,246,0.08)" strokeWidth="1"/>
                        <line x1="60"  y1="600" x2="340" y2="420" stroke="rgba(59,130,246,0.07)" strokeWidth="1"/>
                        <line x1="0"   y1="420" x2="200" y2="600" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>
                        <polygon points="170,320 270,440 70,440"
                                 fill="rgba(59,130,246,0.06)"  stroke="rgba(59,130,246,0.18)"  strokeWidth="0.8"/>
                        <polygon points="60,360 200,500 0,520"
                                 fill="rgba(96,165,250,0.04)"  stroke="rgba(96,165,250,0.12)"  strokeWidth="0.8"/>
                        <polygon points="220,280 340,380 200,450"
                                 fill="rgba(59,130,246,0.05)"  stroke="rgba(59,130,246,0.14)"  strokeWidth="0.8"/>
                        <circle cx="170" cy="200" r="90"  fill="none" stroke="rgba(96,165,250,0.08)" strokeWidth="40"/>
                        <circle cx="170" cy="200" r="50"  fill="none" stroke="rgba(96,165,250,0.06)" strokeWidth="1"/>
                        <circle cx="280" cy="80"  r="60"  fill="none" stroke="rgba(59,130,246,0.10)" strokeWidth="30"/>
                        <line x1="80"  y1="100" x2="260" y2="460" stroke="rgba(96,165,250,0.07)" strokeWidth="0.5"/>
                        <line x1="20"  y1="200" x2="320" y2="350" stroke="rgba(96,165,250,0.06)" strokeWidth="0.5"/>
                        <circle cx="80"  cy="420" r="3"   fill="rgba(96,165,250,0.40)"/>
                        <circle cx="260" cy="380" r="2"   fill="rgba(96,165,250,0.30)"/>
                        <circle cx="170" cy="480" r="2.5" fill="rgba(96,165,250,0.35)"/>
                        <circle cx="300" cy="300" r="2"   fill="rgba(96,165,250,0.25)"/>
                        <circle cx="40"  cy="340" r="1.5" fill="rgba(96,165,250,0.30)"/>
                    </svg>

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                            <img src={Logo} alt="SIS Logo" className="w-7 h-7 object-contain rounded-2xl" />
                        </div>
                        <span className="text-white font-semibold text-3xl tracking-wide">SISAnalytic</span>
                    </div>

                    {/* Headline */}
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white leading-snug"
                            style={{ fontFamily: 'Georgia, serif' }}>
                            Join the<br />
                            <span style={{ color: '#60A5FA' }}>Academic</span><br />
                            Community
                        </h2>
                        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            Create your account and start tracking<br />your academic journey today.
                        </p>
                    </div>

                    {/* Bullets */}
                    <div className="relative z-10 flex flex-col gap-2">
                        {['Personalised academic dashboard', 'Secure & private by default', 'Instant access after approval'].map(item => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }} />
                                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.60)' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="flex flex-col justify-center w-full md:w-1/2 p-10 bg-white overflow-y-auto max-h-screen">

                    <h2 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Manrope' }}>
                        Create an account
                    </h2>
                    <p className="text-xs text-gray-500 mb-6" style={{ fontFamily: 'Manrope' }}>
                        Fill in your details to get started
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200
                                        text-xs rounded-lg px-3 py-2.5 mb-4">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <line x1="12" y1="8"  x2="12"    y2="12" strokeWidth="2"/>
                                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Profile picture */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-200
                                            bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {preview
                                    ? <img src={preview} alt="preview" className="w-full h-full object-cover"/>
                                    : (
                                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor"
                                             strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z
                                                     M4.501 20.118a7.5 7.5 0 0 1 14.998 0"/>
                                        </svg>
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope' }}>
                                    Profile photo <span className="text-gray-400 font-normal">(optional)</span>
                                </p>
                                <label className="cursor-pointer text-xs text-blue-500 hover:text-blue-700 transition-colors">
                                    Upload image
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                                </label>
                            </div>
                        </div>

                        {/* Full name */}
                        <div>
                            <label className={labelCls}>
                                Full name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name + First Name"
                                className={inputCls}
                                value={form.name}
                                onChange={handle('name')}
                                autoComplete="name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelCls}>
                                Email address <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@gmail.com"
                                className={inputCls}
                                value={form.email}
                                onChange={handle('email')}
                                autoComplete="email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelCls}>
                                Password <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className={`${inputCls} pr-10`}
                                    value={form.password}
                                    onChange={handle('password')}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                                               hover:text-blue-500 transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
                                                     a18.45 18.45 0 0 1 5.06-5.94"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
                                                     a18.5 18.5 0 0 1-2.16 3.19"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Major */}
                        <div>
                            <label className={labelCls}>
                                Major <span className="text-red-400">*</span>
                            </label>
                            <select
                                className={inputCls}
                                value={form.major}
                                onChange={handle('major')}
                                required
                            >
                                <option value="" disabled>Select your major</option>
                                <option value="Software Development">Software Development</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="AI Engineer">AI Engineer</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Law">Law</option>
                                <option value="Business Administration">Business Administration</option>
                            </select>
                        </div>

                        {/* Date of birth */}
                        <div>
                            <label className={labelCls}>Date of birth</label>
                            <input
                                type="date"
                                className={inputCls}
                                value={form.dob}
                                onChange={handle('dob')}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className={labelCls}>Phone number</label>
                            <input
                                type="tel"
                                placeholder="0987654321"
                                className={inputCls}
                                value={form.phone}
                                onChange={handle('phone')}
                            />
                        </div>

                        {/* Addresses — side by side */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelCls}>Current address</label>
                                <input
                                    type="text"
                                    placeholder="Phnom Penh"
                                    className={inputCls}
                                    value={form.currentAddress}
                                    onChange={handle('currentAddress')}
                                />
                            </div>
                            <div>
                                <label className={labelCls}>Permanent address</label>
                                <input
                                    type="text"
                                    placeholder="Kampong Thom"
                                    className={inputCls}
                                    value={form.permanentAddress}
                                    onChange={handle('permanentAddress')}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                                       text-sm font-medium text-white transition-colors
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: '#1D4ED8' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#1E40AF'}
                            onMouseLeave={e => e.currentTarget.style.background = '#1D4ED8'}
                            // onClick={()=> navigate('/login')}
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Creating account...
                                </>
                            ) : 'Create account'}
                        </button>

                        {/* Back to login */}
                        <div className="flex justify-center gap-1.5">
                            <p className="text-xs text-gray-500">Already have an account?</p>
                            <button
                                type="button"
                                className="text-xs text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </button>
                        </div>

                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6" style={{ fontFamily: 'Manrope' }}>
                        © 2025 SISAnalytic · All rights reserved
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Register;