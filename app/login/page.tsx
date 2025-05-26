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
    .email('Invalid email')
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

  const handleSubmit = async (values: LoginValues, { setFieldError, setSubmitting }: any) => {
    try {
      await userService.login(values.email, values.password);
      router.push('/jobs');
    } catch (error: any) {
      if (error.errors) {
        const backendErrors = error.errors;
        Object.keys(backendErrors).forEach((field) => {
          setFieldError(field, backendErrors[field]);
        });
      } else {
        console.error('Login failed:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Log In</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup">
            <span className="text-blue-500 hover:underline">Sign Up</span>
          </Link>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
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
              <Button
                type="submit"
                title="Log In"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
