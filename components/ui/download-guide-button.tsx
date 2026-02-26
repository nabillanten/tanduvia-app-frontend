import {Button} from "@/components/ui/button";
import {FileText, Download} from "lucide-react";

const DownloadGuideButton = ({
  path,
  filename,
}: {
  path: string;
  filename: string;
}) => {
  return (
    // Path href merujuk langsung ke folder public (tidak perlu tulis kata 'public')
    <a
      href={path}
      download={filename} // Nama file saat didownload oleh user
    >
      <Button className="w-full font-bold p-6 border hover:scale-105 transition-transform">
        <FileText className="h-4 w-4" />
        <span>Download Buku Panduan</span>
        <Download className="h-4 w-4" />
      </Button>
    </a>
  );
};

export default DownloadGuideButton;
