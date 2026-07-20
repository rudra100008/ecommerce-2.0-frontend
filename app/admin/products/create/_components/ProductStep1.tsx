"use client";
import { useMediaUpload } from "@/hooks/useMedia";
import {
  ArrowRight,
  CloudyIcon,
  FileImage,
  ImageIcon,
  ImagePlus,
  Images,
  ImagesIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

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
        <motion.div
          key={isHovered ? "images" : "image"}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent mb-4"
        >
          {isHovered ? (
            <Images size={90} strokeWidth={1.3} />
          ) : (
            <ImageIcon size={90} strokeWidth={1.3} />
          )}
        </motion.div>
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
export function ProductStep1() {
  const { mutate: mediaUpload, isSuccess, isError } = useMediaUpload();

  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const getFiles = Array.from(event.target.files);

    setFiles((prev) => [...prev, ...getFiles]);
    console.log("Image File handled:", files);
    getFiles.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      console.log("Image preview:", file);
      setImagePreviews((prev) => [...prev, imageUrl]);
    });
  };
  return (
    <div>
      <div className="flex gap-12">
        {/* Fileupload button */}
        {/* <input type="file" onChange={handleFileChange} multiple /> */}
        <motion.div>
          <FileUpload onFileChange={handleFileChange} />
        </motion.div>

        {/*  Images Preview */}
        <div className="">
          {imagePreviews && imagePreviews.length > 0 ? (
            <motion.div className="grid grid-cols-3 gap-4 mt-8">
              {imagePreviews.map((image) => (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  key={image}
                  src={image}
                  alt="image"
                  width={200}
                  height={200}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div className="text-center text-gray-600 font-normal text-xl ">
              <p>No Product image</p>
            </motion.div>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => mediaUpload({ files, folder: "products" })}
      >
        <p className="flex justify-center items-center gap-1 border  rounded-xl px-2 py-1 mt-20 ">
          Next <ArrowRight />{" "}
        </p>
      </motion.button>
    </div>
  );
}
