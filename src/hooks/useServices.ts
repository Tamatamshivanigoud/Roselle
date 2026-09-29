import { useState, useEffect } from 'react';
import type { Service } from '@/types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Ensure this matches your running backend URL
        const response = await fetch('http://localhost:5000/api/services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services from server');
        }

        const data = await response.json();
        setServices(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching services');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}
