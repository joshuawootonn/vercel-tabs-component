import Link from "next/link";

export default function App() {
  return (
    <div className="w-full flex flex-col space-y-12 items-center justify-center">
      <h1 className="text-3xl">
        Check out the different examples from (TODO: INSERT WEB LINK HERE)
      </h1>
      <Link href={"/css"}>CSS</Link>
      <Link href={"/transition-group"}>React Transition Group</Link>
      <Link href={"/spring"}>Spring</Link>
      <Link href={"/framer"}>Framer</Link>
      <Link href={"/framer-layout"}>Framer (Layout API)</Link>
    </div>
  );
}
