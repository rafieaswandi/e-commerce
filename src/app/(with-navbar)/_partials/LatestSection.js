import ProductCard from "@/components/ProductCard";
export default function LatestSection() {
    return (
        <section className="py-10 bg-dark text-white">
            <h2 className="text-4xl font-bold text-center uppercase mb-10">
                New Arrival
            </h2>
            <div className="flex gap-4 overflow-x-auto">
                <ProductCard
                href={"#"}
                image="/card1.png"
                category="Panzerwaffen"
                name="Panzerkamfpwagen VII Lowe"
                rating={19.45}
                price={500000000000}
                />
            </div>
        </section>
    );
}