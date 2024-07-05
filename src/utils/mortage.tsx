export const mortage = ({
  amount,
  years,
  interestRate
}: {
  amount: number
  years: number
  interestRate: number
}) => {
  const P = amount
  const i = interestRate / (12 * 100)
  const n = years * 12
  const v = (1 + i) ** n

  const M = (P * (i * v)) / (v - 1)

  return M
}
