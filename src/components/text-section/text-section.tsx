import { useGetHomePageTextQuery } from "@/redux/api/home-page-text/home-page-text-api";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
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

  const homeText = response?.data[0];

  return (
    <div>
      {homeText && (
        <div className="flex flex-col w-full justify-center items-center mt-10">
          <h1 className="text-4xl font-extrabold uppercase mb-2 text-center">
            {homeText.title}
          </h1>
          {homeText.text.map((txt: string, i: number) => (
            <p
              key={i}
              className="text-center md:text-base text-sm text-muted-foreground w-full"
            >
              {txt}
            </p>
          ))}

          <Button
            className="rounded-full text-[17px] font-medium capitalize group transition-all duration-300 mt-3"
            asChild
          >
            {homeText.categoryId && (
              <Link href={`categories/${homeText.categoryId}`}>
                {homeText.buttonText}
                <LuArrowUpRight
                  size={20}
                  className="ml-2 group-hover:rotate-45 group-hover:ml-5 group-hover:bg-white group-hover:text-black transition-all duration-300 ease-in-out p-1 rounded-full"
                />
              </Link>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TextSection;
