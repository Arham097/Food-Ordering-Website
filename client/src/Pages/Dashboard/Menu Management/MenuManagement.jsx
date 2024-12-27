import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../Config/axios";

const MenuManagement = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // console.log(previewImage);
  const handleDelete = () => {
    setPreviewImage(null);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = null;
    }
    if (previewImage === null) {
      toast.error("No File Selected to Delete");
    }
  };
  const openModal = () => {
    setModalImage(previewImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        // Create a FormData object to send the file in a multipart/form-data request
        const formData = new FormData();
        formData.append("menu_image", file);

        // Send the request with the file attached
        const response = await axiosInstance.post("/menu/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });

        // Handle success response
        if (response.status === 200) {
          setPreviewImage(null);
          setFile(null);
          if (fileRef.current) {
            fileRef.current.value = null;
          }
          toast.success(response.data.data.message);
        }
      } catch (err) {
        // Handle error response
        toast.error("Error uploading the file");
        console.log(err);
      }
    } else {
      toast.error("Please Upload an Image First");
    }
  };
  return (
    <div className="w-full min-h-96 py-7 flex justify-center items-center ">
      <div className="flex max-sm:flex-col sm:flex-col items-center gap-y-4 w-full   ">
        <h1 className="font-bold max-sm:text-4xl sm:text-4xl text-center text-white ">
          Upload New Menu Image
        </h1>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          name="menu_image"
          onChange={handleImageChange}
          className="border rounded p-2  text-white font-semibold border-orange-500"
        />
        {previewImage && (
          <div className="border rounded-lg relative p-3 mt-4 border-orange-500">
            <p className="mb-3 font-semibold text-white ">Preview:</p>
            <img
              src={previewImage}
              alt="Menu Preview"
              className="max-w-xs max-h-96 object-cover cursor-zoom-in hover:cursor-zoom-in"
              onClick={openModal}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {isHovered && (
              <p
                className="text-white text-center font-semibold mt-2 absolute bg-black bg-opacity-60 p-1 rounded-lg top-1/2 mx-auto  left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-zoom-in transition-all duration-100 ease-linear italic text-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={openModal}
              >
                Click for Zoom
              </p>
            )}
          </div>
        )}
        <div className="flex gap-x-4 max-sm:w-1/2 sm:w-1/2 md:w-1/3 ">
          <button
            className="bg-orange-500 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md  py-3 text-[1.1rem] cursor-pointer"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="bg-red-600 w-full h-full font-bold text-white hover:scale-105 transition-all duration-300 rounded-md  py-3 text-[1.1rem] cursor-pointer "
            onClick={handleDelete}
          >
            Delete File
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-black p-2 rounded-md max-w-4xl max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Full-screen Menu Preview"
              className="max-w-full overflow-x-hidden object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black rounded-full p-2 text-4xl"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
