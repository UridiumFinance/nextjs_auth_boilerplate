import { ToastError } from "@/components/toast/alerts";

export interface SendOTPEmailProps {
  email: string;
}

export async function SendOTPEmail(props: SendOTPEmailProps) {
  const { email } = props;

  try {
    const res = await fetch("/api/auth/send_otp_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
  } catch (err) {
    ToastError("Error sending email");
  }

  return null;
}
