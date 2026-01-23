import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment } from '../lib/api';

function useCreateComment() {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
  return createCommentMutation;
}

function useDeleteComment() {
  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
  return deleteCommentMutation;
}

export { useCreateComment, useDeleteComment };
