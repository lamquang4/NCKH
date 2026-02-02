import Image from "../../Image";
import { Link } from "react-router-dom";
import useGetActiveCategories from "../../../hooks/customer/category/useGetActiveCategories";

function CategoryList() {
  const { categories } = useGetActiveCategories();

  if (!categories.length) return null;

  return (
    <aside className="w-auto sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto custom-scroll lg:block hidden rounded-lg shadow-lg my-3 bg-white">
      <h5 className="font-semibold text-black px-3 py-1.5">Danh mục</h5>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/products/${category.slug}`}
              className="px-3 py-1.5 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <Image
                  source={category.image || ""}
                  alt={category.name}
                  className="w-[50px] object-cover"
                  loading="lazy"
                />

                <p className="font-medium">{category.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryList;
