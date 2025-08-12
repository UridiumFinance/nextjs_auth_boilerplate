import Heading from "@/components/pages/profile/Heading";
import ProfileLayout from "@/hocs/ProfileLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { req, resolvedUrl } = context;
  const accessToken = req.cookies?.access;

  if (!accessToken) {
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  // (Opcional) Verificar el token contra tu backend antes de permitir el acceso:
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me/`, {
  //     headers: {
  //       Accept: "application/json",
  //       "API-Key": process.env.BACKEND_API_KEY!,
  //       Authorization: `JWT ${accessToken}`,
  //     },
  //   });
  //   if (!res.ok) {
  //     return {
  //       redirect: {
  //         destination: `/login?next=${encodeURIComponent(resolvedUrl)}`,
  //         permanent: false,
  //       },
  //     };
  //   }
  //   const user = await res.json();
  //   return { props: { user } };
  // } catch {
  //   return {
  //     redirect: {
  //       destination: `/login?next=${encodeURIComponent(resolvedUrl)}`,
  //       permanent: false,
  //     },
  //   };
  // }

  return { props: {} };
};

export default function Page() {
  return (
    <div className="text-color-text transition-colors">
      <Heading />
      <main className="px-4 py-12 sm:px-6 lg:flex-auto lg:px-0">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-color-heading text-base/7 font-semibold">User information</h2>
            <p className="text-color-subtext mt-1 text-sm/6">
              This information will be displayed publicly so be careful what you share.
            </p>

            <dl className="divide-color-border border-color-border mt-6 divide-y border-t text-sm/6">
              <div className="py-6 sm:flex">
                <dt className="text-color-heading font-medium sm:w-64 sm:flex-none sm:pr-6">
                  First Name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-color-text">Tom</div>
                  <button
                    type="button"
                    className="text-color-primary hover:text-color-secondary font-semibold transition-colors"
                  >
                    Update
                  </button>
                </dd>
              </div>

              <div className="py-6 sm:flex">
                <dt className="text-color-heading font-medium sm:w-64 sm:flex-none sm:pr-6">
                  Last Name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-color-text">Cook</div>
                  <button
                    type="button"
                    className="text-color-primary hover:text-color-secondary font-semibold transition-colors"
                  >
                    Update
                  </button>
                </dd>
              </div>

              <div className="py-6 sm:flex">
                <dt className="text-color-heading font-medium sm:w-64 sm:flex-none sm:pr-6">
                  Username
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-color-text">username</div>
                  <button
                    type="button"
                    className="text-color-primary hover:text-color-secondary font-semibold transition-colors"
                  >
                    Update
                  </button>
                </dd>
              </div>

              <div className="py-6 sm:flex">
                <dt className="text-color-heading font-medium sm:w-64 sm:flex-none sm:pr-6">
                  Email address
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-color-text">tom.cook@example.com</div>
                  <button
                    type="button"
                    className="text-color-primary hover:text-color-secondary font-semibold transition-colors"
                  >
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
