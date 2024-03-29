import React from "react";

function RedeemShop() {
  return (
    <>
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <h5>ແລກຂອງລາງວັນ</h5>
      </div>
      <div className="bg-white mt-5 rounded-lg shadow p-4 md:p-6 h-screen dark:bg-gray-800">
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            <div className="rounded w-full h-auto p-2 bg-gray-800 cursor-pointer hover:bg-gray-700 relative">
              <img
                className="rounded"
                src="https://static.massimodutti.net/3/photos/2024/V/0/2/p/1410/760/800/1410760800_1_1_16.jpg?t=1705426141034&impolicy=massimodutti-itxmediumhigh&imwidth=500&imformat=chrome"
                alt="cloth"
              />
              <div className="bg-blue-950 w-[75px] p-1 flex justify-center absolute rounded-br-lg top-1 left-1">
                <span>400</span>
              </div>
              <div className="bg-blue-950 w-[75px] p-1 flex justify-center absolute rounded-none bottom-5 right-2">
                <span>ແລກ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RedeemShop;
