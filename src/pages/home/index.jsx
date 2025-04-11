
import { useState, useEffect } from 'react';
import fm from 'front-matter';

function HomePage() {
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    import('../../content/home.md?raw')
      .then((module) => {
        const parsed = fm(module.default);
        setContent(parsed.body);
        setMetadata(parsed.attributes);
      })
      .catch((error) => {
        console.error("Erro ao carregar a página inicial:", error);
      });
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] p-4">
      <h1 className="text-2xl text-orange-500 mb-6">{metadata.title}</h1>
      <p className="mb-4">{metadata.description}</p>
      <div className="mb-4">
        <a href={metadata.link}>{metadata.label}</a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default HomePage;