import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    useGetRefundSettingsQuery,
    useUpdateRefundSettingsMutation,
} from "../../api/apiSlice";
import CardWrapper from "../../components/CardWrapper";

const RefundSettings = () => {
  const { data: settings, isLoading } = useGetRefundSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateRefundSettingsMutation();

  const [formData, setFormData] = useState({
    isActive: false,
    amount: "",
  });

  useEffect(() => {
    if (settings?.data) {
      setFormData({
        isActive: settings.data.isActive,
        amount: settings.data.amount || "",
      });
    }
  }, [settings]);

  const handleToggle = () => {
    setFormData({
      ...formData,
      isActive: !formData.isActive,
    });
  };

  const handleAmountChange = (e) => {
    setFormData({
      ...formData,
      amount: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSettings({
        isActive: formData.isActive,
        amount: formData.amount || null,
      }).unwrap();

      toast.success("Refund settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update settings");
    }
  };

  if (isLoading) {
    return (
      <CardWrapper>
        <div className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      <div className="border-b border-gray-200 dark:border-dark-border-color px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Refund Settings
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure campus refund confirmation system
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl">
          {/* Enable/Disable Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-box rounded-lg">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  Refund Process Status
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formData.isActive
                    ? "Students can submit refund confirmations"
                    : "Refund process is currently disabled"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.isActive ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Refund Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Refund Amount (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                ৳
              </span>
              <input
                type="text"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="Enter refund amount (e.g., 5000)"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-white"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              This amount will be displayed to students. Leave empty if not applicable.
            </p>
          </div>

          {/* Status Information */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
              Current Status
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>
                • Process Status:{" "}
                <span className="font-semibold">
                  {formData.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </li>
              <li>
                • Refund Amount:{" "}
                <span className="font-semibold">
                  {formData.amount ? `৳ ${formData.amount}` : "Not Set"}
                </span>
              </li>
            </ul>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </CardWrapper>
  );
};

export default RefundSettings;
