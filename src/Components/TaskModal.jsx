import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAppContext } from "@/context/AppContext";
import {
  Loader2,
  Upload,
  FileText,
  Image as ImageIcon,
  X,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

export default function TaskModal({ taskId }) {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const { modalView, setModalView } = useAppContext();

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the task?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2A6AED",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      if (!comments.trim()) {
        toast.error("Please add a description before submitting");
        return;
      }

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
          status: status,
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
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      type === "file" &&
      droppedFile.type.match(
        "application/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)"
      )
    ) {
      setFile(droppedFile);
    } else if (type === "image" && droppedFile.type.match("image.*")) {
      setImage(droppedFile);
    } else {
      toast.error(`Invalid file type for ${type} upload`);
    }
  };

  if (loading) {
    return (
      <Dialog open={true} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-lg rounded-lg bg-white p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-xl font-semibold text-gray-900">
                  Submitting your task...
                </p>
                <p className="text-sm text-gray-500">
                  Please wait while we process your submission
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-start justify-center pt-16 px-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="relative p-6">
                <button
                  onClick={() => setModalView(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Submit Your Task
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500">
                  Complete your task submission by providing the required
                  information below
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Document
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, "file")}
                      className={`mt-2 flex justify-center rounded-lg border-2 border-dashed p-6 ${
                        dragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => setFile(e.target.files[0])}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PDF or DOC up to 10MB
                        </p>
                        {file && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <FileText className="h-4 w-4" />
                            {file.name}
                            <button
                              onClick={() => setFile(null)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Label */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>

                  {/* Input Field */}
                  <input
                    type="text"
                    onChange={(e) => setStatus(e.target.value)}
                    maxLength={20}
                    placeholder="Eg. completed or pending ..."
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Task Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Provide details about your task completion..."
                      className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      rows="4"
                    />
                    {!comments.trim() && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Description is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Image
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, "image")}
                      className={`mt-2 flex justify-center rounded-lg border-2 border-dashed p-6 ${
                        dragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                            <span>Upload an image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 5MB
                        </p>
                        {image && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <ImageIcon className="h-4 w-4" />
                            {image.name}
                            <button
                              onClick={() => setImage(null)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                <button
                  onClick={() => setModalView(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!comments.trim()}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Task
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
