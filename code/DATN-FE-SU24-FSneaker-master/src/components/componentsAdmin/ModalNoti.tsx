import React from 'react';

const Modal = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-black text-xl">&times;</button>
        </div>
        <div className="py-2">
          {content}
        </div>
        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
