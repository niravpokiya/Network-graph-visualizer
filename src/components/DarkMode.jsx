import { useEffect, useRef } from "react";

export default function DarkModeToggle() {
  const checkboxRef = useRef(null);

  useEffect(() => {
    const isDark = localStorage.getItem("dark-mode") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
      if (checkboxRef.current) checkboxRef.current.checked = true;
    }
  }, []);

  const toggleDarkMode = () => {
    const enabled = checkboxRef.current.checked;
    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  };

  return (
    <div className="ml-3">
      <input
        type="checkbox"
        id="darkmode-toggle"
        ref={checkboxRef}
        className="sr-only"
        onChange={toggleDarkMode}
      />
      <label
        htmlFor="darkmode-toggle"
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 shadow-inner transition-colors"
      >
        <svg
          className="dark:hidden"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-yellow-500"
            d="M10 2V0h-1v2h1zm0 18v-2h-1v2h1zm8-9h2v-1h-2v1zM0 10h2v-1H0v1zm14.14-6.36l1.42-1.42-1.42-1.42-1.42 1.42 1.42 1.42zM4.24 16.97l1.42-1.42-1.42-1.42-1.42 1.42 1.42 1.42zM16.97 15.76l1.42-1.42-1.42-1.42-1.42 1.42 1.42 1.42zM5.86 3.64L4.44 2.22 3.02 3.64l1.42 1.42 1.42-1.42z"
          />
          <circle cx="10" cy="10" r="4" className="fill-yellow-400" />
        </svg>
        <svg
          className="hidden dark:block"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-gray-300"
            d="M10 1c-1.25 0-2.45.31-3.52.86C8.17 4.12 10 7.3 10 10s-1.83 5.88-3.52 8.14c1.07.55 2.27.86 3.52.86 4.97 0 9-4.03 9-9s-4.03-9-9-9z"
          />
        </svg>
        <span className="sr-only">Toggle dark mode</span>
      </label>
    </div>
  );
}
