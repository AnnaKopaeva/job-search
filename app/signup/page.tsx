'use client';

import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Field from '@/components/Field';
import Button from '@/components/Button';
import { useUserService } from '@/services/UserService';
 
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Please enter your email.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Your password is too short.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

interface SignupValues {
  email: string;
  password: string;
  confirmPassword: string;
}
 
export default function Signup() {
  const router = useRouter();
  const userService = useUserService();

  const initialValues: SignupValues = { 
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: SignupValues) => {
    try {
      await userService.signup(values.email, values.password);
      router.push('/jobs');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Sign Up
      </h2>
      <Link href="/login">
        <span className="text-blue-500 hover:text-blue-700">
          Already have an account? Login
        </span>
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-md mx-auto p-4 bg-white rounded shadow space-y-4">
            <Field
              title="Email"
              name="email"
              type="email"
              error={errors.email && touched.email && errors.email || ''}
            />
            <Field
              title="Password"
              name="password"
              type="password"
              error={errors.password && touched.password && errors.password || ''}
            />
            <Field
              title="Confirm Password"
              name="confirmPassword"
              type="password"
              error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword || ''}
            />
            <Button
              type="submit"
              title="Sign up"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
