import Heading from "@/components/pages/profile/Heading";
import ProfileLayout from "@/hocs/ProfileLayout";

export default function Page() {
  return (
    <div>
      <Heading />
      <main className="px-4 py-12 sm:px-6 lg:flex-auto lg:px-0">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900">User information</h2>
            <p className="mt-1 text-sm/6 text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>

            <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  First Name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">Tom</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Last Name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">Cook</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">username</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Email address
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">tom.cook@example.com</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
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
