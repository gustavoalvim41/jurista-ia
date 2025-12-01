"use client";
import { useRef, useState } from "react";
import Container from "@/components/container";
import { Plus, MoveUp, FileText } from "lucide-react";
import axios from "axios";
import chatSchema from "../zod/chat";

const chat = [
  {
    usuario: "Consulte o documento e me diga qual é o prazo para apresentação.",
    ia: "De acordo com o documento expedido nº 123/2025, o prazo para apresentação é de 10 dias úteis a partir da data de intimação. 📝",
  },
];

export default function Home() {
  const [file, setFile] = useState<File | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<boolean>(false);
  const [question, setQuestion] = useState("");

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Arquivo selecionado:", selectedFile.name);
    }
  };
  const flat = chat.flatMap((msg, index) => [
    { id: index * 2, from: "user", text: msg.usuario },
    { id: index * 2 + 1, from: "ia", text: msg.ia },
  ]);
  const handleUpload = async () => {
    const input = document.querySelector(
      "input[type='text']"
    ) as HTMLInputElement;
    const question = input?.value ?? "";
    const validation = chatSchema.safeParse({
      file,
      question,
    });
    if (!validation.success) {
      const issue = validation.error.issues[0];
      const field = issue.path[0]; // "file" ou "question"
      const message = issue.message;
      if (field === "file") {
        alert(message);
        setFile(null);
        return;
      }
      if (field === "question") {
        alert(message);
        return;
      }
    }
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("question", question);
    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`Upload realizado: ${file!.name}`);
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };
  return (
    <Container>
      <div
        className={`flex flex-col gap-4 h-screen ${
          message ? "justify-end pb-6" : "justify-center"
        }`}
      >
        {message ? (
          <div className="flex flex-col gap-3">
            {flat.map((m) => (
              <div
                key={m.id}
                className={`p-2 leading-relaxed text-base tracking-wide ${
                  m.from === "user"
                    ? "bg-foreground/90 text-primary-foreground max-w-sm break-words self-end"
                    : "text-foreground self-start"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
        ) : null}
        <h1 className="mb-3 text-2xl font-medium tracking-normal leading-relaxed text-foreground/90 text-center">
          Bom dia! Gustavo.
        </h1>
        <div className="border-2 border-border p-4">
          {file && (
            <div
              className="flex items-center justify-center gap-4 p-2 border-2 border-border bg-background w-fit max-w-full 
               overflow-hidden transition-all duration-300 ease-in-out opacity-100"
              style={{ maxHeight: "100px" }}
            >
              <FileText className="text-foreground/90" size={42} />
              <div className="min-w-0">
                <p className="truncate">{file.name}</p>
                <p className="text-foreground/50">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="py-4 w-full focus:outline-none focus:ring-0 focus:border-border"
              placeholder={
                !file
                  ? "Faça upload do documento para revisão."
                  : "Me fale o que deseja revisar."
              }
              disabled={!file}
            />
            {file ? (
              <button
                className="w-16 p-2 flex items-center justify-center cursor-pointer"
                onClick={handleUpload}
              >
                <MoveUp className="text-foreground/90" size={28} />
              </button>
            ) : (
              <button
                className="w-16 p-2 flex items-center justify-center cursor-pointer"
                onClick={handleClick}
              >
                <Plus className="text-foreground/90" size={28} />
              </button>
            )}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
