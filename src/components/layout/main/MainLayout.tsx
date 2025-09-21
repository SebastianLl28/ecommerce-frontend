import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/shared/header/Header";
import Filter from "@/components/shared/filter/Filter";
import { useGetSession } from "@/features/auth/hooks";
import { useIsAuthenticated } from "@/store/authStore";

const MainLayout = () => {
  const isAuthenticated = useIsAuthenticated();

  const { data: session, isLoading, isError, isSuccess } = useGetSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && isError) {
    return <Navigate to="/" replace />;
  }

  if (isSuccess && !session.success && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-dvh bg-gray-50">
      <Header />
      <Outlet />
      <Filter />
    </main>
  );
};

export default MainLayout;
