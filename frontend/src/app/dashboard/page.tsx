import AuthLayout from "@/components/layout/AuthLayout";
import TabsMenu from "@/components/tabs/tabs";


export default function Dashboard() {

    return (
        <AuthLayout>
            <section className="flex flex-col items-center justify-center w-full bg-gray-100">
                <div className="w-full p-2 items-start">
                    <TabsMenu />
                </div>
            </section>
        </AuthLayout>
    )
}