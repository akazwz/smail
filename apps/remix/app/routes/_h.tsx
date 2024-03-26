import { Outlet } from "@remix-run/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomeLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
