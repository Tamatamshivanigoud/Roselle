import { useState, useEffect } from 'react';

// Generic hook to fetch data from our backend
function useFetchData<T>(endpoint: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint} from server`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Specific hooks exported for components
export function useBeauticians() {
  const { data, loading, error } = useFetchData<any>('beauticians');
  return { beauticians: data, loading, error };
}

export function usePackages() {
  const { data, loading, error } = useFetchData<any>('packages');
  return { packages: data, loading, error };
}

export function useFaqs() {
  const { data, loading, error } = useFetchData<any>('faqs');
  return { faqs: data, loading, error };
}

export function useTestimonials() {
  const { data, loading, error } = useFetchData<any>('testimonials');
  return { testimonials: data, loading, error };
}

export function useGallery() {
  const { data, loading, error } = useFetchData<any>('gallery');
  return { gallery: data, loading, error };
}
