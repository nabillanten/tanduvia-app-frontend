"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Badge} from "./badge";

const StatusFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const currentFilter = searchParams.get("status")?.toString();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (value === "all" || !value) {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={currentFilter || ""} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Pilih Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <Badge>Semua Status</Badge>
        </SelectItem>
        <SelectItem value="published">
          <Badge className="bg-green-100 text-green-900">Published</Badge>
        </SelectItem>
        <SelectItem value="pending">
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
        </SelectItem>
        <SelectItem value="rejected">
          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
