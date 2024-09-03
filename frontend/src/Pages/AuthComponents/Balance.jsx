const Balance = ({ value }) => {
    return (
      <div className="flex items-center  pt-4 mt-6">
        <div className="font-bold text-lg">
          Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
          Rs {value}
        </div>
      </div>
    );
  }
  
  export default Balance;
  