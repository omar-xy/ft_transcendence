"use client";

import { useState } from "react";
import { signUp } from "../../_actions";
import { TInput } from "../../_actions/schema";
import { toast } from "sonner";
import { FieldErrors } from "@/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form-input";
import { login } from "@/lib/auth";

export default function SignUpForm() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput>>({});
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { result, error, fieldErrors } = await signUp({
      name,
      email,
      password,
    });
    console.log({ result, error, fieldErrors });
    if (error) {
      toast.error(error);
    }
    if (fieldErrors) {
      toast.error("Please check your input");
      setFieldErrors(fieldErrors);
    }
    if (result) {
      toast.success("Signed Up");
      await login({
        email,
        password,
      });
      router.push("/");
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex w-full flex-col gap-4 [&>form-input]:grid"
    >
      <FormInput label="Name" name="name" errors={fieldErrors.name} />
      <FormInput
        label="Email"
        type="email"
        name="email"
        errors={fieldErrors.email}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        errors={fieldErrors.password}
      />
      <Button type="submit" className="mt-4">
        SignUp
      </Button>
    </form>
  );
}
