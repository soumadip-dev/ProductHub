import { useAuth, useUser } from '@clerk/clerk-react';
import { syncUser } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

function useUserSync() {
  const { mutate: syncUserMutation, isPending, isSuccess } = useMutation({ mutationFn: syncUser });

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user || isPending || isSuccess) return;

    if (!user.primaryEmailAddress?.emailAddress) return;

    syncUserMutation({
      email: user.primaryEmailAddress.emailAddress,
      name: user.fullName || user.firstName,
      imageUrl: user.imageUrl,
    });
  }, [isSignedIn, user, isPending, isSuccess, syncUserMutation]);

  return {
    isSynced: isSuccess,
  };
}

export default useUserSync;
