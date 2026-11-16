
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Dashboard from "./pages/Dashboard";
import ResumeEditor from "./pages/ResumeEditor";
import TemplateGallery from "./pages/TemplateGallery";
import NotFound from "./pages/NotFound";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/builder" element={<ResumeEditor />} />
              <Route path="/templates" element={<TemplateGallery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
