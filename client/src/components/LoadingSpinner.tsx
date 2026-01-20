import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-3 p-8">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    <span className="text-sm text-muted-foreground animate-pulse">Loading</span>
  </div>
);
