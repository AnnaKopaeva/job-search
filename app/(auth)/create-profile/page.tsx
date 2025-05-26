"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Field from "@/components/Field";
import { profileService } from "@/services/ProfileService"

interface ProfileValues {
  name: string;
  jobTitle: string;
  aboutMe: string;
}

export default function ProfilePage() {
  const [initialValues, setInitialValues] = useState<ProfileValues>({
    name: "",
    jobTitle: "",
    aboutMe: "",
  });

  useEffect(() => {
    const savedProfile = profileService.getProfile()
    if (savedProfile) {
      setInitialValues(savedProfile);
    }
  }, []);

  const handleSubmit = (values: ProfileValues) => {
    profileService.setProfile(values)
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md m-8">
      <h1 className="text-2xl text-gray-800 font-bold mb-4">Create Profile</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="w-md mx-auto p-4 bg-white rounded shadow space-y-4">
            <Field
              title="Name"
              name="name"
              type="text"
              value={values.name}
              className="border-gray-300"
            />
            <Field
              title="Desired Job Title"
              name="jobTitle"
              type="text"
              value={values.jobTitle}
              className="border-gray-300"
            />
            <Field
              title="About Me"
              name="aboutMe"
              type="textarea"
              value={values.aboutMe}
              className="border-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
