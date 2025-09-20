import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center">
      <div className="w-4/5 md:w-1/2 xl:w-1/3">
        <h1 className="text-5xl font-bold md:text-6xl">
          Well, this isn't good...
        </h1>
        <p className="my-8 text-lg leading-relaxed text-[#808080]">
          Sorry, the page you were looking for could not be located on this
          site. If you think there is really something missing on this website,
          please contact us.
        </p>
        <div className="flex gap-4">
          <a href="/">
            <Button className="bg-(--primary-color) text-white hover:bg-(--primary-color)/80">
              Go back to homepage
            </Button>
          </a>
          <a href="#">
            <Button
              variant={"outline"}
              className="hover:bg-(--primary-color)/10"
            >
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
