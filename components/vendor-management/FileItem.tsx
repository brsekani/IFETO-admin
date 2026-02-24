interface FileItemProps {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  onView: () => void;
}

export function FileItem({
  fileName,
  fileSize,
  uploadedAt,
  onView,
}: FileItemProps) {
  return (
    <div className="flex items-center justify-between py-3 rounded-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded">
          <span className="text-white text-xs font-bold">PDF</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[#2A2A2A] text-sm font-semibold">
            {fileName}
          </span>
          <span className="text-gray-400 text-xs">
            <span className="text-[#363636]">{fileSize}</span> | {uploadedAt}
          </span>
        </div>
      </div>

      <button
        onClick={onView}
        className="text-green-400 text-sm font-medium hover:underline cursor-pointer"
      >
        View
      </button>
    </div>
  );
}
