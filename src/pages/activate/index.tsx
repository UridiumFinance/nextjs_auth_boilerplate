import Button from "@/components/Button";
import LoadingMoon from "@/components/loaders/LoadingMoon";
import { ToastError } from "@/components/toast/alerts";
import Layout from "@/hocs/Layout";
import { activate } from "@/redux/actions/auth/actions";
import { IActivationProps } from "@/redux/actions/auth/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export default function Page() {
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token === "" || uid === "") {
      ToastError("Token and UID must be provided");
      return;
    }

    const activationData: IActivationProps = {
      uid,
      token,
    };

    try {
      setLoading(true);
      await dispatch(activate(activationData));
      router.push("/login");
    } catch (err) {
      ToastError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-color-bg text-color-text flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-color-heading mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Activate your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <LoadingMoon /> : "Activate account"}
            </Button>
          </div>
        </form>

        <p className="text-color-subtext mt-10 text-center text-sm/6">
          Already a member?{" "}
          <Link
            href="/login"
            className="text-color-primary hover:text-color-secondary font-semibold transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
