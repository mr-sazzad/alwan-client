import { Metadata } from "next";
// import Home from "../components/home/home";

export const metadata: Metadata = {
  title: "Home | Alwan",
  description: "this is home page",
};
export default function Page() {
  return (
    <div>
      {/* <Home /> */}

      <p>Hello from home page</p>
    </div>
  );
}
