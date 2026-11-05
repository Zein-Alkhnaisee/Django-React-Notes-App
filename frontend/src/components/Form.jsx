import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isLogin = method === "login";
    const name = isLogin ? "Login" : "Register";
    const redirectPath = isLogin ? "/register" : "/login";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post(route, { username, password });
            const { access, refresh } = response.data;
            if (isLogin) {
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during form submission:", error.response?.data || error.message);

            const errorData = error.response?.data;
            let errorMsg = "An error occurred.";

            if (errorData) {
                errorMsg = JSON.stringify(errorData);
            }

            alert(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-4 py-10 text-slate-100">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/50 shadow-[0_30px_80px_rgba(15,23,42,0.8)] backdrop-blur-sm">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600/30 via-indigo-500/20 to-sky-500/10 p-10 lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_35%)]" />

                        <div className="relative z-10">
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-200">Notes app</p>
                            <h2 className="mt-4 max-w-sm text-4xl font-bold text-white">Stay organized and keep your ideas close.</h2>
                        </div>

                        <div className="relative z-10 rounded-3xl border border-white/10 bg-slate-950/30 p-5 shadow-2xl backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Secure access</p>
                            <p className="mt-3 text-2xl font-semibold text-white">Your notes, always in sync.</p>
                        </div>
                    </div>

                    <div className="bg-slate-950/60 p-6 sm:p-8 lg:p-10">
                        <div className="mb-8">
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-300">
                                {isLogin ? "Welcome back" : "New account"}
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-white">{name}</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-slate-200">
                                    Username
                                </label>
                                <input
                                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                                    Password
                                </label>
                                <input
                                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:scale-[1.01] hover:from-violet-500 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-400">
                            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
                            <Link to={redirectPath} className="font-medium text-violet-300 transition hover:text-violet-200">
                                {isLogin ? "Register" : "Login"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;