import {getSession} from "next-auth/react";
import Link from "next/link";

import {AuthLayout} from "@/layouts/auth";
import {UserSignupForm} from "@/components/user-signup-form";

export default function Register() {
  return (
    <AuthLayout>
      <div className="container flex flex-col items-center justify-center w-screen h-screen">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sign up</h1>
          <p className="mb-8 text-base text-gray-600">Start your 30-day free trial.</p>
          <UserSignupForm />
          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link className="font-bold text-primary-700" href="/auth/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps = async ({req}) => {
  const session = await getSession({req});

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
};
