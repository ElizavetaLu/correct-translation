import { useState } from "react";

export default function useToggle() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);

    return [isOpen, toggle] as const;
}