import { useEffect, useRef, useState } from "react";

export const useScrollEdges = <T extends HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setIsBottom(distanceFromBottom <= 60); //스크롤 내리면 페이드 사라짐 (500자 맞춰서 설정)
    };

    update(); //초기값 지정
    el.addEventListener("scroll", update);
    return () => el.removeEventListener("scroll", update);
  }, []);

  return { ref, isBottom };
};
