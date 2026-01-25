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
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const signInScheme = z.object({
  username: z.string().nonempty({message: "Username tidak boleh kosong!"}),
  password: z.string().min(8, {message: "Password minimal 8 karakter!"}),
});

export function LoginForm() {
  const {push} = useRouter();
  const form = useForm<z.infer<typeof signInScheme>>({
    resolver: zodResolver(signInScheme),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInScheme>) => {
    try {
      const req = await login(data);
      const res = await req;

      if (res?.statusCode === 401) {
        toast.warning(`Username atau password salah!`);
      } else {
        toast.success("Selamat datang kembali!");
        return push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Gagal");
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
                    <Input
                      placeholder="Input Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FieldGroup>
              <Button type="submit">Masuk</Button>
              <Field>
                <FieldDescription className="text-center">
                  Lupa Password? <a href="#">Hubungi Admin</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
