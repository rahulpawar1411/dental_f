import { servicesData } from '../data/servicesData';

export const ServiceController = {
  getServices: () => {
    return servicesData;
  },

  getServiceById: (id) => {
    const service = servicesData.find(s => s.id === id);
    return service || null;
  },

  getCategories: () => {
    const categories = servicesData.map(s => s.category);
    return ['All', ...new Set(categories)];
  },

  filterServices: (category = 'All', query = '') => {
    let results = servicesData;

    if (category && category !== 'All') {
      results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (query && query.trim() !== '') {
      const search = query.toLowerCase().trim();
      results = results.filter(s => 
        s.title.toLowerCase().includes(search) || 
        s.summary.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search)
      );
    }

    return results;
  }
};
export default ServiceController;
