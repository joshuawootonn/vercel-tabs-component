import Link from "next/link";

export default function App() {
  return (
    <div className="w-full flex flex-col space-y-5 p-5">
      <h1 className="text-lg md:text-3xl">
        The links below are live demos from:
        <Link href="https://www.joshuawootonn.com/vercel-tabs-component">
          <a className="text-purple-500">
            a article I wrote detailing the vercel tabs component &#x2197;
          </a>
        </Link>
      </h1>
      <ul className="text-purple-500 translate-x-7">
        <li className="list-disc">
          <Link href={"/css"}>CSS &#x2197;</Link>
        </li>
        <li className="list-disc">
          <Link href={"/transition-group"}>
            React Transition Group &#x2197;
          </Link>
        </li>
        <li className="list-disc">
          <Link href={"/spring"}>Spring &#x2197;</Link>
        </li>
        <li className="list-disc">
          <Link href={"/framer"}>Framer &#x2197;</Link>
        </li>
        <li className="list-disc">
          <Link href={"/framer-layout"}>Framer (Layout API) &#x2197;</Link>
        </li>
      </ul>
      <p>
        This code for this example can be found at{" "}
        <Link href="https://www.joshuawootonn.com/vercel-tabs-component">
          <a className="text-purple-500">this github repo &#x2197;</a>
        </Link>
      </p>
    </div>
  );
}
