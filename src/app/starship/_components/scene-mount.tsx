"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-b from-transparent to-black/20" />
  ),
});

export function SceneMount() {
  return <Scene />;
}
