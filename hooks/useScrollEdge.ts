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
      setIsBottom(distanceFromBottom <= 100); //스크롤 내리면 페이드 사라짐 (500자 맞춰서 설정)
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

  return { ref, isBottom };
};
