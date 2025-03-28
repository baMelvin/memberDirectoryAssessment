'use client';

import { useEffect, useState } from 'react';
import { Member } from '@/types/member';
import { transformUserData } from '@/utils/api';

export default function Profile() {
    const [userId, setUserId] = useState<string | null>(null);
    const [seedKey, setSeedKey] = useState<string | null>(null);
    const [user, setUser] = useState<Member | null>(null);

    useEffect(() => {
        // Get URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        const memberParam = searchParams.get('member');
        const seedParam = searchParams.get('seed');
        
        if (memberParam) setUserId(memberParam);
        if (seedParam) setSeedKey(seedParam);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId || !seedKey) return;
            
            const response = await fetch(`https://randomuser.me/api/?uuid=${userId}&inc=login,name,dob,picture&seed=${seedKey}`);
            const data = await response.json();
            setUser(transformUserData(data.results[0]));
        };

        if (userId && seedKey) {
            fetchUser();
        }
    }, [userId, seedKey]);

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <img src={user.profilePicture} alt={`${user.name.first} ${user.name.last}`} />
                    <h2>{user.name.first} {user.name.last}</h2>
                    <p>{user.age}</p>
                </div>
            )}
        </div>
    )
}