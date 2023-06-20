import { useState } from "react";
import { axiosApi } from "../../helpers/axios";

const useVideoUpload = () => {
  let currentChunk = 0;
  const chunkSize = (1 * 1024 * 1024) / 4;
  let fileSize = null;
  let noChunks = 0;
  let file = null;
  let module = null;
  // let mediaUploaderId = null;
  let uniqueId = null;
  let currentTime = null;

  const [response, setResponse] = useState(null);

  // const [isUploading, setIsUploading] = useState(false);
  // const [progress, setProgress] = useState(0);
  function handleVideo({ mod, mediaFile }) {
    // mediaUploaderId = id;
    uniqueId = Date.now();
    currentTime = Date.now();
    module = mod;
    file = mediaFile;
    fileSize = file.size;
    noChunks = Math.ceil(fileSize / chunkSize);
    // setIsUploading(true);

    nextChunk();
  }

  function nextChunk() {
    const reader = new FileReader();
    let from = currentChunk * chunkSize;
    let to = from + chunkSize;
    let blob = file.slice(from, to);
    reader.onload = (e) => uploadChunk(e);
    reader.readAsDataURL(blob);
  }

  function uploadChunk(readerEvent) {
    const data = readerEvent.target.result;
    const params = new URLSearchParams();
    params.set("fileName", file.name);
    params.set("currentChunkIndex", currentChunk);
    params.set("totalChunk", Math.ceil(file.size / chunkSize));
    params.set("uniqueId", uniqueId);
    params.set("module", module);
    params.set("time", currentTime);
    const headers = { "Content-Type": "application/octet-stream" };
    const url = `/file/upload?` + params.toString();
    axiosApi.post(url, data, { headers }).then((response) => {
      if (!(noChunks - 1 >= currentChunk)) {
        // setProgress(100);
        // setIsUploading(false);
      }
      if (noChunks >= currentChunk) {
        // let total = Math.ceil(file.size / chunkSize);
        // let percentage = Math.ceil((currentChunk / total) * 100);
        // setProgress(percentage);
        currentTime = Date.now();
        currentChunk++;
        setResponse(response?.data?.data);
        return nextChunk();
      }
    });
  }

  return [handleVideo, response];
};

export default useVideoUpload;
