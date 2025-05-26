'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

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
    .required('Please confirm your password.'),
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

  const handleSubmit = async (values: SignupValues, { setFieldError, setSubmitting }: any) => {
    try {
      await userService.signup(values.email, values.password);
      router.push('/jobs');
    } catch (error: any) {
      if (error.errors) {
        const backendErrors = error.errors;
        Object.keys(backendErrors).forEach((field) => {
          setFieldError(field, backendErrors[field]);
        });
      } else {
        console.error('Signup failed:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Already have an account?{' '}
          <Link href="/login">
            <span className="text-blue-500 hover:underline">Log in</span>
          </Link>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <Field
                title="Email"
                name="email"
                type="email"
                error={errors.email && touched.email ? errors.email : ''}
              />
              <Field
                title="Password"
                name="password"
                type="password"
                error={errors.password && touched.password ? errors.password : ''}
              />
              <Field
                title="Confirm Password"
                name="confirmPassword"
                type="password"
                error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
              />
              <Button
                type="submit"
                title="Sign Up"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
