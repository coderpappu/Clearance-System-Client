const ConfirmDialog = ({ 
  onConfirm, 
  onCancel, 
  title, 
  message,
  confirmText = "Delete",
  confirmColor = "bg-red-500 hover:bg-red-600"
}) => (
  <div className="p-4">
    <p className="mb-2 font-semibold">{title}</p>
    <p className="mb-4 text-sm text-gray-600">
      {message}
    </p>
    <div className="flex justify-end space-x-2">
      <button
        onClick={onCancel}
        className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className={`text-white py-1 px-3 rounded ${confirmColor}`}
      >
        {confirmText}
      </button>
    </div>
  </div>
);

export default ConfirmDialog;
