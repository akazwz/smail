import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Outlet } from "@remix-run/react";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
