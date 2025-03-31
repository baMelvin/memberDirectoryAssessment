export interface Member {
  id: string;
  name: {
    first: string;
    last: string;
  };
  age: number;
  thumbnail: string;
  profilePicture: string;
  email: string;
  phone: string;
  dob: {
    date: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    postcode: string;
  };
} 