import illustrationEmpty from '../assets/illustration-empty.svg'

interface Props {
  result: {
    repayments: number
    totalRepayments: number
    totalInterest: number
    interestPerMonth: number
    mortgageType: string
  }
  show: boolean
}

function Results({ result, show }: Props) {
  return (
    <div className='px-4 py-12 bg-slate-800 lg:flex-1 lg:h-full lg:rounded-bl-[100px]'>
      {!show && (
        <div className='flex flex-col justify-center gap-2'>
          <img
            src={illustrationEmpty}
            alt='illustration-empty'
            className='text-center'
          />
          <h2 className='text-slate-100 font-bold text-center'>
            Results shown here
          </h2>
          <p className='text-slate-400 text-center text-sm'>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
      {show && (
        <div className='flex flex-col gap-8'>
          <h2 className='text-slate-100 font-bold'>Your results</h2>
          <p className='text-slate-400 text-sm text-justify'>
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className='rounded-md bg-yellow-200'>
            <div className='border border-transparent'></div>
            <div className='p-8 bg-slate-900 rounded-md'>
              <div className='flex flex-col gap-2'>
                <span className='text-slate-400 text-xs font-medium'>
                  Your monthly repayments
                </span>
                <span className='text-yellow-300 text-4xl font-bold'>
                  £
                  {result.mortgageType === 'repayment' &&
                    result.repayments.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                  {result.mortgageType === 'interest-only' &&
                    result.interestPerMonth.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                </span>
              </div>
              <hr className='mt-4' />
              <div className='mt-4 flex flex-col gap-2'>
                <span className='text-slate-400 text-xs font-medium'>
                  Total you'll repay over the term
                </span>
                <span className=' text-white text-xl font-bold'>
                  £
                  {result.mortgageType === 'repayment' &&
                    result.totalRepayments.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                  {result.mortgageType === 'interest-only' &&
                    result.totalInterest.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
