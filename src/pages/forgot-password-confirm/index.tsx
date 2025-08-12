import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import LoadingMoon from "@/components/loaders/LoadingMoon";
import { ToastError } from "@/components/toast/alerts";
import Layout from "@/hocs/Layout";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { forgotPasswordConfirm } from "@/redux/actions/auth/actions";
import { IForgotPasswordConfirmProps } from "@/redux/actions/auth/interfaces";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export default function Page() {
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const { canSubmit, PasswordValidationText } = usePasswordValidation({
    password,
    rePassword,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      ToastError("Ensure all fields in the form are complete and meet the requirements.");
      return;
    }

    const forgotPasswordConfirmData: IForgotPasswordConfirmProps = {
      new_password: password,
      re_new_password: rePassword,
      uid,
      token,
    };

    try {
      setLoading(true);
      await dispatch(forgotPasswordConfirm(forgotPasswordConfirmData));
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
          Change your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <FormInput
            data={password}
            setData={setPassword}
            type="password"
            kind="password"
            title="New Password"
          />

          <FormInput
            data={rePassword}
            setData={setRePassword}
            type="password"
            kind="password"
            title="Repeat New Password"
          />

          {PasswordValidationText()}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <LoadingMoon /> : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
