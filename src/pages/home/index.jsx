import Content, { frontmatter } from "../../content/home.md";
import { Button } from "@/components/ui/button";

function HomePage() {
  const metadata = frontmatter;

  return (
    <div className="mx-auto max-w-[1200px] p-4">
      <h1 className="text-2xl mb-6 text-red-400">{metadata.title}</h1>
      <p className="mb-4">{metadata.description}</p>
      <div className="mb-4">
        <Button asChild variant={"default"} size="lg">
          <a href={metadata.link}>{metadata.label}</a>
        </Button>
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <Content />
      </div>
    </div>
  );
}

export default HomePage;
