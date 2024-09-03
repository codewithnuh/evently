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

const CategoryFilter = () => {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     let newUrl = "";
  //     if (category && category !== "All") {
  //       newUrl = formUrlQuery({
  //         params: searchParams.toString(),
  //         key: "category",
  //         value: category,
  //       });
  //     } else {
  //       newUrl = removeKeysFromQuery({
  //         params: searchParams.toString(),
  //         keysToRemove: ["category"],
  //       });
  //     }
  //     router.push(newUrl, { scroll: false });
  //   }, 300);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [category, searchParams, router]);
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
