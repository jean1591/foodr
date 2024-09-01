export const Welcome = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold">
        🎉 Your account has been created 🎉
      </p>
      <p className="text-2xl font-semibold">
        To get your started, we've credited your account with 12 credits
      </p>

      <p className="mt-8">
        Everytime you generate a weekly mean plan or a recipe, credits are
        deducted from your credits balance.
      </p>

      <div className="mt-4">
        <p>Weekly meal plan costs 10 credits to generate</p>
        <p>Recipe cost 1 credits to generate</p>
      </div>
    </div>
  )
}
