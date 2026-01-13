/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FaFacebookF, FaMoon, FaSun, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { CgWorkAlt } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from "../context/AuthContext";

interface FormData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    organisation: Array<{ name: string }>;
}

// Validation functions outside component
const validatePassword = (password: string): string | null => {
    return password.length >= 8 ? null : "Password must be at least 8 characters long";
};

const validateFirstName = (value: string): string | null => {
    if (!value.trim()) return "*First name is required";
    if (value.length < 2) return "*First name must be at least 2 characters long";
    const namePattern = /^[a-zA-Z\s'-]+$/;
    return namePattern.test(value.trim()) ? null : "First name should only contain letters.";
};

const validateLastName = (value: string): string | null => {
    if (!value.trim()) return "*Last name is required";
    if (value.length < 2) return "*Last name must be at least 2 characters long";
    const namePattern = /^[a-zA-Z\s'-]+$/;
    return namePattern.test(value.trim()) ? null : "Last name should only contain letters.";
};

const validateEmail = (value: string): string | null => {
    if (!value.trim()) return "*Email is required";
    const localPart = value.split('@')[0];
    if (localPart.length < 2) return "*Email must have at least 2 characters before the '@' symbol";
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (/^\d+$/.test(localPart)) return "Please enter a valid email address";
    return emailPattern.test(value.trim()) ? null : "Please enter a valid email address";
};

const Home = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { login } = useAuth();
    const router = useRouter();

    const [formData, setUserData] = useState<FormData>({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        organisation: [{ name: "" }]
    });

    const [googleSignUp, setGoogleSignUp] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const error = validatePassword(formData.password);
        setPasswordError(error);
        setIsDisabled(!!error);
    }, [formData.password]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        const firstName = params.get('first_name');
        const lastName = params.get('last_name');
        const status = params.get('status');

        if (status === '200') {
            setGoogleSignUp(true);
            setUserData({
                email: email || "",
                password: "12345678",
                first_name: firstName || "",
                last_name: lastName || "",
                organisation: [{ name: "" }]
            });
        }

        if (status === '400') {
            setGoogleSignUp(false);
            notifyError('This email is already in use. Please use a different email.');
        }
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));

        switch (name) {
            case 'first_name':
                setFirstNameError(validateFirstName(value));
                break;
            case 'last_name':
                setLastNameError(validateLastName(value));
                break;
            case 'email':
                setEmailError(validateEmail(value));
                break;
        }
    }, []);

    const handleOrganisationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserData(prev => ({
            ...prev,
            organisation: [{ name: value }]
        }));
    }, []);

    const notifySuccess = useCallback(() => toast.success('Account Created Successfully!'), []);
    const notifyError = useCallback((message: string) => toast.error(message), []);

    const validateForm = useCallback((): boolean => {
        const firstNameValid = !validateFirstName(formData.first_name);
        const lastNameValid = !validateLastName(formData.last_name);
        const emailValid = !validateEmail(formData.email);
        return firstNameValid && lastNameValid && emailValid;
    }, [formData.first_name, formData.last_name, formData.email]);

    const sendUserData = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await fetch('https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 400) {
                if (googleSignUp) {
                    router.push('/login');
                }
                notifyError('You already have an account with that email. Please Login');
                return;
            }

            if (!response.ok) throw new Error('Network response was not ok');
            
            notifySuccess();
            setUserData({
                email: "", 
                password: "", 
                first_name: "", 
                last_name: "",
                organisation: [{ name: "" }],
            });

            if (googleSignUp) {
                handleGoogleLogin();
            } else {
                handleLogin();
            }
        } catch (error) {
            console.error('Error:', error);
            notifyError('An error occurred during signup. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = useCallback(() => {
        try {
            window.location.href = 'https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/signup/google/auth';
        } catch (error) {
            notifyError("Failed to redirect to Google authentication. Please try again.");
        }
    }, [notifyError]);

    const handleGoogleLogin = useCallback(() => {
        try {
            window.location.href = 'https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/auth/google';
        } catch (error) {
            console.error("Redirection error:", error);
            notifyError("Failed to redirect to Google authentication. Please try again.");
        }
    }, [notifyError]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const token = await login(formData.email, formData.password);
            if (token) {
                localStorage.setItem("authToken", token);
            }
        } catch (error) {
            console.log("An error occurred during login. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google Sign Up Organization Form
    if (googleSignUp) {
        return (
            <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
                isDarkMode
                    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
            }`}>
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
                        isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
                    }`} />
                </div>

                <button
                    onClick={toggleDarkMode}
                    aria-label="Toggle theme"
                    className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 ${
                        isDarkMode
                            ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700'
                            : 'bg-white/80 border-gray-200 hover:bg-white'
                    }`}
                >
                    {isDarkMode ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-slate-700 text-lg" />}
                </button>

                <div className={`relative z-10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border shadow-2xl w-full max-w-md mx-4 ${
                    isDarkMode
                        ? 'bg-slate-800/50 border-slate-700'
                        : 'bg-white/70 border-white'
                }`}>
                    <h2 className="text-2xl font-bold text-center mb-6">
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                            isDarkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'
                        }`}>
                            One More Step!
                        </span>
                    </h2>
                    
                    <div className="relative">
                        <CgWorkAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                        <input
                            className={`w-full h-14 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isDarkMode
                                    ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500'
                                    : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400'
                            }`}
                            type="text"
                            value={formData.organisation[0].name}
                            onChange={handleOrganisationChange}
                            required
                            placeholder="Organization Name"
                        />
                    </div>
                    
                    <button
                        className="mt-6 w-full h-14 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        onClick={sendUserData}
                        disabled={loading || !formData.organisation[0].name.trim()}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Completing...
                            </span>
                        ) : 'Complete Sign Up'}
                    </button>
                </div>
            </div>
        );
    }

    // Main Signup Form
    return (
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
            isDarkMode
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
                }`} />
                <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
                    isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
                }`} style={{ animationDelay: '1s' }} />
            </div>

            {/* Theme toggle */}
            <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 ${
                    isDarkMode
                        ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700'
                        : 'bg-white/80 border-gray-200 hover:bg-white'
                }`}
            >
                {isDarkMode ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-slate-700 text-lg" />}
            </button>

            {/* Main container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left section - Branding */}
                    <div className="hidden lg:flex flex-col justify-center space-y-6 p-8">
                        <div>
                            <h1 className={`text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
                                isDarkMode
                                    ? 'from-blue-400 via-purple-400 to-pink-400'
                                    : 'from-blue-600 via-purple-600 to-pink-600'
                            }`}>
                                Join MDM
                            </h1>
                            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                Start your journey to better data insights
                            </p>
                        </div>

                        <div className="space-y-4">
                            <FeatureItem icon={<FaRocket />} text="Lightning-fast analytics" isDarkMode={isDarkMode} />
                            <FeatureItem icon={<FaShieldAlt />} text="Enterprise-grade security" isDarkMode={isDarkMode} />
                            <FeatureItem icon={<FaChartLine />} text="Real-time data insights" isDarkMode={isDarkMode} />
                        </div>
                    </div>

                    {/* Right section - Signup form */}
                    <div className={`backdrop-blur-xl rounded-3xl p-8 md:p-10 border shadow-2xl ${
                        isDarkMode
                            ? 'bg-slate-800/50 border-slate-700'
                            : 'bg-white/70 border-white'
                    }`}>
                        <div className="mb-6 text-center">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                                Create Account
                            </h2>
                            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Get started with your free account
                            </p>
                        </div>

                        {/* Social signup buttons */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={handleGoogleSignUp}
                                className={`h-12 px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
                                    isDarkMode
                                        ? 'bg-white text-slate-900 hover:bg-gray-50'
                                        : 'bg-white text-slate-900 hover:bg-gray-50'
                                }`}
                            >
                                <FcGoogle size={20} />
                                <span className="hidden sm:inline">Google</span>
                            </button>

                            <button
                                className={`h-12 px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
                                    isDarkMode
                                        ? 'bg-[#1877F2] text-white hover:bg-[#166FE5]'
                                        : 'bg-[#1877F2] text-white hover:bg-[#166FE5]'
                                }`}
                            >
                                <FaFacebookF size={16} />
                                <span className="hidden sm:inline">Facebook</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`} />
                            <span className={`mx-4 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                                OR
                            </span>
                            <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`} />
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            {/* Name fields */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    {firstNameError && (
                                        <div className='text-xs text-red-500 mb-1'>{firstNameError}</div>
                                    )}
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isDarkMode
                                                    ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500'
                                                    : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400'
                                            }`}
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    {lastNameError && (
                                        <div className='text-xs text-red-500 mb-1'>{lastNameError}</div>
                                    )}
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isDarkMode
                                                    ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500'
                                                    : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400'
                                            }`}
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                {emailError && (
                                    <div className='text-xs text-red-500 mb-1'>{emailError}</div>
                                )}
                                <div className="relative">
                                    <IoMdMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                                    <input
                                        className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isDarkMode
                                                ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500'
                                                : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400'
                                        }`}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                {formData.password && passwordError && (
                                    <div className='text-xs text-red-500 mb-1'>{passwordError}</div>
                                )}
                                <div className="relative">
                                    <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        className={`w-full h-12 pl-12 pr-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isDarkMode
                                                ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500'
                                                : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400'
                                        }`}
                                        type={isPasswordVisible ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Password (min 8 characters)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {isPasswordVisible ? <IoEyeOff size={22} /> : <IoEye size={22} />}
                                    </button>
                                </div>
                            </div>

                            {/* Organization */}
                            <div className="relative">
                                <CgWorkAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                                <input
                                    className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        isDarkMode
                                            ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500'
                                            : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400'
                                    }`}
                                    type="text"
                                    name="organisation"
                                    value={formData.organisation[0].name}
                                    onChange={handleOrganisationChange}
                                    required
                                    placeholder="Organization Name"
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                onClick={sendUserData}
                                disabled={loading || isDisabled}
                                className="w-full h-12 md:h-14 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : 'Create Account'}
                            </button>
                        </div>

                        <p className={`text-center mt-6 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Feature item component
const FeatureItem = ({ icon, text, isDarkMode }: { icon: React.ReactNode; text: string; isDarkMode: boolean }) => (
    <div className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border transition-all duration-300 ${
        isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white/50 border-gray-200'
    }`}>
        <div className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {icon}
        </div>
        <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {text}
        </span>
    </div>
);

export default Home;