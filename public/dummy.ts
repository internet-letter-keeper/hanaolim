export function createDummyData() {
  const data = [];

  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    data.push({
      description: "하나은행 편지 이벤트",
      date,
      amount: 100,
      balance: 100 * (i + 1),
    });
  }

  return data;
}
