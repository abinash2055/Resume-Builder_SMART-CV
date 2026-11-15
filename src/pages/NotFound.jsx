
import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-brand-600">
        <FileQuestion size={38} />
      </div>

      <h1 className="mt-6 text-6xl font-extrabold text-slate-900">404</h1>
      <h2 className="mt-3 text-xl font-bold text-slate-800">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        <ArrowLeft size={17} />
        Back to dashboard
      </Link>
    </div>
  );
}

export default NotFound;
