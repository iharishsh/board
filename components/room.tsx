"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

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
  // const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

  // if (!publicApiKey) {
  //   throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY environment variable is not defined");
  // }

  const authEndpoint = "/api/liveblocks-auth"

  if (!authEndpoint) {
    throw new Error("liveblocks-auth is not defined");
  }

  return (
    <LiveblocksProvider 
    // publicApiKey={publicApiKey}
    authEndpoint={authEndpoint}
    throttle={16}
    >
      <RoomProvider id={roomId}
        initialPresence={{
          cursor: null,
          selection: [],
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}