import React from "react";
import { Utensils, ChefHat, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RekomendasiItem {
  id: string;
  nama_makanan: string;
}

interface Rekomendasi {
  id: string;
  judul: string;
  deskripsi: string;
  jenis_indeks: string;
  target_status: string;
  rekomendasi_item: RekomendasiItem[];
}

export const NutritionCard = ({ data }: { data: Rekomendasi }) => {
  return (
    <Card className="border-l-4 border-l-green-500 bg-green-50/50 shadow-sm mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                    <ChefHat className="h-5 w-5" />
                    {data.judul}
                </CardTitle>
                <Badge variant="outline" className="bg-white text-green-700 border-green-200">
                    Fokus: {data.jenis_indeks.replace("_", "/")}
                </Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {data.deskripsi}
        </p>

        <div className="bg-white p-4 rounded-xl border border-green-100">
          <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Utensils className="h-4 w-4 text-green-600" />
            Menu Rekomendasi:
          </h5>
          <div className="flex flex-wrap gap-2">
            {data.rekomendasi_item.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 font-medium border border-green-200"
              >
                {item.nama_makanan}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};