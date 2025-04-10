
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
    <div className="container">
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default HomePage;