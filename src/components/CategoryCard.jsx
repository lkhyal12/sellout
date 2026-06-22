import { Link } from "react-router-dom";

const CategoryCard = ({ image, category, href }) => {
  return (
    <Link
      to={href}
      className="overflow-hidden w-full rounded-lg h-80  relative z-10"
    >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-[1.3] "
      />
      <div className="w-full absolute bottom-0 left-0 bg-black/20 text-white py-2 px-4">
        <h3 className="font-bold text-2xl mb-2">{category}</h3>
        <p>Explore {category}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
