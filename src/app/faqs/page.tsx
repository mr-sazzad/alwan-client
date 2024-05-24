import MaxWidth from "@/components/max-width";

const Page = () => {
  return (
    <MaxWidth className="mt-[90px]">
      <h2 className="md:text-2xl sm:text-xl text-lg font-semibold">FAQs</h2>
      <p>you can ask your query here</p>

      <div className="mt-5 text-center">
        <p className="text-lg font-medium text-gray-500">
          If you have any query please don&apos;t hasitate to email us
        </p>
        <p>Our Email: alwan.bd@gmail.com</p>
      </div>
    </MaxWidth>
  );
};

export default Page;
