import Footer from "@/features/footer";
import Navbar from "@/features/navbar";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-x-6 p-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  );
}
