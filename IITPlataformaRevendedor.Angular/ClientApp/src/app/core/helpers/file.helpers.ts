import { generarCodigo } from "./other.helpers";

export const convertirBase64toBytes = (base64Data: any, contentType: any): Blob => {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

export const base64ToArrayBuffer = (base64: any) => {
    var binary_string = base64.replace(/\\n/g, '');
  binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export const donwloadFilePDF = ( blolUrl: string) =>  {
    var fileName = generarCodigo() + ".pdf";
    var a = document.createElement("a");
    a.href = blolUrl;
    a.download = fileName;
    a.click();
}
