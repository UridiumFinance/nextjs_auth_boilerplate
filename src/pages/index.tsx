import Layout from "@/hocs/Layout";

export default function Home() {
  return (
    <div>
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        Hello WOrld
      </main>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
