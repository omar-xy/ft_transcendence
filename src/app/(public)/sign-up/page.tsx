import React from "react";
import SignUpForm from "./_component/sign-up-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-6">
      <Card className="flex w-full max-w-sm flex-col items-center gap-4 bg-card p-4 sm:p-6 md:p-8">
        <SignUpForm />
        <Button
          asChild
          className="mt-2 w-full border border-gray-50"
          size="sm"
          variant="ghost"
        >
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </Card>
    </div>
  );
}
