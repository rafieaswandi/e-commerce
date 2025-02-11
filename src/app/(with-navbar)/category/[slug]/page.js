import ProductCard from "@/components/ProductCard";
import Config from "@/core/config";

export default async function CategoryPage({ params }) {
    const slug = await params.slug;
    // console.log(slug);

    const data = await fetch(Config.baseApiUrl() + "product?category=" + slug + "&sortBy=created_at&order=desc", {
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        method: "GET"
    }).then((res) => res.json());

    console.log(data);
    return (
        <section className="flex flex-col">
            <div className="bg-dark text-white p-16">
                <h1 className="text-5xl font-bold mb-4">{data.metadata.category.name}</h1>
                <p className="text-lg">{data.metadata.category.description}</p>
            </div>
            {/* <div className="flex flex-wrap gap-4 p-10 bg-white justify-center">
                {data.data.map((product) => (
                    <ProductCard
                        key={product.name}
                        href={`/product/${product.slug}`}
                        image={Config.baseUrl() + product.img_urls[0]}
                        category={product.category_name}
                        name={product.name}
                        rating={product.rating}
                        price={product.price}
                    />
                ))}
            </div> */}
            <div className="flex flex-wrap gap-6 p-8 bg-gray-50 justify-center">
                {data.data.map((product) => (
                    <div
                    key={product.name}
                    className="max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                    <a href={`/product/${product.slug}`} className="block">
                        <img
                        src={Config.baseUrl() + product.img_urls[0]}
                        alt={product.name}
                        className="w-full h-60 object-cover rounded-t-2xl"
                        />
                    </a>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                        <a href={`/product/${product.slug}`} className="hover:text-blue-600">
                            {product.name}
                        </a>
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{product.category_name}</p>
                        <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-gray-800">
                            Rp.{product.price}
                        </span>
                        <div className="flex items-center">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-gray-500 text-sm ml-1">{product.rating}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
        </section>
    );
}