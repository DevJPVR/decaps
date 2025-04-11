import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const modules = import.meta.glob("../../content/resources/*.md");

        const resourcePromises = Object.entries(modules).map(
          async ([path, importer]) => {
            try {
              const module = await importer();

              if (!module.frontmatter || !module.frontmatter.title) {
                console.warn(`Skipping ${path}: Missing frontmatter or title.`);
                return null;
              }

              const filenameWithExtension = path.split("/").pop();
              const slug = filenameWithExtension.replace(".md", "");

              return {
                slug: slug,
                title: module.frontmatter.title,
              };
            } catch (importError) {
              console.error(`Error processing module ${path}:`, importError);
              return null;
            }
          }
        );

        const results = await Promise.all(resourcePromises);

        const validResources = results.filter((resource) => resource !== null);

        validResources.sort((a, b) => a.title.localeCompare(b.title));

        setResources(validResources);
      } catch (err) {
        console.error("Error fetching resources list:", err);
        setError("Failed to load resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading resources...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Resources
      </h1>

      {resources.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No resources found.</p>
      ) : (
        <ul className="list-none space-y-3">
          {resources.map((resource) => (
            <li key={resource.slug}>
              <Link
                to={`/resource/${resource.slug}`}
                className="text-lg text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
              >
                {resource.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResourcesPage;
