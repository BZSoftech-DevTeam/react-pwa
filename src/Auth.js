import React, { useState } from 'react';
import bgImage from './bg.png';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                'https://g79aaf589a44d64-bzsoftech.adb.me-dubai-1.oraclecloudapps.com/ords/erp/Auth/Auth',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        P_USERNAME: username,
                        P_PASSWORD: password,
                    }),
                }
            );

            const result = await response.json();
            setLoading(false);

            if (response.ok) {
                alert('Login successful');
                console.log('Response:', result);
                // Store token or handle successful login
            } else {
                alert(`Login failed: ${result.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            setLoading(false);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div
                className="relative h-64 overflow-hidden bg-cover bg-center rounded-b-[28px]"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            <div className="flex-2 px-6 -mt-20">
                <div className="mt-32 mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
                        Welcome Back, <span className="ml-2">👋</span>
                    </h1>
                    <h1 className="text-sm text-gray-600">
                        Your all-in-one Finance, Task, and Password Manager!
                    </h1>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn px-4 py-3 bg-gradient-to-tl from-blue-600 to-violet-600 text-white text-md tracking-wide rounded-sm w-full sm:w-auto ${loading ? 'opacity-50' : ''
                            }`}
                    >
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
