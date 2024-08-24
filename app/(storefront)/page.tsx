import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";

export default function IndexPage() {
  return (
    <div className="">
      <Hero/>
      <CategoriesSelection/>
      <FeaturedProducts/>
    </div>
  );
}
