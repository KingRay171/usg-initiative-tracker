"use server";

import { signIn } from '@/auth';
import AuthError  from 'next-auth';

export async function authenticate(prevState, formData) {
  try {
    console.log(formData)
    await signIn('credentials', formData);
  } catch (error) {
    if (error) {
      console.log(error)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        //default:
        //  return 'Something went wrong.';
      }
    }
    throw error;
  }
}