import { Letter } from "@/types/letters";
import { Txt } from "../atoms";

type Props = {
  reply: Letter;
};

export default function ReplyItem({ reply }: Props) {
  const { id, writer, content, createDt } = reply;

  return (
    <div className={`mt-4`}>
      <div key={id} className="bg-white p-4">
        <div className="flex justify-between items-start ">
          <Txt size={18} weight="cm" className="text-green-49d">
            To. {writer}
          </Txt>
        </div>

        <div className="flex">
          <Txt
            size={12}
            weight="cm"
            className=" text-gray-353 whitespace-nowrap"
          >
            {createDt}
          </Txt>
        </div>

        <div className="flex mt-2">
          <Txt
            size={15}
            weight="cm"
            align="left"
            className=" text-gray-353 mt-1 line-clamp-2 break-words"
          >
            {content}
          </Txt>
        </div>
      </div>
    </div>
  );
}
