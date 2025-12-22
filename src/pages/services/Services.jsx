import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ServiceCard from "../../components/ServiceCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FiSearch } from "react-icons/fi";

const Services = () => {
    const axios = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const { data: services = [], isLoading } = useQuery({
        queryKey: ["services", search, category, sort],
        queryFn: async () => {
            const res = await axios.get(
                `/services?search=${search}&category=${category}`
            );
            return res.data;
        },
    });

    const {
        data: servicesCategories = [],
        isLoading: categoriesLoading,
    } = useQuery({
        queryKey: ["services-categories"],
        queryFn: async () => {
            const res = await axios.get("/services-categories");
            return res.data;
        },
    });

    console.log(servicesCategories);

    const sortedServices = [...services].sort((a, b) => {
        if (sort === "low") return a.cost - b.cost;
        if (sort === "high") return b.cost - a.cost;
        return 0;
    });

    if (isLoading || categoriesLoading) return <LoadingSpinner />;

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 max-w-2xl">
                    <h1 className="text-4xl font-bold">Decoration Services</h1>
                    <p className="mt-3 text-base-content/70">
                        Browse, search, and filter professional decoration services that
                        match your event needs.
                    </p>
                </div>

                <div className="mb-12 grid gap-4 md:grid-cols-3">
                    <label className="input input-bordered flex items-center gap-2 rounded-2xl">
                        <FiSearch className="text-base-content/60" />
                        <input
                            type="text"
                            placeholder="Search service..."
                            className="grow"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>

                    <select
                        className="select select-bordered rounded-2xl"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >

                        <option value="">All Categories</option>
                        {servicesCategories.map((cat) => (
                            <option key={cat._id} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="select select-bordered rounded-2xl"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >

                        <option value="">Sort by Price</option>
                        <option value="low">Low → High</option>
                        <option value="high">High → Low</option>
                    </select>
                </div>

                {sortedServices.length === 0 ? (
                    <div className="rounded-3xl border border-base-300 bg-base-200/40 py-20 text-center">
                        <p className="text-base-content/70">
                            No services found matching your criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedServices.map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
