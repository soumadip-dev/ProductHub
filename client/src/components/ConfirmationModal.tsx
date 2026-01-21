import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export type ModalType = 'warning' | 'danger' | 'info' | 'success';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: ModalType;
  isLoading?: boolean;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const typeStyles: Record<ModalType, { icon: string; confirmButton: string; iconColor: string }> =
    {
      warning: {
        icon: '⚠️',
        confirmButton: 'btn-warning',
        iconColor: 'text-warning',
      },
      danger: {
        icon: '🗑️',
        confirmButton: 'btn-error',
        iconColor: 'text-error',
      },
      info: {
        icon: 'ℹ️',
        confirmButton: 'btn-info',
        iconColor: 'text-info',
      },
      success: {
        icon: '✓',
        confirmButton: 'btn-success',
        iconColor: 'text-success',
      },
    };

  const styles = typeStyles[type];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} aria-hidden="true"></div>

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-base-100 rounded-xl w-full max-w-md shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <span className={`text-xl ${styles.iconColor}`} aria-hidden="true">
                {styles.icon}
              </span>
              <h3 id="modal-title" className="font-semibold">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              disabled={isLoading}
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <div id="modal-description" className="text-base-content/80">
              {typeof message === 'string' ? <p>{message}</p> : message}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t border-base-300">
            <button onClick={onClose} className="btn btn-ghost" disabled={isLoading}>
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`btn ${styles.confirmButton}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationModal;
