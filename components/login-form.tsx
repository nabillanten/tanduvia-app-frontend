"use client";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Field, FieldDescription, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {login} from "@/app/actions/auth";
import {toast} from "sonner";
import {Spinner} from "./ui/spinner";
import {EyeClosed, EyeOffIcon, Undo2} from "lucide-react";
import {useRouter} from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import React from "react";

const signInScheme = z.object({
  username: z.string().nonempty({message: "Username tidak boleh kosong!"}),
  password: z.string().min(8, {message: "Password minimal 8 karakter!"}),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof signInScheme>>({
    resolver: zodResolver(signInScheme),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const [isPassword, setIsPassword] = React.useState(true);

  const {push} = useRouter();

  const onSubmit = async (data: z.infer<typeof signInScheme>) => {
    try {
      const res = await login(data);

      if (res?.success) {
        toast.success("Selamat datang kembali!");

        window.location.replace("/dashboard");
      } else {
        toast.warning(res?.message || "Login Gagal");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Gagal, Terjadi Kesalahan Sistem!");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Masuk ke akun Anda</CardTitle>
        <CardDescription>
          Masukkan username untuk masuk ke akun Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Masukkan Username"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        disabled={form?.formState?.isSubmitting}
                        {...field}
                        placeholder="Masukan Password"
                        type={isPassword ? "password" : "text"}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          disabled={form?.formState?.isSubmitting}
                          size="icon-xs"
                          onClick={() => {
                            setIsPassword((prev) => !prev);
                          }}>
                          {true ? <EyeOffIcon /> : <EyeClosed />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FieldGroup className="gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner />} Masuk
              </Button>
              <Button
                variant={"secondary"}
                className="w-full"
                type="button"
                onClick={() => push("/")}
                disabled={form.formState.isSubmitting}>
                <Undo2 /> Kembali
              </Button>
              <Field>
                <FieldDescription className="text-center">
                  Tidak dapat masuk?{" "}
                  <a
                    href="https://wa.me/6281214578839"
                    target={"_blank"}
                    rel="noreferrer">
                    Hubungi Admin
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
