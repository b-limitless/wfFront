export const isValidExtension = (
  value: string,
  supportedExtensions: string[]
) => {
  const path = value.split(".");
  const extension = `${path[path.length - 1]}`.toLowerCase();
  if (supportedExtensions.indexOf(extension) > -1) {
    return true;
  }
  return false;
};

export const getExtensionFromBase64 = (file: string) => {
  if (file && typeof file === "string") {
    const fileType = file.split(";")[0];
    const fileTypeArr = fileType.split("/");
    return fileTypeArr[fileTypeArr.length - 1];
  }
  return null;
};

export const toBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
