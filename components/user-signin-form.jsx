import {TextInput, Button, Flex} from "@tremor/react";
import {Switch} from "@headlessui/react";
import Link from "next/link";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signIn} from "next-auth/react";

import {cn} from "@/shared/utils";
import {Label} from "@/components/ui/label";

const initialValues = {
  email: "",
  password: "",
};

const schemaValidationForm = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export const UserSigninForm = ({className, ...props}) => {
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidationForm,
    onSubmit: async (values, {setSubmitting}) => {
      signIn("credentials", {
        ...values,
        redirect: true,
      });
      setSubmitting(false);
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-5">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <TextInput
              {...formik.getFieldProps("email")}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              error={formik.touched.email && formik.errors.email}
              errorMessage={formik.errors.email}
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Password</Label>
            <TextInput
              {...formik.getFieldProps("password")}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              error={formik.touched.password && formik.errors.password}
              errorMessage={formik.errors.password}
              id="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <Flex alignItems="center" justifyContent="between">
            <Switch.Group>
              <Flex alignItems="center" className="gap-2" justifyContent="start">
                <Switch
                  checked={rememberMe}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200",
                    {"bg-primary-500": rememberMe},
                  )}
                  onChange={setRememberMe}
                >
                  <span className="sr-only">Enable remember me</span>
                  <span
                    className={`${
                      rememberMe ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <Switch.Label className="text-sm font-medium text-gray-700">
                  Remember for 30 days
                </Switch.Label>
              </Flex>
            </Switch.Group>
            <Link className="text-sm font-semibold text-primary-700 shrink-0" href="/">
              Forgot Password
            </Link>
          </Flex>
          <Button color="violet" disabled={formik.isSubmitting} type="submit">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
