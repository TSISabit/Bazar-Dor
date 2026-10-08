"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/utils";

const emptySubscribe = () => () => {};

export default function DateDisplay() {
  const date = useSyncExternalStore(
    emptySubscribe,
    () => getBanglaDate(),
    () => ""
  );

  return (
    <p suppressHydrationWarning className="text-[11px] text-gray-500 min-h-[16px]">
      {date || "লোড হচ্ছে..."}
    </p>
  );
}