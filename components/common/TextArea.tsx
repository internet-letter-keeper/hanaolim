export default function TextArea() {
  return (
    <div className="flex w-full">
      <textarea
        className="flex w-full h-[230px] rounded-[10px] py-[10px] px-[18px] shadow drop-shadow-[0px_0px_5px_rgba(0,0,0,0.15)] bg-white-fff font-[Hana2-CM] text-sm text-gray-939 placeholder:text-blue-9a0 focus:outline-none"
        placeholder="내용을 입력하세요"
        required
      />
    </div>
  );
}
