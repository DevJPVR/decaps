import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 

const resourceModules = import.meta.glob('../../content/resources/*.md');

function ResourceDetailPage() {
  const { slug } = useParams(); 

  const [pageData, setPageData] = useState({
    ContentComponent: null, 
    frontmatter: null,    
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadResource = async () => {

      setPageData({ ContentComponent: null, frontmatter: null, loading: true, error: null });

      const resourcePath = `../../content/resources/${slug}.md`;


      const importer = resourceModules[resourcePath];

      if (!importer) {
        console.error(`Resource module not found for slug: ${slug} at path: ${resourcePath}`);
        setPageData({ ContentComponent: null, frontmatter: null, loading: false, error: 'Resource not found.' });
        return; 
      }

      try {

        const module = await importer();

        if (!module || typeof module.default !== 'function' || !module.frontmatter) {
           console.error(`Invalid MDX module structure for ${resourcePath}`);
           throw new Error('Failed to load resource content correctly.');
        }

        setPageData({
          ContentComponent: module.default, 
          frontmatter: module.frontmatter, 
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error(`Error loading resource for slug ${slug}:`, err);
        setPageData({ ContentComponent: null, frontmatter: null, loading: false, error: 'Failed to load resource.' });
      }
    };

    loadResource();
  }, [slug]);

  const { ContentComponent, frontmatter, loading, error } = pageData;


  if (loading) {
    return <div className="text-center p-10">Loading resource...</div>;
  }

  if (error || !ContentComponent || !frontmatter) {
    return (
      <div className="max-w-3xl mx-auto p-6 sm:p-8 text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">
          {error || 'Resource could not be loaded or is invalid.'}
        </p>
        <Link to="/resources" className="text-blue-600 hover:underline dark:text-blue-400">
          ← Back to Resources List
        </Link>
      </div>
    );
  }


  return (
    <article className="max-w-3xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {frontmatter.title}
      </h1>

      <hr className="my-6 border-gray-200 dark:border-gray-700" />

      <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
        <ContentComponent />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link to="/resources" className="text-blue-600 hover:underline dark:text-blue-400">
          ← Back to Resources List
        </Link>
      </div>
    </article>
  );
}

export default ResourceDetailPage;