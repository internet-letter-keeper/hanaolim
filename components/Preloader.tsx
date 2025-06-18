"use client";

import Image from "next/image";

//화면에 스플래시 화면도, 로그인 화면도 안 나왔을 때 노출될 Preloader 화면

export default function Preloader() {
  return (
    <div className="absolute inset-0 -m-4 z-50 bg-lime-900">
      <Image
        src="/images/home-splash.png"
        alt="로딩 중..."
        fill
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAArABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcIC"
        className="object-cover animate-pulse"
      />
    </div>
  );
}
