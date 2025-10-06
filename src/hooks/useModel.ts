import { modelsApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useModels = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: modelsApi.getModels,
    staleTime: 5 * 60 * 1000,
  });
};
