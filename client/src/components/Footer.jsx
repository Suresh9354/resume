export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="mb-0 font-medium text-sm">
            &copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
