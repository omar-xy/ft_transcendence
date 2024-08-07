import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInForm from "./_component/sign-in-form";
export default function Page() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-6">
      <Card className="flex w-full max-w-sm flex-col items-center gap-4 p-4 sm:p-6 md:p-8">
        <SignInForm />
        <Button
          asChild
          className="mt-2 w-full border border-gray-50"
          size="sm"
          variant="ghost"
        >
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </Card>
    </div>
  );
}
