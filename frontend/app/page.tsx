"use client";

import { useRef, useState } from "react";
import Container from "@/components/container";
import { Plus, MoveUp, FileText } from "lucide-react";
import axios from "axios";
import chatSchema from "../zod/chat";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [latency, setLatency] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState<{ usuario: string; ia: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const openFileDialog = () => inputRef.current?.click();
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };
  const handleUpload = async () => {
    const validation = chatSchema.safeParse({ file, question });
    if (!validation.success) {
      const { path, message } = validation.error.issues[0];
      alert(message);
      if (path[0] === "file") setFile(null);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("question", question!);
      setLatency("Lendo documento....");
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLatency("Analisando pergunta....");
      const response = await axios.post(
        "http://localhost:5000/api/quest",
        { question: question },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setChat((prev) => [
        ...prev,
        { usuario: question, ia: response.data.answer },
      ]);
      alert(`Upload realizado: ${file!.name}`);
      setShowChat(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container>
      <div
        className={`flex flex-col gap-4 h-screen ${
          showChat ? "justify-end pb-6" : "justify-center"
        }`}
      >
        {showChat && (
          <div className="flex flex-col gap-3">
            {chat.map((msg, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="p-2 bg-blue-500 text-white max-w-sm self-end rounded-md">
                  {msg.usuario}
                </div>
                <div className="p-2 text-gray-900 self-start rounded-md">
                  {msg.ia}
                </div>
              </div>
            ))}
          </div>
        )}
        {!showChat && (
          <h1 className="mb-3 text-2xl font-medium text-center text-foreground/90">
            Bom dia, Gustavo.
          </h1>
        )}
        <div className="border-2 border-border p-4">
          {file && (
            <div className="flex items-center gap-4 p-2 border-2 border-border bg-background w-fit max-w-full">
              <FileText size={42} className="text-foreground/90" />
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
              disabled={!file}
              placeholder={
                !file
                  ? "Faça upload do documento para revisão."
                  : "O que deseja revisar?"
              }
              className="py-4 w-full focus:outline-none"
            />
            {file ? (
              <button className="w-16 p-2" onClick={handleUpload}>
                <MoveUp size={28} className="text-foreground/90" />
              </button>
            ) : (
              <button className="w-16 p-2" onClick={openFileDialog}>
                <Plus size={28} className="text-foreground/90" />
              </button>
            )}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={onFileSelect}
            />
          </div>
          <p className="text-foreground/60 text-sm">{latency}</p>
        </div>
      </div>
    </Container>
  );
}
