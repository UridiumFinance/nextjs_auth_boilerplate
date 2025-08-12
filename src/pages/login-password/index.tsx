import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import LoadingMoon from "@/components/loaders/LoadingMoon";
import { ToastError } from "@/components/toast/alerts";
import Layout from "@/hocs/Layout";
import { login } from "@/redux/actions/auth/actions";
import { ILoginProps } from "@/redux/actions/auth/interfaces";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: ILoginProps = {
      email,
      password,
    };

    try {
      setLoading(true);
      await dispatch(login(loginData));
    } catch (err) {
      ToastError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-color-text flex min-h-full flex-1 flex-col justify-center px-6 py-12 transition-colors lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-color-heading mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <FormInput data={email} setData={setEmail} type="email" kind="email" title="Email" />

          <FormInput
            data={password}
            setData={setPassword}
            type="password"
            kind="password"
            title="Password"
            cta="Forgot password?"
            href="/forgot-password"
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <LoadingMoon /> : "Sign in"}
          </Button>
        </form>

        <p className="text-color-subtext mt-10 text-center text-sm/6">
          Not a member?{" "}
          <Link
            href="/register"
            className="text-color-primary hover:text-color-secondary font-semibold transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
