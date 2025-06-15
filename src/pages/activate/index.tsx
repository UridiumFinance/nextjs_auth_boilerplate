import Button from "@/components/Button";
import LoadingMoon from "@/components/loaders/LoadingMoon";
import { ToastError } from "@/components/toast/alerts";
import Layout from "@/hocs/Layout";
import { activate } from "@/redux/actions/auth/actions";
import { IActivationProps } from "@/redux/actions/auth/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
    } catch (err) {
      ToastError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
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

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
