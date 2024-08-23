"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
    children: ReactNode 
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
};

export const Room =({ 
    children, 
    roomId, 
    fallback,
}: RoomProps) => {
  const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY;

  if (!publicApiKey) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY environment variable is not defined");
  }

  return (
    <LiveblocksProvider publicApiKey={publicApiKey}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}