import Config from "@/core/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default async function ProductPage({params}) {
    const slug = await params.slug;

    const data = await fetch(Config.baseApiUrl() + "product/" + slug, {
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        method: "GET"
    }).then((res) => res.json());

    console.log(data);

    
    return (
        <section className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{data.data.name}</h1>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {data.data.img_urls.map((product) => (
                <figure key={product} className="relative">
                    <img
                    src={Config.baseUrl() + product}
                    alt={data.data.name}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                </figure>
                ))}
            </div>

            <article>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{data.data.description}</p>
            </article>
        </section>

    );
}