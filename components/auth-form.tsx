"use client";
import React from "react";
import { logIn } from "@/redux/features/auth-slice";
import { useAppDispatch } from "@/redux/store";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/button";
import { createUser, signIn } from "@/services/firestore-services";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Not a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be minimum to 8 character")
      .max(26, "Password length should be maximum to 26 character"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit(values) {
      if (isLogin) {
        handleLogin(values.email, values.password);
      } else {
        handleRegiser(values.email, values.password);
      }
    },
  });

  const handleRegiser = async (email: string, password: string) => {
    const newUser = await createUser(email, password);
    if (newUser) {
      toast.success("User Created!", { position: "bottom-center" });
      router.push("/sign-in");
    } else {
      toast.error("Something went wrong", { position: "bottom-center" });
      formik.setSubmitting(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    // TODO: Firebase login action
    const loginUser = await signIn(email, password);
    if (loginUser) {
      toast.success("Welcome");
      dispatch(
        logIn({
          name:
            loginUser.user.displayName ||
            loginUser.user.email?.split("@")[0] ||
            "Anonymous",
          userId: loginUser.user.uid,
          isAuth: true,
        })
      );
      router.push("/");
    } else {
      toast.error("Invalid email or password", { position: "bottom-center" });
      formik.setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="m-auto rounded-2xl shadow-lg border-2 border-secondary-text min-w-64 max-w-96 w-full flex flex-col gap-4 px-3 py-4"
    >
      {/* heading */}
      <div className="text-2xl text-center text-primary-text">
        {isLogin ? "Sign In" : "Sign Up"}
      </div>
      {/* email field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-md text-primary-text">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="bg-transparent border-2 border-primary-text rounded-md focus-visible:outline-none px-2 py-1"
        />
        <div className="text-md text-rose-500">
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : ""}
        </div>
      </div>
      {/* password field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-md text-primary-text">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="bg-transparent border-2 border-primary-text rounded-md focus-visible:outline-none px-2 py-1"
        />
        <div className="text-md text-rose-500">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : ""}
        </div>
      </div>
      {/* action div */}
      <div className="mt-2 mx-auto flex flex-col gap-3">
        <Button disabled={formik.isSubmitting} variant="primary" type="submit">
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <Link
          href={isLogin ? "/sign-up" : "/sign-in"}
          className="cursor-pointer text-blue-500 hover:text-blue-300"
        >
          {isLogin ? "Don't have a account?" : "Already have a account?"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
