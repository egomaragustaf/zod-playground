import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import z from "zod/v4";

const productSchema = z.object({
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
});

type Product = z.infer<typeof productSchema>;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          priority={true}
          width={300}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {product.title}
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-lg font-bold text-slate-800">
            ${product.price}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
