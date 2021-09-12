import axios from 'axios';

const useApiClient = () => {
  const apiClient = axios.create();

  return apiClient;
};

export default useApiClient;
