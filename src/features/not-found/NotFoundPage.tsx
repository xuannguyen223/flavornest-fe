import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<div className=" w-[60%] text-center ">
				<h1 className="text-5xl font-bold md:text-6xl">Well, this isn't good...</h1>
				<p className="my-8 text-lg leading-relaxed text-[#808080]">
					Sorry, the page you were looking for could not be located on this site.
					<br />
					If you think there is really something missing on this website, please contact us.
				</p>
				<div className="flex flex-row justify-center gap-4">
					<a href="/">
						<Button className="bg-(--primary-color) text-white hover:bg-(--primary-color)/80">
							Go back to homepage
						</Button>
					</a>
				</div>
			</div>
		</div>
	);
}
