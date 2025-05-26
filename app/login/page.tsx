'use client';

import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Field from '@/components/Field';
import Button from '@/components/Button';
import { useUserService } from '@/services/UserService';
 
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Please enter your email.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Your password is too short.'),
});

interface LoginValues {
  email: string;
  password: string;
}
 
export default function Login() {
  const router = useRouter();
  const userService = useUserService();

  const initialValues: LoginValues = { 
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      await userService.login(values.email, values.password);
      router.push('/jobs');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Log in
      </h2>
      <Link href="/signup">
        <span className="text-blue-500 hover:text-blue-700">
          Don&apos;t have an account? Sign Up
        </span>
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
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
            <Button
              type="submit"
              title="Log in"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
