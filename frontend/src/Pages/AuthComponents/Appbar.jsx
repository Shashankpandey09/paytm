const Appbar = () => {
    return (
      <div className="pt-4 px-4  mx-auto">
        <div className="shadow h-14 flex justify-between items-center mt-9 px-2 bg-white rounded-md">
          <div className="ml-4 text-lg font-semibold">
            PayTM App
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-lg font-medium">
              Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl font-semibold">
              U
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Appbar;
