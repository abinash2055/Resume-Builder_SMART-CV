
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} SmartCV. All rights reserved.</p>
        <p>Build your future, one resume at a time.</p>
      </div>
    </footer>
  );
}

export default Footer;
