import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}