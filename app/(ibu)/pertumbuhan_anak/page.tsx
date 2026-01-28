import {getPertumbuhanAnak} from "@/app/actions/anak";
import React from "react";
import PertumbuhanAnakList from "./PertumbuhanAnakContent";

type Props = object;

const PertumbuhanAnakPage = async (props: Props) => {
  const response = await getPertumbuhanAnak({
    nik: "3201234567890123",
    nama: "Siti Nurhaliza",
    tanggal_lahir: "1990-05-15T08:55:44.235Z",
  });
  // const response = await getPertumbuhanAnak({
  //   nik: "3274080101050001",
  //   nama: "Rima Oktaviani",
  //   tanggal_lahir: "2000-06-14T08:55:44.235Z",
  // });

  return (
    <React.Suspense key={response} fallback={<p>loading..</p>}>
      <PertumbuhanAnakList childrenData={response?.data} />
    </React.Suspense>
  );
};

export default PertumbuhanAnakPage;
