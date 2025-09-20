import { Outlet } from "react-router-dom";
import Header from "@/components/shared/header/Header";
import Filter from "@/components/shared/filter/Filter";

const MainLayout = () => {
  return (
    <main className="min-h-dvh bg-gray-50">
      <Header />
      <Outlet />
      <Filter />
    </main>
  );
};

export default MainLayout;
