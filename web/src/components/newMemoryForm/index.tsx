"use client";
import { Camera } from "lucide-react";
import { MediaPicker } from "../mediaPicker";
import Cookie from "js-cookie";
import { api } from "@/lib/api";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function NewMemoryForm() {
  const router = useRouter();
  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(Array.from(formData.entries()));

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;

      const token = Cookie.get("token");

      await api.post(
        "/memories",
        {
          coverUrl,
          content: formData.get("content"),
          isPublic: formData.get("isPublic"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-col flex-1 gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="w-4 h-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="w-4 h-4 text-purple-500 border-gray-700 rounded"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="flex-1 w-full p-0 text-lg leading-relaxed text-gray-100 bg-transparent border-0 rounded resize-none placeholder:text-gray-400 focus:ring-0"
        placeholder="Fiquei livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre"
      />
      <button
        type="submit"
        className="inline-block px-5 py-3 text-sm leading-none text-black uppercase bg-green-500 rounded-full font-alt hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}
