import { Fade } from "react-awesome-reveal";

export function Footer() {
  return (
    <section className="flex h-[8%] md:h-[5%] flex-col gap-1 md:gap-0 md:flex-row items-center justify-center md:justify-center px-2 md:px-8 py-2 md:py-4 text-sm bg-main-footer w-full">
      <div className="text-main-blue font-semibold">
        <Fade cascade damping={0.1}>
          © Copyright 2024 | Todos os direitos reservados a Viveo
        </Fade>
      </div>
    </section>
  );
}
