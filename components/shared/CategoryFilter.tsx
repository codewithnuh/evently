"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

/**
 * CategoryFilter component for filtering categories.
 * This component provides a dropdown select menu to filter categories.
 * It fetches all categories on mount and updates the category list accordingly.
 * It also handles category selection and updates the URL query parameters based on the selected category.
 * @returns JSX.Element
 */
const CategoryFilter = () => {
  const router = useRouter();

  const [category, setCategory] = useState(""); // State for the selected category
  const [categories, setCategories] = useState<ICategory[]>([]); // State for the list of categories
  const searchParams = useSearchParams(); // Hook to access search parameters

  useEffect(() => {
    /**
     * Fetches all categories and updates the category list state.
     * @returns void
     */
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  /**
   * Handles the selection of a category and updates the URL query parameters.
   * @param category - The selected category
   * @returns void
   */
  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            key={category._id}
            value={category.name}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
