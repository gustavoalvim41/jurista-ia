"use client";
import { useState } from "react";
import Container from "@/components/container";
import { Plus, MoveUp } from "lucide-react";

// import Image from "next/image";
// import pdf from "../public/pdf.svg";

export default function Home() {
  const [file, setFile] = useState<boolean>(false);
  return (
    <Container>
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="min-w-full">
          <h1 className="text-2xl font-medium tracking-normal leading-relaxed text-foreground/90 text-center">
            Bom dia! Gustavo.
          </h1>
          <div className="mt-3 p-4 border-2 border-border bg-background">
            {file ? (
              <div className="flex gap-4 p-2 border-2 border-border bg-background w-fit max-w-full">
                {/* <Image height={48} src={pdf} alt="ext file" /> */}
                pdf
                <div className="min-w-0">
                  <p className="truncate">file_name.pdf</p>
                  <p className="text-foreground/50">2,323 KB</p>
                </div>
              </div>
            ) : null}
            <div className="flex">
              <input
                type="text"
                className={`w-full ${
                  file ? "py-4" : "py-2"
                } focus:outline-none focus:ring-0 focus:border-border`}
                placeholder={
                  !file
                    ? "Faça upload do documento para revisão."
                    : "Me fale o que deseja revisar."
                }
                disabled={!file}
              />
              {file ? (
                <button className="p-2 flex items-center justify-center cursor-pointer">
                  <MoveUp className="text-foreground/90" size={28} />
                </button>
              ) : (
                <button className="p-2 flex items-center justify-center cursor-pointer">
                  <Plus className="text-foreground/90" size={28} />
                </button>
              )}
            </div>
            {/* <div className="text-sm text-gray-500">
              Seu arquivo está pronto para ser revisado!
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
}
