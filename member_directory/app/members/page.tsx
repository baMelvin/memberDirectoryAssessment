'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Member } from '@/types/member';
import { transformUserData } from '@/utils/api';

const splitName = (fullName: string) => {
  const parts = fullName.split(' ');
  return {
    first: parts[0],
    last: parts.slice(1).join(' ') 
  }
};

const generateAge = (dob: {date: string, age: number}) => {
  const { age } = dob;

  return age;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numberOfMembers, setNumberOfMembers] = useState("15");
  const [filterString, setFilterString] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const seedKey = crypto.randomUUID();

  useEffect(() => {
    if(filterString.length > 0) {
      setFilteredMembers(members.filter((member) => 
        member.name.first.toLowerCase().includes(filterString.toLowerCase()) ||
        member.name.last.toLowerCase().includes(filterString.toLowerCase())
      ))
    } else {
      setFilteredMembers(members);
    }
  },[filterString])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${numberOfMembers}&inc=login,name,dob,picture&seed=${seedKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        const transformedMembers = data.results.map(transformUserData);
        setMembers(transformedMembers);
        setFilteredMembers(transformedMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [numberOfMembers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row items-center gap-4 mb-6">
        <h3 className="text-3xl font-bold">Members</h3>
        <input
          type="text"
          placeholder="Filter members..."
          className="px-4 py-2 border rounded-lg"
          onChange={(e) => setFilterString(e.target.value)}
        />
      </div>
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center flex-row">
          {filteredMembers.map((member) => (
            <Link 
              key={member.id}
              href={`/profile?member=${String(member.id)}&seed=${seedKey}`}
            >
              <div
                className="flex flex-col bg-emerald-700 rounded-lg shadow-md p-6 w-full max-w-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <section className="flex flex-row justify-between">
                  <h2 className="text-xl font-semibold mb-2">
                    {member.name.first} {member.name.last}
                  </h2>
                  <img src={member.thumbnail} alt={`${member.name.first} ${member.name.last}`} className="w-12 h-12 rounded-full" />
                </section>
                <p className="text-black-600 mb-2">Age: {member.age}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 