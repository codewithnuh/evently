import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
type Collection = {
  data: IEvent[];
  emptyTitle: string;
  epmtyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "all_Events";
};
const Collection = ({
  data,
  emptyTitle,
  epmtyStateSubtext,
  limit,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: Collection) => {
  return <div>COllection</div>;
};

export default Collection;
