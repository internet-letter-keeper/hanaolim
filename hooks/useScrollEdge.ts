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

    //모달에 데이터 들어오면서 크기 바뀌는 것 감지
    const resizeObserver = new ResizeObserver(() => {
      update();
    });

    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, isScrolled };
};
