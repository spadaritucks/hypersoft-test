import LoginForm from "@/components/forms/loginForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


export default function Home() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <Card className="w-96 ">
        <CardHeader>
          <h2 className="text-xl font-semibold">Login</h2>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
