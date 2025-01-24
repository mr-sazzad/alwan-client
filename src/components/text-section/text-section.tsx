import Link from "next/link";
import { useGetHomePageTextQuery } from "../../redux/api/home-page-text/home-page-text-api";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const TextSection = () => {
  const { data: response, isLoading } = useGetHomePageTextQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col items-center mt-10 gap-2">
          <Skeleton className="h-14 w-[250px]" />
          <Skeleton className="h-8 w-[60vw]" />
          <Skeleton className="h-8 w-[50vw]" />
          <Skeleton className="h-8 w-[150px] rounded-full" />
        </div>
      </div>
    );
  }

  console.log("Res =>", response);
  const homeText = response?.data || {};

  return (
    <div>
      {homeText && (
        <div className="flex flex-col w-full justify-center items-center mt-10">
          <h1 className="md:text-6xl text-4xl font-[900] uppercase text-center -mb-2">
            {homeText.firstTitle}
          </h1>
          <h1 className="md:text-6xl text-4xl font-[900] uppercase mb-2 text-center">
            {homeText.secondTitle}
          </h1>
          {homeText?.text?.map((txt: string, i: number) => (
            <p key={i} className="text-center md:text-base text-sm w-full">
              {txt}
            </p>
          ))}

          <Button
            className="rounded-full text-[17px] font-medium capitalize group transition-all duration-300 mt-3 px-5"
            asChild
          >
            {homeText.categoryId && (
              <Link href={`categories/${homeText.categoryId}`}>
                {homeText.buttonText}
              </Link>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TextSection;
