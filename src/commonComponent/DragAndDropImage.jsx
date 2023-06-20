import React from "react";
import { useDropzone } from "react-dropzone";
import { DownloadCloud } from "react-feather";

const DragAndDropImage = ({ setFieldValue, name, setThumbnailLink }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (e) => {
      setFieldValue(name, e[0]);
      setThumbnailLink(e[0]?.path);
    },
  });

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input name={name} {...getInputProps()} />
        <div className="p-1 text-center d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={64} />
          <h5>Drop Files here or click to upload</h5>
        </div>
      </div>
    </>
  );
};

export default DragAndDropImage;
