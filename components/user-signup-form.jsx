import {TextInput, Button} from "@tremor/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signIn} from "next-auth/react";

import {cn} from "@/shared/utils";
import {Label} from "@/components/ui/label";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const schemaValidationForm = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export const UserSignupForm = ({className, ...props}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidationForm,
    onSubmit: async (values, {setSubmitting}) => {
      signIn("credentials", {
        ...values,
        redirect: false,
      });
      setSubmitting(false);
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-5">
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <TextInput
              {...formik.getFieldProps("name")}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              error={formik.touched.name && formik.errors.name}
              errorMessage={formik.errors.name}
              id="name"
              placeholder="Enter your name"
              type="text"
            />
          </div>
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
              aria-describedby="passwordHelp"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              error={formik.touched.password && formik.errors.password}
              errorMessage={formik.errors.password}
              id="password"
              placeholder="Create a password"
              type="password"
            />
            <p className="text-sm text-gray-600" id="passwordHelp">
              Must be at least 8 characters.
            </p>
          </div>
          <Button color="violet" disabled={formik.isSubmitting} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};
