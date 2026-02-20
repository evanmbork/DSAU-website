import { Outlet } from "react-router-dom";
import Footer from "./components/SiteFooter.tsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <main className="flex-1 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
