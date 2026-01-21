import { useMutation } from '@tanstack/react-query';
import { createComment, deleteComment } from '../lib/api';

function useCreateComment() {
  const createCommentMutation = useMutation({ mutationFn: createComment });
  return createCommentMutation;
}

function useDeleteComment() {
  const deleteCommentMutation = useMutation({ mutationFn: deleteComment });
  return deleteCommentMutation;
}

export { useCreateComment, useDeleteComment };
