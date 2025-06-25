import { BasicHeader } from "@/components/common";
import {
  AllLettersCnt,
  FilterBtn,
  LetterboxTabSelector,
  LettersList,
  SearchLetter,
} from "@/components/letters";
import { requireAuth } from "@/utils/auth";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function LettersPage({ searchParams }: Props) {
  const box = (searchParams.box as "mine" | "friend") ?? "mine";
  const query = (searchParams.query as string) ?? "";
  const session = await requireAuth();
  const currentUserId = session?.user?.userId!;

  return (
    <div className="flex flex-col gap-4">
      <BasicHeader title="편지 보관함" />
      <LetterboxTabSelector box={box} />
      <SearchLetter />
      {/* <AllLettersCnt total={data.length} /> */}
      <FilterBtn />
      <LettersList searchParams={searchParams} currentUserId={currentUserId} />
    </div>
  );
}
