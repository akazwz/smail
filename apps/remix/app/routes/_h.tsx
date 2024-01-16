import { Outlet } from "@remix-run/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomeLayout() {
  return (
    <div className="mx-auto max-w-2xl gap-2 h-dvh p-2 flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
