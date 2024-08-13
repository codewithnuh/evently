"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

/**
 * FileUploader Component
 *
 * This component provides a UI for uploading image files.
 * It uses a drag-and-drop interface and also allows users
 * to select files from their computer. The uploaded file is
 * processed and its URL is passed to a callback function.
 *
 * @param {string} imageUrl - The current URL of the image to be displayed.
 * @param {(url: string) => void} onFieldChange - Callback function to update the parent component with the file's URL.
 * @param {Dispatch<SetStateAction<File[]>>} setFiles - Function to update the state with the selected files.
 *
 * @returns JSX.Element
 */
export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  // Handle file drop and convert the file to a URL
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, onFieldChange]
  );

  // Initialize the dropzone with specific settings
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 h-72 rounded-xl bg-grey-50 flex flex-col overflow-hidden cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex justify-center flex-1 w-full h-full">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="object-cover object-center w-full"
          />
        </div>
      ) : (
        <div className="flex-center text-grey-500 flex-col py-5">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mt-2 mb-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
