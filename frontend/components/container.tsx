import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-4xl min-w-full px-4 md:min-w-0">
      {children}
    </div>
  );
}