"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type Posyandu = {
  id: string;
  nama: string;
};

type Props = {
  placeholder?: string;
  data: Posyandu[];
};

const PosyanduFilter = ({placeholder = "Pilih Posyandu", data}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const currentFilter = searchParams.get("posyandu_id")?.toString();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (value === "all" || !value) {
      params.delete("posyandu_id");
    } else {
      params.set("posyandu_id", value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={currentFilter || ""} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Posyandu</SelectItem>
        {data?.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.nama}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PosyanduFilter;
