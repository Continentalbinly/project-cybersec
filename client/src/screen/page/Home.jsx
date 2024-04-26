import React from "react";

function Home() {
  return (
    <section>
      <div className="flex justify-center">
        <h2 className="text-3xl font-semibold">
          Welcome to Cybersecurity Awareness
        </h2>
      </div>
      <br />
      <div>
        <h4 className="text-xl font-semibold">ຄອດສ໌ຮຽນທັ້ງໝົດ</h4>
      </div>
      <br />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
            <img
              className="rounded"
              src="https://cxotoday.com/wp-content/uploads/2023/05/Cybersecurity.jpeg"
              alt="Cybersecurity"
            />
            <div className="pt-3 text-[16px]">ພື້ນຖານຄວາມປອດໄພ</div>
            <div className="pt-1 text-[12px]">Tittle:</div>
            <div className="pt-1 text-[12px]">Lesson:</div>
            <div className="pt-1 text-[12px]">Task:</div>
            <div className="pt-1 text-[12px]">Total Point:</div>
          </div>
          <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
            <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
              <img
                className="rounded"
                src="https://cxotoday.com/wp-content/uploads/2023/05/Cybersecurity.jpeg"
                alt="Cybersecurity"
              />
              <div className="pt-3 text-[16px]">ພື້ນຖານຄວາມປອດໄພ</div>
              <div className="pt-1 text-[12px]">Tittle:</div>
              <div className="pt-1 text-[12px]">Lesson:</div>
              <div className="pt-1 text-[12px]">Task:</div>
              <div className="pt-1 text-[12px]">Total Point:</div>
            </div>
          </div>
          <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
            <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
              <img
                className="rounded"
                src="https://cxotoday.com/wp-content/uploads/2023/05/Cybersecurity.jpeg"
                alt="Cybersecurity"
              />
              <div className="pt-3 text-[16px]">ພື້ນຖານຄວາມປອດໄພ</div>
              <div className="pt-1 text-[12px]">Tittle:</div>
              <div className="pt-1 text-[12px]">Lesson:</div>
              <div className="pt-1 text-[12px]">Task:</div>
              <div className="pt-1 text-[12px]">Total Point:</div>
            </div>
          </div>
          <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
            <div className="rounded w-full h-auto p-2 bg-gray-100 cursor-pointer hover:bg-gray-200">
              <img
                className="rounded"
                src="https://cxotoday.com/wp-content/uploads/2023/05/Cybersecurity.jpeg"
                alt="Cybersecurity"
              />
              <div className="pt-3 text-[16px]">ພື້ນຖານຄວາມປອດໄພ</div>
              <div className="pt-1 text-[12px]">Tittle:</div>
              <div className="pt-1 text-[12px]">Lesson:</div>
              <div className="pt-1 text-[12px]">Task:</div>
              <div className="pt-1 text-[12px]">Total Point:</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
