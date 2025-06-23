import { getLettersByUserId } from "@/lib/actions/letter-actions";
import { requireAuth } from "@/utils/auth";
import LettersPageClient from "./LettersPageClient";

export default async function LettersPage() {
  const session = await requireAuth();

  const currentUserId = session?.user?.userId!;

  const { ok, data } = await getLettersByUserId(currentUserId);

  if (!ok || !data) {
    return <div>편지를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <LettersPageClient initialLetters={data} currentUserId={currentUserId} />
  );
}
