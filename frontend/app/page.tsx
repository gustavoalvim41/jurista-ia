"use client";
import { useRef, useState } from "react";
import Container from "@/components/container";
import { Plus, MoveUp, FileText } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<File | null>();
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_5fr] gap-4">
      <div className="bg-[#dbe2f0] p-4">sidebar</div>
      <Container>
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <div className="min-w-full">
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
                  className="py-4 w-full focus:outline-none focus:ring-0 focus:border-border"
                  placeholder={
                    !file
                      ? "Faça upload do documento para revisão."
                      : "Me fale o que deseja revisar."
                  }
                  disabled={!file}
                />
                {file ? (
                  <button className="w-16 p-2 flex items-center justify-center cursor-pointer">
                    <MoveUp className="text-foreground/90" size={28} />
                  </button>
                ) : (
                  <>
                    <button
                      className="w-16 p-2 flex items-center justify-center cursor-pointer"
                      onClick={handleClick}
                    >
                      <Plus className="text-foreground/90" size={28} />
                    </button>
                    <input
                      type="file"
                      ref={inputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
