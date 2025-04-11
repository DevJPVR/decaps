import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';

function ResourcesPage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const importResources = async () => {
      try {
        const modules = import.meta.glob('../../content/resources/*.md');
console.log("Modules (glob):", modules);
const resourceList = [];
for (const path in modules) {
  try {
    console.log("Importing path:", `${path}?raw`);
    const module = await import(`${path}?raw`);
    console.log("Imported module:", module);
    const parsed = fm(module.default);
    resourceList.push({
      slug: parsed.attributes.slug || parsed.attributes.title?.toLowerCase().replace(/ /g, '-'),
      title: parsed.attributes.title,
    });
  } catch (error) {
    console.error("Erro ao importar:", path, error);
  }
}
console.log("Resource List:", resourceList);
setResources(resourceList);
      } catch (error) {
        console.error("Erro ao carregar os resources:", error);
      }
    };

    importResources();
  }, []);

  return (
    <div>
      <h1>Resources</h1>
      <ul>
        {resources.map((resource) => (
          <li key={resource.slug}>
            <Link to={`/resource/${resource.slug}`}>{resource.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesPage;