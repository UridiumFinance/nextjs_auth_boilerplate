import Button from "@/components/Button";
import Link from "next/link";

export default function GuestLinks() {
  return (
    <div className="flex flex-1 items-center justify-end gap-x-6">
      <Link href="/login" className="text-color-heading hidden text-sm/6 font-semibold lg:block">
        Log in
      </Link>
      <Button>
        <Link href="/register">Sign up</Link>
      </Button>
    </div>
  );
}
