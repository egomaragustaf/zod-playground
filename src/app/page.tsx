import ProductCard from "./components/product-card";
import z from "zod/v4";

const dataSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      price: z.number(),
      discountPercentage: z.number(),
      rating: z.number(),
      stock: z.number(),
      brand: z.string(),
      sku: z.string(),
      thumbnail: z.string(),
      images: z.array(z.string()),
    })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

type DataProduct = z.infer<typeof dataSchema>;

async function getDataProduct(): Promise<DataProduct> {
  const response = await fetch("https://dummyjson.com/products?limit=5");
  const data = await response.json();
  const validatedData = dataSchema.safeParse(data);

  if (!validatedData.success) {
    console.error("Data validation failed:", validatedData.error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }

  return validatedData.data;
}

export default async function Home() {
  const data = await getDataProduct();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
