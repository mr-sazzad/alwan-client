import { Button } from "../ui/button";

const TextSection = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-10">
      <h1 className="text-2xl font-bold">Wear Your Story</h1>
      <p className="text-center">
        Each Alwan t-shirt tells a unique tale of creativity and passion,
        crafted with care to celebrate life&lsquo;s rich tapestry.
      </p>
      <p className="text-center">
        Discover pieces that resonate with your journey, capturing your personal
        style and experiences.
      </p>
      <p className="text-center">
        Wear it with pride, letting your story unfold in every thread.
      </p>

      <Button className="rounded-full px-5 py-0 mt-3" variant="black" size="sm">
        Explore
      </Button>
    </div>
  );
};

export default TextSection;
