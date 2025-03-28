import { Member } from '@/types/member';

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
};

export const transformUserData = (user: any): Member => {
  const fullName = `${user.name.first} ${user.name.last}`;
  const { first, last } = splitName(fullName);
  const age = generateAge(user.dob);

  return {
    id: user.login.uuid,
    name: {
      first,
      last
    },
    age,
    thumbnail: user.picture.thumbnail,
    profilePicture: user.picture.large
  };
}; 