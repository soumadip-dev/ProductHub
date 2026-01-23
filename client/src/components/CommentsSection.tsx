import { SignInButton, useAuth } from '@clerk/clerk-react';
import type { CommentWithUser } from '../types';
import { useState } from 'react';
import { useCreateComment, useDeleteComment } from '../hooks/useComments';
import { LogInIcon, MessageSquareIcon, SendIcon, Trash2Icon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { createCommentSchema, type CreateCommentInput } from '../schemas/commentSchema';
import ConfirmationModal from '../components/ConfirmationModal';
import { useConfirmationModal } from '../hooks/useConfirmationModal';

interface CommentsSectionProps {
  productId: string;
  comments?: CommentWithUser[] | null;
  currentUserId?: string | null;
}

export default function CommentsSection({
  productId,
  comments = [],
  currentUserId,
}: CommentsSectionProps) {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState<string>('');
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();

  const { modalState, showConfirmation, hideConfirmation } = useConfirmationModal();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (data: CreateCommentInput) => {
    createComment.mutate(
      { productId, content: data.content },
      {
        onSuccess: () => {
          reset();
          setContent('');
        },
      }
    );
  };

  const handleDeleteComment = (commentId: string, productId: string) => {
    showConfirmation({
      title: 'Delete Comment',
      message: 'Are you sure you want to delete this comment? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteComment.mutate({ commentId, productId });
      },
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquareIcon className="size-5 text-primary" />
          <h3 className="font-bold">Comments</h3>
          <span className="badge badge-neutral badge-sm">{comments?.length || 0}</span>
        </div>
        {isSignedIn ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex gap-2">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <div className="flex-1">
                    <input
                      {...field}
                      type="text"
                      placeholder="Add a comment..."
                      className="input input-bordered input-sm w-full bg-base-200"
                      disabled={createComment.isPending}
                      onChange={e => {
                        field.onChange(e);
                        setContent(e.target.value);
                      }}
                    />
                  </div>
                )}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm btn-square"
                disabled={createComment.isPending || !content.trim()}
              >
                {createComment.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <SendIcon className="size-4" />
                )}
              </button>
            </div>
            {errors.content && <p className="text-error text-sm">{errors.content.message}</p>}
          </form>
        ) : (
          <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
            <span className="text-sm text-base-content/60">Sign in to join the conversation</span>
            <SignInButton mode="modal">
              <button type="button" className="btn btn-primary btn-sm gap-1">
                <LogInIcon className="size-4" />
                Sign In
              </button>
            </SignInButton>
          </div>
        )}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {!comments || comments.length === 0 ? (
            <div className="text-center py-8 text-base-content/50">
              <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No comments yet. Be first!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <img src={comment.user?.imageUrl} alt={comment.user?.name || 'User'} />
                  </div>
                </div>
                <div className="chat-header text-xs opacity-70 mb-2">
                  {comment.user?.name || 'Anonymous'}
                  <time className="ml-2 text-xs opacity-50">
                    {new Date(comment.createdAt).toLocaleString()}
                  </time>
                </div>
                <div className="chat-bubble chat-bubble-neutral text-sm">{comment.content}</div>
                {currentUserId === comment.userId && (
                  <div className="chat-footer">
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs text-error"
                      disabled={deleteComment.isPending}
                      onClick={() => handleDeleteComment(comment.id, productId)}
                    >
                      {deleteComment.isPending ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <Trash2Icon className="size-3" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={hideConfirmation}
        onConfirm={() => {
          modalState.onConfirm?.();
          hideConfirmation();
        }}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        type={modalState.type}
        isLoading={deleteComment.isPending}
      />
    </>
  );
}
