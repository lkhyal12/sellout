import { ChartBar, ChartColumn, Package, PlusCircle } from "lucide-react";
import React, { useState } from "react";

const AdminDahboard = () => {
  const [activeTab, setActiveTab] = useState("create-product");

  return (
    <div className="min-h-screen w-full flex justify-center py-20">
      <div className="">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500 mb-6 text-center">
          Admin Dashboard
        </h2>

        <nav className="flex items-center justify-between gap-5">
          <button
            className={`${activeTab === "create-product" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"} flex items-center justify-center gap-2 py-2 px-3 rounded cursor-pointer`}
            onClick={() => setActiveTab("create-product")}
          >
            <PlusCircle size={18} />
            Create Product
          </button>

          <button
            className={`${activeTab === "products" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"} flex items-center justify-center gap-2 py-2 px-3 rounded cursor-pointer`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={18} />
            Products
          </button>

          <button
            className={`${activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"} flex items-center justify-center gap-2 py-2 px-3 rounded cursor-pointer`}
            onClick={() => setActiveTab("analytics")}
          >
            <ChartColumn size={18} />
            Analytics
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminDahboard;
