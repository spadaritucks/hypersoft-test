import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Summary from "../summary/summary"
import { ProductsListTable } from "../tables/products/products-list-table"
import { CategoriesListTable } from "../tables/categories/categories-list-table"

export default function TabsMenu() {
    return (
        <Tabs defaultValue="summary" className="w-full h-full">
            <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="products-list">Products Managerment</TabsTrigger>
                <TabsTrigger value="categories-list">Categories Managerment</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
                <Summary />
            </TabsContent>
            <TabsContent className="w-full h-full" value="products-list">
                <ProductsListTable/>
            </TabsContent>
            <TabsContent className="w-full h-full" value="categories-list">
                <CategoriesListTable/>
            </TabsContent>
        </Tabs>
    )
}
