import { useState, useCallback } from 'react';
import type { ModalType } from '../components/ConfirmationModal';

export interface ConfirmationModalConfig {
  title?: string;
  message?: string;
  onConfirm: () => void;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
}

export interface ModalState extends Omit<ConfirmationModalConfig, 'onConfirm'> {
  isOpen: boolean;
  onConfirm: (() => void) | null;
}

export function useConfirmationModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  });

  const showConfirmation = useCallback((config: ConfirmationModalConfig) => {
    setModalState({
      isOpen: true,
      title: config.title || 'Confirm Action',
      message: config.message || 'Are you sure you want to proceed?',
      onConfirm: config.onConfirm,
      type: config.type || 'warning',
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
    });
  }, []);

  const hideConfirmation = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    modalState,
    showConfirmation,
    hideConfirmation,
  };
}
