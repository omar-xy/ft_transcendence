import React from "react";

export default function loading() {
  return (
    <main className="grid place-content-center">
      <span className="text-foreground/50 font-bold text-3xl animate-pulse">
        Loading...
      </span>
    </main>
  );
}
