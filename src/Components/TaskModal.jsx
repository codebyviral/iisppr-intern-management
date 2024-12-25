import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAppContext } from "@/context/AppContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function TaskModal({ taskId }) {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const { modalView, setModalView } = useAppContext();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("image", image);
      formData.append("comments", comments);
      formData.append("taskId", taskId);

      const response = await axios.post(
        "https://iisppr-backend.vercel.app/submitTask",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const taskComplete = {
        status: "completed",
      };
      if (response.status === 201) {
        toast.success("Task submitted successfully!");
        axios
          .put(
            `https://iisppr-backend.vercel.app/task/update-task/${taskId}`,
            taskComplete,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log("Task status updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error updating task status:", error);
          });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      if (error.response) {
        toast.error(
          `Server Error: ${error.response.data.message || "Please try again"}`
        );
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
      setModalView(false);
    }
  };

  if (loading) {
    return (
      <Dialog open={true} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-lg rounded-lg bg-white p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-lg font-medium text-gray-900">
                  Submitting your task...
                </p>
                <p className="text-sm text-gray-500">
                  Please wait while we process your submission
                </p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="p-6">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Task Completion Details
              </DialogTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload File
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Comments/Description
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add a description or comments about the task..."
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setModalView(false)}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
