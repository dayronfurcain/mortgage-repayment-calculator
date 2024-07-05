import { useState } from 'react'
import iconCalculator from '../assets/icon-calculator.svg'
import { mortage } from '../utils/mortage'

interface Props {
  handleResult: (result: {
    repayments: number
    totalRepayments: number
    totalInterest: number
    interestPerMonth: number
    mortgageType: string
  }) => void
  handleShow: (value: boolean) => void
}

function MortgageCalculator({ handleResult, handleShow }: Props) {
  const [mortgageAmount, setMortgageAmount] = useState('')
  const [mortgageTerm, setMortgageTerm] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [mortgageType, setMortgageType] = useState('')
  const [error, setError] = useState({
    mortgageAmount: '',
    mortgageTerm: '',
    interestRate: '',
    mortgageType: ''
  })

  const handleChangeMortgageAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setMortgageAmount(value)
  }

  const handleChangeMortgageTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMortgageTerm(value)
  }

  const handleChangeInterestRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInterestRate(value)
  }

  const handleChangeMortgageType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMortgageType(value)
  }

  const reset = () => {
    setMortgageAmount('')
    setMortgageTerm('')
    setInterestRate('')
    setMortgageType('')
    setError({
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: ''
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = {
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: ''
    }

    error.mortgageAmount = !mortgageAmount ? 'The field is required' : ''
    error.mortgageTerm = !mortgageTerm ? 'The field is required' : ''
    error.interestRate = !interestRate ? 'The field is required' : ''
    error.mortgageType = !mortgageType ? 'The field is required' : ''

    if (Object.values(error).some((el) => el === 'The field is required')) {
      setError(error)
      handleShow(false)
      return
    }

    setError({
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: ''
    })

    const result = mortage({
      amount: Number(mortgageAmount),
      interestRate: Number(interestRate),
      years: Number(mortgageTerm)
    })

    const repayments = result
    const totalRepayments = result * Number(12 * Number(mortgageTerm))
    const totalInterest = totalRepayments - Number(mortgageAmount)
    const interestPerMonth = totalInterest / (12 * Number(mortgageTerm))

    handleResult({
      repayments,
      totalRepayments,
      totalInterest,
      interestPerMonth,
      mortgageType
    })

    handleShow(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='px-4 py-12 w-full flex flex-col gap-4 lg:flex-1 lg:h-full lg:justify-between lg:gap-0'
    >
      <div className='flex flex-col gap-y-1 lg:gap-y-8'>
        <h2 className='font-bold text-slate-700 lg:text-3xl'>
          Mortgage Calculator
        </h2>
        <span
          onClick={() => reset()}
          className='font-medium text-xs underline cursor-pointer lg:text-xl'
        >
          Clear All
        </span>
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='mortgage-amount'
          className='text-sm font-medium text-slate-500 lg:text-2xl'
        >
          Mortgage Amount
        </label>
        <div className='flex'>
          <input
            type='number'
            id='mortgage-amount'
            name='mortgage-amount'
            min={0}
            value={mortgageAmount}
            required={!!error.mortgageAmount}
            onChange={handleChangeMortgageAmount}
            className={`peer w-full h-12 pl-4 border border-l-transparent border-gray-600 outline-yellow-200 required:border-red-500 required:border-2 order-1 font-bold
            `}
          />
          <span className=' peer-focus:bg-yellow-200 peer-focus:border-yellow-200 peer-focus:text-gray-600  peer-required:bg-red-500 peer-required:border-red-500 peer-required:text-white h-12 px-4 py-2 flex justify-center items-center bg-slate-200 my-auto  border border-r-transparent  border-gray-600  text-gray-600 text-sm font-bold '>
            £
          </span>
        </div>
        {error.mortgageAmount && (
          <span className='text-red-500 text-xs'>{error.mortgageAmount}</span>
        )}
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='mortgage-term'
            className='text-sm font-medium text-slate-500 lg:text-2xl'
          >
            Mortgage Term
          </label>
          <div className='flex'>
            <input
              type='number'
              id='mortgage-term'
              name='mortgage-term'
              min={0}
              value={mortgageTerm}
              required={!!error.mortgageTerm}
              onChange={handleChangeMortgageTerm}
              className={`peer w-full h-12 pl-14 border border-r-transparent border-gray-600 text-right outline-yellow-200 required:border-red-500 required:border-2 font-bold
            `}
            />
            <span className='peer-focus:bg-yellow-200 peer-focus:border-yellow-200 peer-focus:text-gray-600  peer-required:bg-red-500 peer-required:border-red-500 peer-required:text-white h-12 px-4 py-2 flex justify-center items-center bg-slate-200 my-auto border  border-gray-600 border-l-slate-200 text-gray-600 text-sm font-bold '>
              years
            </span>
          </div>
          {error.mortgageTerm && (
            <span className='text-red-500 text-xs'>{error.mortgageTerm}</span>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label
            htmlFor='interest-rate'
            className='text-sm font-medium text-slate-500 lg:text-2xl'
          >
            Interest Rate
          </label>
          <div className='flex'>
            <input
              type='number'
              id='interest-rate'
              name='interest-rate'
              min={0}
              step='0.01'
              value={interestRate}
              required={!!error.interestRate}
              onChange={handleChangeInterestRate}
              className={`peer w-full h-12 pl-14 border border-r-transparent border-gray-600 text-right outline-yellow-200 required:border-red-500 required:border-2 font-bold
            `}
            />
            <span className='peer-focus:bg-yellow-200 peer-focus:border-yellow-200 peer-focus:text-gray-600  peer-required:bg-red-500 peer-required:border-red-500 peer-required:text-white h-12 px-4 py-2 flex justify-center items-center bg-slate-200 my-auto border border-gray-600 border-l-slate-200 text-gray-600 text-sm font-bold'>
              %
            </span>
          </div>
          {error.interestRate && (
            <span className='text-red-500 text-xs'>{error.interestRate}</span>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium text-slate-500 lg:text-2xl'>
          Mortgage Type
        </label>
        <div
          className={`w-full h-12 pl-4 border-gray-600 flex items-center gap-4 ${
            mortgageType === 'repayment'
              ? 'bg-yellow-200/30 border-yellow-200 border-2'
              : 'border'
          }`}
        >
          <input
            type='radio'
            id='repayment'
            name='mortgage-type'
            value='repayment'
            checked={mortgageType === 'repayment'}
            onChange={handleChangeMortgageType}
          />
          <label
            htmlFor='repayment'
            className='font-bold text-slate-700 lg:text-xl'
          >
            Repayment
          </label>
        </div>
        <div
          className={`w-full h-12 pl-4  border-gray-600 flex items-center gap-4 ${
            mortgageType === 'interest-only'
              ? 'bg-yellow-200/30 border-yellow-200 border-2'
              : 'border'
          }`}
        >
          <input
            type='radio'
            id='interest-only'
            name='mortgage-type'
            value='interest-only'
            checked={mortgageType === 'interest-only'}
            onChange={handleChangeMortgageType}
          />
          <label
            htmlFor='interest-only'
            className='font-bold text-slate-700 lg:text-xl'
          >
            Interest Only
          </label>
        </div>
        {error.mortgageType && <span>{error.mortgageType}</span>}
      </div>

      <button
        type='submit'
        className='h-12 w-fit px-8 bg-yellow-200 flex items-center justify-center gap-2 rounded-3xl mx-auto lg:py-8 lg:px-12 lg:rounded-[36px] lg:ml-auto'
      >
        <img src={iconCalculator} alt='icon calculator' />
        <span className='font-bold lg:text-2xl'>Calculate Repayments</span>
      </button>
    </form>
  )
}

export default MortgageCalculator
