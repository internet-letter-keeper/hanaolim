import Letter from "./Letter";
import Point from "./Point";

const receivedTotalLetter = { unreadLetter: 8, totalLetter: 32 };
const pointAccrue = { myStamp: 2, totalStamp: 10 };

export default function Olim() {
  return (
    <>
      <Letter receivedTotalLetter={receivedTotalLetter} />
      <Point pointAccrue={pointAccrue} />
    </>
  );
}
