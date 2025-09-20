import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "../schema";
import type { FormSchemaType } from "../schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testUsers } from "@/config/constants";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();

  function onSubmit(data: FormSchemaType) {
    const testUser = testUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );
    if (!testUser) return;
    navigate("/products");
  }

  const handleTestUserClick = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <main className="min-h-dvh grid place-items-center bg-gray-100 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            🚲 Mundo Bici
          </h1>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    type="password"
                    placeholder="••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 text-base">
            Iniciar Sesión
          </Button>

          <Separator />

          <section className="w-full bg-gray-100/80 p-4 rounded-md">
            <h3 className="text-base font-bold">Usuarios de Prueba:</h3>
            <ul className="mt-2 space-y-2">
              {testUsers.map((user) => (
                <li key={user.id}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-10 px-2 justify-start gap-2 hover:bg-primary-foreground"
                    onClick={() =>
                      handleTestUserClick(user.email, user.password)
                    }
                  >
                    <span className="font-semibold text-left">
                      {user.role}:
                    </span>
                    <span className="text-muted-foreground truncate">
                      {user.email} | {user.password}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
