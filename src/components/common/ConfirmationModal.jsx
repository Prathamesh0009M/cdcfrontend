import React from 'react';
import IconBtn from './IconBtn';

const ConfirmationModal = ({ modalData }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      style={{
        backdropFilter: 'blur(8px)', // Additional fallback for older browsers
      }}
    >
      <div className="bg-richblack-800 rounded-lg p-6 max-w-md w-full shadow-lg">
        <div className="text-white mt-5">
          <p className="mb-4">{modalData.text1}</p>
          <p className="mb-6">{modalData.text2}</p>
          <div className="flex justify-between">
            <IconBtn
              onclick={modalData?.btn1Handler}
              text={modalData?.btn1Text}
            />
            <button
              onClick={modalData?.btn2Handler}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md"
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
