import { useState } from 'react'
import MortgageCalculator from './components/MortgageCalculator'
import Results from './components/Results'

function App() {
  const [result, setResult] = useState({
    repayments: 0,
    totalRepayments: 0,
    totalInterest: 0,
    interestPerMonth: 0,
    mortgageType: ''
  })

  const [show, setShow] = useState(false)

  const handleResult = (result: {
    repayments: number
    totalRepayments: number
    totalInterest: number
    interestPerMonth: number
    mortgageType: string
  }) => {
    setResult(result)
  }

  const handleShow = (value: boolean) => {
    setShow(value)
  }

  return (
    <main className='bg-slate-200 min-h-screen grid justify-center content-center font-plus-jakarta-sans'>
      <div className=' w-[375px] flex flex-col justify-center items-center bg-white lg:flex-row lg:w-[1200px]'>
        <MortgageCalculator
          handleResult={handleResult}
          handleShow={handleShow}
        />
        <Results result={result} show={show} />
      </div>
    </main>
  )
}

export default App
