"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, ImageIcon, ImageOff, Images, Loader2, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useMediaUpload, useMultiMediaDelete } from "@/hooks/useMedia";
import type { ImageFormData, WizardFormData } from "@/lib/validations/product";

// ================== Upload rules ====================
const MAX_IMAGES = 8;
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Returns an error message if the selected files break a rule, otherwise null.
function validateFiles(files: File[], currentCount: number): string | null {
  if (currentCount + files.length > MAX_IMAGES) {
    return `You can upload at most ${MAX_IMAGES} images.`;
  }
  if (files.some((file) => !ALLOWED_TYPES.includes(file.type))) {
    return "Only JPG, PNG and WEBP images are allowed.";
  }
  if (files.some((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
    return `Each image must be under ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}

// Guarantees exactly one primary image: if none is marked, the first one becomes primary.
function ensurePrimary(images: ImageFormData[]): ImageFormData[] {
  if (images.length === 0 || images.some((image) => image.primaryImage)) {
    return images;
  }
  return images.map((image, index) => ({ ...image, primaryImage: index === 0 }));
}

// ================== File Upload: big dashed button that opens the file picker ====================
type FileUploadProps = {
  onFilesSelected: (files: File[]) => void;
  isUploading: boolean;
  disabled: boolean;
};

function FileUpload({ onFilesSelected, isUploading, disabled }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    // Reset the input so picking the same file again still fires onChange.
    event.target.value = "";
    if (files.length) onFilesSelected(files);
  };

  return (
    <div className="w-full max-w-2xl">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={ALLOWED_TYPES.join(",")}
        multiple
        className="sr-only"
      />

      <motion.button
        // Without type="button" this would submit the wizard's <form>.
        type="button"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        className="group flex h-80 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sky-300 bg-sky-100 px-4 py-2
        transition-colors duration-300 hover:border-sky-400 hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isUploading ? "loading" : isHovered ? "images" : "image"}
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-accent"
          >
            {isUploading ? (
              <Loader2 size={90} strokeWidth={1.3} className="animate-spin" />
            ) : isHovered ? (
              <Images size={90} strokeWidth={1.3} />
            ) : (
              <ImageIcon size={90} strokeWidth={1.3} />
            )}
          </motion.div>
        </AnimatePresence>

        <h1 className={`text-2xl font-semibold ${isHovered ? "text-gray-900" : "text-gray-700"}`}>
          {isUploading ? "Uploading images..." : "Upload your product images"}
        </h1>
        <p className={`mt-2 ${isHovered ? "text-white" : "text-sky-500"}`}>
          JPG, PNG or WEBP · Max {MAX_FILE_SIZE_MB}MB each · Up to {MAX_IMAGES} images
        </p>
      </motion.button>
    </div>
  );
}

// ================== Image Card: one uploaded image with "set primary" and "remove" buttons ====================
type ImageCardProps = {
  image: ImageFormData;
  isLarge?: boolean;
  disabled: boolean;
  onSetPrimary: (publicId: string) => void;
  onRemove: (publicId: string) => void;
};

function ImageCard({ image, isLarge = false, disabled, onSetPrimary, onRemove }: ImageCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className={`group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg
        ${isLarge ? "col-span-2" : ""}`}
    >
      <Image
        src={image.imageUrl}
        alt={image.primaryImage ? "Primary product image" : "Product image"}
        fill
        sizes={isLarge ? "400px" : "200px"}
        className="object-cover"
      />

      <div className="absolute right-2 top-2 z-10 flex gap-1">
        {/* Crown: always visible on the primary image, shown on hover for the others */}
        <motion.button
          type="button"
          title="Set as primary image"
          aria-label="Set as primary image"
          disabled={disabled}
          whileHover={{ scale: 1.1 }}
          onClick={() => onSetPrimary(image.publicId)}
          className={`cursor-pointer rounded-full bg-black/40 p-1 transition-all duration-300 hover:bg-yellow-400
            ${image.primaryImage ? "text-yellow-400" : "text-white opacity-0 group-hover:opacity-100"}`}
        >
          <Crown size={12} />
        </motion.button>

        <motion.button
          type="button"
          title="Remove image"
          aria-label="Remove image"
          disabled={disabled}
          whileHover={{ scale: 1.1 }}
          onClick={() => onRemove(image.publicId)}
          className="cursor-pointer rounded-full bg-black/40 p-1 text-white transition-colors duration-300 hover:bg-red-400"
        >
          <X size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ================== Image Previews: primary image on top (large), the rest in a grid below ====================
type ImagePreviewsProps = {
  images: ImageFormData[];
  disabled: boolean;
  onSetPrimary: (publicId: string) => void;
  onRemove: (publicId: string) => void;
};

function ImagePreviews({ images, disabled, onSetPrimary, onRemove }: ImagePreviewsProps) {
  if (images.length === 0) {
    return (
      <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-10 text-gray-400">
        <ImageOff size={40} strokeWidth={1.3} />
        <p className="text-sm">No images uploaded yet</p>
      </div>
    );
  }

  const primaryImage = images.find((image) => image.primaryImage);
  const otherImages = images.filter((image) => !image.primaryImage);

  return (
    <div className="grid w-full max-w-[400px] grid-cols-2 gap-3">
      {primaryImage && (
        <ImageCard
          isLarge
          image={primaryImage}
          disabled={disabled}
          onSetPrimary={onSetPrimary}
          onRemove={onRemove}
        />
      )}

      {otherImages.map((image) => (
        <ImageCard
          key={image.publicId}
          image={image}
          disabled={disabled}
          onSetPrimary={onSetPrimary}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

//===================== Product Step 1: upload images and store them in the wizard form ===============
export function ProductStepExample1() {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<WizardFormData>();

  // `images` re-renders the UI. Inside async handlers we use getValues() instead,
  // because it always returns the latest value, even after an await.
  const images = useWatch({ name: "product.images" });

  const { mutateAsync: uploadImages, isPending: isUploading } = useMediaUpload();
  const { mutateAsync: deleteImages, isPending: isDeleting } = useMultiMediaDelete();
  const isBusy = isUploading || isDeleting;

  // Single place that writes images to the form, so the "one primary" rule is always applied.
  const saveImages = (nextImages: ImageFormData[]) => {
    setValue("product.images", ensurePrimary(nextImages), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleFilesSelected = async (files: File[]) => {
    if (isBusy) return;

    const error = validateFiles(files, getValues("product.images").length);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const uploaded = await uploadImages({ files, folder: "products" });

      // The backend should return one result per file. Anything else is a partial upload.
      const isComplete =
        uploaded.length === files.length &&
        uploaded.every((item) => item.imageUrl && item.publicId);

      if (!isComplete) {
        // Delete whatever did upload so it doesn't sit orphaned in Cloudinary.
        const uploadedIds = uploaded.map((item) => item.publicId).filter(Boolean);
        if (uploadedIds.length) deleteImages(uploadedIds).catch(() => {});
        toast.error("Some images failed to upload. Please try again.");
        return;
      }

      const newImages: ImageFormData[] = uploaded.map((item) => ({
        imageUrl: item.imageUrl,
        publicId: item.publicId,
        primaryImage: false, // ensurePrimary() picks the first one if needed
      }));

      saveImages([...getValues("product.images"), ...newImages]);
      toast.success("Images uploaded successfully.");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed.");
    }
  };

  const handleSetPrimary = (publicId: string) => {
    saveImages(
      getValues("product.images").map((image) => ({
        ...image,
        primaryImage: image.publicId === publicId,
      }))
    );
  };

  const handleRemove = async (publicId: string) => {
    if (isBusy) return;

    try {
      // Delete from Cloudinary first, then from the form, so the two never disagree.
      await deleteImages([publicId]);
      saveImages(getValues("product.images").filter((image) => image.publicId !== publicId));
    } catch {
      toast.error("Could not remove the image.");
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Product Images</h2>
        <p className="text-sm text-gray-500">
          Upload up to {MAX_IMAGES} images and choose one as the primary image.
        </p>
      </header>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <FileUpload
          onFilesSelected={handleFilesSelected}
          isUploading={isUploading}
          disabled={isBusy || images.length >= MAX_IMAGES}
        />

        <ImagePreviews
          images={images}
          disabled={isBusy}
          onSetPrimary={handleSetPrimary}
          onRemove={handleRemove}
        />
      </div>

      {errors.product?.images?.message && (
        <p role="alert" className="text-sm text-red-600">
          {errors.product.images.message}
        </p>
      )}
    </section>
  );
}
