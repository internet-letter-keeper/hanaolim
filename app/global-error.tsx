"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>⚠️ 에러가 발생했습니다</h1>
          <p>{error.message}</p>
        </div>
      </body>
    </html>
  );
}
