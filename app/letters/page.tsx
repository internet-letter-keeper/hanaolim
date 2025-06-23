import { getLettersByUserId } from "@/lib/actions/letter-actions";
import LettersPageClient from "./LettersPageClient";

export default async function LettersPage() {
  const currentUserId = 1;
  const { ok, data } = await getLettersByUserId(currentUserId);

  if (!ok || !data) {
    return <div>편지를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <LettersPageClient initialLetters={data} currentUserId={currentUserId} />
  );
}
