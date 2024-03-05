import Link from "next/link";
import AddToCart from "./_components/add-task";

// removed "use client" here as it is a server component now
const Home = () => (
  <main>
    <div>
      <h1>Tasks</h1>
    </div>
    <Link
      className="•border-slate-300
rounded border px-2 py-1 text-slate-300
outline-none focus-within:bg-slate-700 hover:bg-slate-700"
      href="/_components"
    >
      Manage Tasks
    </Link>
    <Link
      className="•border-slate-300
rounded border px-2 py-1 text-slate-300
outline-none focus-within:bg-slate-700 hover:bg-slate-700"
      href="/_components"
    >
      Add Tasks
    </Link>
  </main>
);

export default Home;
