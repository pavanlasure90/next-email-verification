'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All the fields are necessary.');
            return;
        }

        try {

            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({email})
            })

            const {user} = await resUserExists.json()

            if(user){
                setError("User already exist")
                return;
            }

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password 
                }),
            });

            if (res.ok) {
                e.target.reset();
                router.push("/")

                setError(''); 
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to register.');
            }
        } catch (error) {
            setError('Failed to connect to server.');
            console.error('Error during registration', error);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-500">
                <h1 className="text-xl font-bold my-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-orange-500 text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <Link className="text-sm mt-3 text-right" href="/">
                        Already have an account? <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;





