import { axiosAPI } from "./axiosInstance";
import { toast } from "react-toastify";
const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);
const notifyInfo = (message) => toast.info(message);

const API_BASE_URL = "http://localhost:8000/api/v1/data_sources";

const setFileName = (name) => {};

const setEditedData = (data) => {};

const setEditModalOpen = (isOpen) => {};

const setLoading = (isLoading) => {};

export const fetchAllDataAPI = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/all`);
  if (response.status === 200) {
    return response.data.files;
  }
};

export const handleApiCallAPI = async (method, endpoint, data = null) => {
  setLoading(true);
  try {
    const response = await axiosAPI({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
    });
    return response;
  } catch (error) {
    notifyError(
      error?.response?.data?.message || "An unexpected error occurred."
    );
    throw error;
  } finally {
    setLoading(false);
  }
};

export const uploadFileTo = async (file, parsedData = null) => {
  const formData = new FormData();
  formData.append("file", file);

  if (parsedData) {
    formData.append("data", JSON.stringify(sanitizeHeaders(parsedData)));
  }

  try {
    const response = await axiosAPI.post(`${API_BASE_URL}/upload`, formData);
    if (response.status === 200) {
      notifySuccess(`${file.name} uploaded successfully.`);
      await fetchAllDataAPI();
      setActiveSection("table");
    }
  } catch (error) {
    notifyError("Failed to upload the file.");
  }
};

export const handleDeleteAPI = async (fileName) => {
  try {
    const response = await axiosAPI.delete(
      `${API_BASE_URL}/delete-file/${fileName}`
    );
    return response;
  } catch (error) {
    notifyError(`Failed to delete file ${fileName}.`);
    throw error;
  }
};

export const handleViewAPI = async (fileName) => {
  try {
    const response = await axiosAPI.get(`${API_BASE_URL}/get-file/${fileName}`);
    return response;
  } catch (error) {
    notifyError(`Failed to fetch data for ${fileName}.`);
    throw error;
  }
};

export const openEditModalAPI = async (fileName) => {
  try {
    const response = await axiosAPI.get(`${API_BASE_URL}/get-file/${fileName}`);
    if (response?.status === 200) {
      const fileData = response.data;
      setFileName(fileData.filename);
      setEditedData(fileData.content || []);
      setEditModalOpen(true);
      notifySuccess(`File ${fileData.filename} data retrieved successfully!`);
    }
  } catch (error) {
    notifyError(`Failed to fetch data for ${fileName}.`);
  }
};

export const handleSaveEditsAPI = async (fileName, editedData) => {
  if (!fileName || !editedData) {
    notifyError("Filename or edited data is missing!");
    return;
  }

  const formData = new FormData();
  try {
    const isExcelFile = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
    if (isExcelFile) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(editedData);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const excelBlob = new Blob(
        [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

      formData.append("file", excelBlob, fileName);
    } else {
      const csvBlob = new Blob([convertToCSV(editedData)], {
        type: "text/csv",
      });
      formData.append("file", csvBlob, fileName);
    }

    const response = await axiosAPI.post(`${API_BASE_URL}/upload`, formData);
    if (response?.status === 200) {
      notifySuccess("File saved successfully!");
      setEditModalOpen(false);
    }
  } catch (error) {
    notifyError("Failed to save the edited file.");
  }
};
