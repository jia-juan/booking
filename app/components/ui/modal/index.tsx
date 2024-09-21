import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // 添加一個小延遲
      setTimeout(() => {
        const target = event.target as HTMLElement;
        // 檢查點擊事件是否來自多選框內的 "x" 按鈕
        if (target.closest('.exclude-modal-close')) {
          return;
        }
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      }, 0);
    };

    if (isOpen) {
      // 將 mousedown 改為 mouseup
      document.addEventListener('mouseup', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mouseup', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
