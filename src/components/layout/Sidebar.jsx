
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Palette,
  X,
  Sparkles,
  Settings,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Resume Builder",
    path: "/builder",
    icon: FileText,
  },
  {
    title: "Templates",
    path: "/templates",
    icon: Palette,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 lg:hidden">
          <span className="font-semibold text-slate-800">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-50 text-brand-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.title}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-9">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Preferences
            </p>

            <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400">
              <Settings size={19} />
              Settings
              <span className="ml-auto text-xs">Soon</span>
            </div>
          </div>
        </div>

        <div className="m-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white">
          <Sparkles size={22} />
          <h3 className="mt-3 font-bold">Make your next move</h3>
          <p className="mt-1 text-xs leading-5 text-indigo-100">
            Build a professional resume that highlights your strengths.
          </p>
          <NavLink
            to="/builder"
            onClick={onClose}
            className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-bold text-brand-700 hover:bg-indigo-50"
          >
            Start building
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
