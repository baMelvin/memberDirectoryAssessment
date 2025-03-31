'use client';

import { useEffect, useState } from 'react';
import { Member } from '@/types/member';
import { transformUserData } from '@/utils/api';
import Link from 'next/link';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function Profile() {
    const [user, setUser] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const memberParam = searchParams.get('member');
        
        if (memberParam) {
            // Get members from localStorage
            const storedMembers = localStorage.getItem('members');
            if (storedMembers) {
                const members = JSON.parse(storedMembers);
                const user = members.find((member: Member) => member.id === memberParam);
                if (user) {
                    setUser(user);
                } else {
                    setError('User not found');
                }
            } else {
                setError('No members data available');
            }
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-start gap-4 items-center mb-6">
                <h1 className="text-3xl font-bold">Profile</h1>
                <Link href="/" className="text-emerald-600 hover:text-emerald-700">
                    View All Members
                </Link>
            </div>
            {user ? (
                <div className="bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <img 
                            src={user.profilePicture} 
                            alt={`${user.name.first} ${user.name.last}`} 
                            className="w-48 h-48 rounded-full mb-6 object-cover border-4 border-white shadow-lg"
                        />
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                            {user.name.first} {user.name.last}
                        </h2>
                        <div className="w-full space-y-4">
                            <div className="flex flex-col">
                                <span className="text-emerald-800 font-medium">Address</span>
                                <span className="text-gray-800">
                                    {user.location.street.number} {user.location.street.name}
                                </span>
                                <span className="text-gray-800">
                                    {user.location.city}, {user.location.state} {user.location.postcode}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-emerald-800 font-medium">Email</span>
                                <span className="text-gray-800">{user.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-emerald-800 font-medium">Date of Birth</span>
                                <span className="text-gray-800">{formatDate(user.dob.date)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-emerald-800 font-medium">Phone</span>
                                <span className="text-gray-800">{user.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-800">
                    <p>Select a member from the directory to view their profile</p>
                </div>
            )}
        </div>
    );
}