import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fm from 'front-matter';

function ResourceDetailPage() {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const importResource = async () => {
      try {
        const module = await import(`../../content/resources/${slug}.md?raw`);
        const parsed = fm(module.default);
        setResource({
          title: parsed.attributes.title,
          content: parsed.body,
        });
      } catch (error) {
        console.error("Erro ao carregar o resource:", error);
        setResource(null);
      }
    };

    importResource();
  }, [slug]);

  if (!resource) {
    return <div>Carregando... ou Resource não encontrado.</div>;
  }

  return (
    <div>
      <h1>{resource.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: resource.content }} />
    </div>
  );
}

export default ResourceDetailPage;