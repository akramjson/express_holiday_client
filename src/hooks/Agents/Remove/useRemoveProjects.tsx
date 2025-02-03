import useAxiosPrivate from "@/common/hooks/Interceptor/useAxiosPrivate";
import { workspaceEndpoints } from "@/features/workspace/api";
import { projectSchemaType } from "@/features/workspace/types/Projects/View/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveProjects = (projects: projectSchemaType[]) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const deleteProjects = async () => {
    const responses = await Promise.all(
      projects.map((project) =>
        axiosPrivate.delete(
          `${workspaceEndpoints.DELETE_PROJECT_PATH}${project.id}`
        )
      )
    );
    return responses.map((res) => res?.data);
  };

  return useMutation({
    mutationFn: () => deleteProjects(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Failed to remove users", error);
    },
  });
};

export default useRemoveProjects;
