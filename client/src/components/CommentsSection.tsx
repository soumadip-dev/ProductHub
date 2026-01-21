import type { CommentWithUser } from '../types';

interface CommentsSectionProps {
  productId: string;
  comments?: CommentWithUser[] | null;
  currentUserId?: string | null;
}

export default function CommentsSection({
  productId,
  comments,
  currentUserId,
}: CommentsSectionProps) {
  const safeComments = comments || [];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comments ({safeComments.length})</h3>
      {productId} ===================================
      {currentUserId}
    </div>
  );
}
