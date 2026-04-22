"use client";

import FloatingAssistant from "./FloatingAssistant";
import VirtualAssistant from "./VirtualAssistant";
import { useAssistant } from "@/context/AssistantContext";

interface GlobalAssistantWrapperProps {
  lang: string;
  dict: any;
}

export default function GlobalAssistantWrapper({ lang, dict }: GlobalAssistantWrapperProps) {
  const { isOpen, close } = useAssistant();

  return (
    <>
      <FloatingAssistant dict={dict} />
      <VirtualAssistant 
        lang={lang} 
        dict={dict} 
        isOpen={isOpen} 
        onClose={close} 
      />
    </>
  );
}
