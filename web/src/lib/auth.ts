import { cookies } from "next/headers";
import { User } from "./props";
import decode from 'jwt-decode';

export function getUser(): User {
  const token = cookies().get('token')?.value;

  if (!token) {
     throw new Error('unauthenticated');
    }
  
  const user: User = decode(token);

  return user
}