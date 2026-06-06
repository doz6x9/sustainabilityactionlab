/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        deep: "#12365f",
        green: "#1f6b4f",
        teal: "#287c7a",
        gold: "#bc922e",
        paper: "#f7f8f5",
        mist: "#eef6f1",
        line: "#dbe3df"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(18,32,42,.12)",
        calm: "0 12px 28px rgba(18,32,42,.1)"
      }
    }
  },
  plugins: []
};
