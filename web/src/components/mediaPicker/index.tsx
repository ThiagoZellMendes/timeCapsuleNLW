'use client'
import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPriview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);
    setPriview(previewURL)
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        accept="image/*"
        className="invisible w-0 h-0"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="object-cover w-full rounded-t-lg aspect-video"
        />
      )}
    </>
  );
}
