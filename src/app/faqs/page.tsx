import MaxWidth from "@/components/max-width";

const Page = () => {
  return (
    <MaxWidth className="mt-[110px]">
      <h2 className="md:text-2xl sm:text-xl text-lg font-semibold md:text-start text-center">
        FAQs
      </h2>
      <p className="text-sm md:text-start text-center">
        you can ask your query here
      </p>

      <div className="mt-5 text-center">
        <p className="text-lg font-medium text-gray-500 mb-5">
          If you have any query please don&apos;t hasitate to email us
        </p>
        <p>Our Email: alwan.bd@gmail.com</p>
      </div>
    </MaxWidth>
  );
};

export default Page;
