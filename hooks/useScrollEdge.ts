import { useEffect, useRef, useState } from "react";

export const useScrollEdges = <T extends HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      setIsScrolled(el.scrollTop > 0); //스크롤 내리자마자 페이드 사라짐
    };

    //초기 값 감지
    update();
    el.addEventListener("scroll", update);

    return () => {
      el.removeEventListener("scroll", update);
    };
  }, []);

  return { ref, isScrolled };
};
