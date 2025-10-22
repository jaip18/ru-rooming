'use client';

import { UserProvider as Auth0UserProvider } from '@auth0/nextjs-auth0/client';

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Auth0UserProvider>{children}</Auth0UserProvider>;
}
