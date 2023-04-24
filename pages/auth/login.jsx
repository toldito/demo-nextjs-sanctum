import {getSession} from "next-auth/react";
import Link from "next/link";

import {AuthLayout} from "@/layouts/auth";
import {UserSigninForm} from "@/components/user-signin-form";

export default function Login() {
  return (
    <AuthLayout>
      <div className="container flex flex-col items-center justify-center w-screen h-screen">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Log in to your account</h1>
          <p className="mb-8 text-base text-gray-600">Welcome back! Please enter your details.</p>
          <UserSigninForm />
          <p className="mt-8 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link className="font-bold text-primary-700" href="/auth/register">
              Sign up
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
