import { lazy } from "react";

export const RegisterPage = lazy(() => import("./Register"));
export const LoginPage = lazy(() => import("./Login"));
export const SetupPage = lazy(() => import("./Setup"));
export const ForgetPasswordPage = lazy(() => import("./ForgetPasswordPage"));
export const ResetPasswordPage = lazy(() => import("./ResetPasswordPage"));
