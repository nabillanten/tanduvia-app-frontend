"use client";

import * as React from "react";
import {format} from "date-fns";
import {id as idLocale} from "date-fns/locale";
import {Calendar as CalendarIcon} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export function DateFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("tanggal");
  const date = dateParam ? new Date(dateParam) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      params.set("tanggal", formattedDate);
    } else {
      params.delete("tanggal");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd MMM yyyy", {locale: idLocale})
          ) : (
            <span>Tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
        />
        {date && (
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              className="w-full h-8 text-xs"
              onClick={() => handleSelect(undefined)}>
              Hapus Filter Tanggal
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
