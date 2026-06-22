import CategoryCard from "../components/CategoryCard";
const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];
const HomePage = () => {
  return (
    <div className="min-h-screen py-18 px-2">
      <h2 className="text-blue-600 text-5xl font-bold text-center mb-5">
        Explore Our Categories
      </h2>
      <p className="text-gray-400 text-center mb-6">
        Discover the latest trends in eco-friendly fashion
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto">
        {categories.length > 0 &&
          categories.map((category) => (
            <CategoryCard
              key={category.name}
              image={category.imageUrl}
              category={category.name}
              href={category.href}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
