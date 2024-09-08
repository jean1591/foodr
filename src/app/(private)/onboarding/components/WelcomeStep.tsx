export const WelcomeStep = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">Let's see how this works !</p>

      <div className="mt-12 w-full text-center text-lg md:w-1/2">
        <p>
          Each meal you generate will cost{' '}
          <span className="font-bold">one</span> credit
        </p>

        <p className="mt-4">
          For instance, the breakdown for generating{' '}
          <span className="font-bold">lunches and dinners</span> from{' '}
          <span className="font-bold">Monday to Friday</span> can be calculated
          as such:
        </p>
      </div>

      <div className="mt-4 w-1/4 space-y-2">
        <div className="flex items-center justify-between">
          <p>(a) Meals per day</p>
          <p>2</p>
        </div>
        <div className="flex items-center justify-between border-b border-blue-950">
          <p>(b) Number of days</p>
          <p>5</p>
        </div>
        <div className="flex items-center justify-between font-bold">
          <p>Credits (a x b)</p>
          <p>10</p>
        </div>
      </div>
    </div>
  )
}
