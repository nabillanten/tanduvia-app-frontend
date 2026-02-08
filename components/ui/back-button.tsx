"use client";
import {useRouter} from "next/navigation";
import {Button} from "./button";
import {Undo2} from "lucide-react";

const BackButton = () => {
  const {back} = useRouter();
  return (
    <Button onClick={back}>
      <Undo2 /> Kembali
    </Button>
  );
};

export default BackButton;
