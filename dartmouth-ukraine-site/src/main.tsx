import "./index.css";

import { ViteReactSSG } from "vite-react-ssg";
import { Navigate } from "react-router-dom";

import SiteLayout from "./components/SiteLayout";

import Home from "./pages/Home";
import NewsIndex from "./pages/NewsIndex";
import NewsArticle from "./pages/NewsArticle";
import ProjectsIndex from "./pages/ProjectsIndex";
import ProjectDetail from "./pages/ProjectDetail";
import HowToHelp from "./pages/HowToHelp";
import People from "./pages/People";
import Contact from "./pages/Contact";
import AdminRedirect from "./pages/AdminRedirect";
import Academics from "./pages/Academics";
import NotFound from "./pages/NotFound";

export const createRoot = ViteReactSSG(
  {
    routes: [
      {
        path: "/",
        element: <SiteLayout />,
        children: [
          { index: true, element: <Home /> },

          { path: "news", element: <NewsIndex /> },
          { path: "news/:slug", element: <NewsArticle /> },

          { path: "projects", element: <ProjectsIndex /> },
          { path: "projects/:slug", element: <ProjectDetail /> },

          { path: "academics", element: <Academics /> },
          { path: "help", element: <HowToHelp /> },
          { path: "people", element: <People /> },
          { path: "contact", element: <Contact /> },

          { path: "admin", element: <AdminRedirect /> },

          { path: "articles", element: <Navigate to="/news" replace /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  async () => {}
);
