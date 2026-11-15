
import { FileText, Menu, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <FileText size={21} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Smart<span className="text-brand-600">CV</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">Create Resume</span>
            <span className="sm:hidden">Create</span>
          </Link>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-brand-700"
            title="SmartCV user"
          >
            SC
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
