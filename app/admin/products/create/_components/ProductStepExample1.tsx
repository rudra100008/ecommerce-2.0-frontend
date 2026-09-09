"use client";
import { useMediaUpload, useMultiMediaDelete } from "@/hooks/useMedia";
import {
  ArrowRight,
  Crown,
  ImageIcon,
  ImageOff,
  Images,
  X,
} from "lucide-react";
import {  useRef, useState } from "react";
import { AnimatePresence, motion} from "framer-motion";
import Image from "next/image";

type UploadImage = {
  id: string;
  file: File;
  previewUrl: string;
  isPrimary: boolean;

  publicId?: string;
  uploadedUrl?: string;
};

// ================== File Upload component: Upload multiple images for product ====================
function FileUpload({
  onFileChange,
}: {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        className="sr-only"
        multiple
      />

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleButtonClick}
        className="group w-full h-80 max-w-2xl px-4 py-2 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-100 transition-colors 
        duration-300 hover:bg-sky-300 hover:border-sky-400  flex flex-col justify-center items-center "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isHovered ? "images" : "image"}
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            exit={{
              opacity: 0,
              rotate: 90,
            }}
            className="text-accent mb-4"
          >
            {isHovered ? (
              <Images size={90} strokeWidth={1.3} />
            ) : (
              <ImageIcon size={90} strokeWidth={1.3} />
            )}
          </motion.div>
        </AnimatePresence>
        <h1
          className={`text-2xl font-semibold ${isHovered ? "text-gray-900" : "text-gray-700"} `}
        >
          Upload your product Images
        </h1>
        <p className={`mt-2 ${isHovered ? "text-white" : "text-sky-500"}`}>
          Max size: 5MB
        </p>

        {/* <motion.h1 className="text-2xl">Upload your product images</motion.h1>
        <motion.p className="text-blue-400"> Max Size of images: 5MB</motion.p> */}
      </motion.button>
    </div>
  );
}

//===================== Product Step 1 component : This is for uploading images ===============
export function ProductStepExample1() {
  const {
    mutate: mediaUpload,
    data: mediaResponse,
    isSuccess,
    isError,
    isPending: isUploading,
  } = useMediaUpload();
  const { mutate: mediaDelete } = useMultiMediaDelete();
  const [images, setImages] = useState<UploadImage[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    const newImages: UploadImage[] = selectedImages.map((file, id) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      isPrimary: images.length === 0 && id === 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id: string) => {
    const imageToDelete = images.find((image) => image.id === id);

    if (!imageToDelete) return;

    if (imageToDelete.publicId) {
      mediaDelete([imageToDelete.publicId]);
    }

    URL.revokeObjectURL(imageToDelete.previewUrl);

    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handlePrimaryImage = (id: string) => {
    setImages((prev) =>
      prev.map((image) => ({
        ...image,
        isPrimary: image.id === id,
      })),
    );
  };
  // useEffect(() => {
  //   console.log(
  //     "Images :",
  //     images.map((prev) => prev),
  //   );
  // }, []);
  const primaryImage = images.find((image) => image.isPrimary);

  const otherImages = images.filter((image) => !image.isPrimary);

  const handleUpload = () => {
    mediaUpload(
      {
        files: images.map((image) => image.file),
        folder: "products",
      },
      {
        onSuccess: (data) => {
          setImages((prev) =>
            prev.map((image, index) => ({
              ...image,
              publicId: data[index]?.publicId,
              uploadedUrl: data[index]?.url,
            })),
          );
        },
      },
    );
  };
  return (
    <div>
      <div className="">
        {/* Fileupload button */}
        <motion.div className=" flex mb-24">
          <FileUpload onFileChange={handleFileChange} />
        </motion.div>

        {/*  Images Preview */}
        <div>

        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={handleUpload}
      >
        <p className="flex justify-center items-center gap-1 border  rounded-xl px-2 py-1 mt-20 ">
          Next <ArrowRight />
        </p>
      </motion.button> 
    </div>
  );
}
