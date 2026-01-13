import { axiosAPI } from "./axiosInstance";
import { toast } from "react-toastify";

const notifyInfo = (message) => toast.info(message);

const API_BASE_URL = "/api/v1/data_sources";

export const fetchAllDataApi = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/all`);
  if (response.status === 200 && Array.isArray(response.data.files)) {
    return response.data;
  }
};

export const getCleaningFileApi = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/cleaning-files`);
  return response.data.cleaning_files;
};

export const setCleaningFlagApi = async (file) => {
  try {
    const response = await axiosAPI.put(`${API_BASE_URL}/set-cleaning-flag`, {
      filename: file.filename,
    });

    return response
  } catch (error) {
    notifyInfo("Error setting cleaning flag. Please try again.");
  }
};

export const fetchDuplicatesApi = async (currentFile) => {
  try {
    const response = await axiosAPI.post(
      `${API_BASE_URL}/get-duplicates/${currentFile.filename}`
    );

    if (response.status === 200) {
      return response.data.duplicates || [];
    } else {
      notifyInfo("Error fetching duplicates.");
    }
  } catch (error) {
    notifyInfo("Error fetching duplicates.");
  }
};

export const fetchNullRecordsApi = async (currentFile) => {
  try {
    const response = await axiosAPI.post(
      `${API_BASE_URL}/fetch-null-values/${currentFile.filename}`
    );

    if (response.status === 200) {
      const nullRows = response.data.rows_with_nulls;
      return nullRows;
    } else {
      notifyInfo("Error fetching null records.");
    }
  } catch (error) {
    notifyInfo("Error fetching null records.");
  }
};

export const removeDuplicatesApi = async (currentFile) => {
  try {
    const response = await axiosAPI.post(
      `${API_BASE_URL}/remove-duplicates/${currentFile.filename}`
    );

    if (response.status === 200) {
      return response.status;
    } else {
      notifyInfo(
        response?.data?.message ||
        "Failed to remove duplicates. Please try again."
      );
    }
  } catch (error) {
    notifyInfo(
      "An error occurred while removing duplicates. Please try again."
    );
  }
};

export const handleSaveApi = async (currentFile, editedRecords) => {
  try {
    const response = await axiosAPI.post(
      `${API_BASE_URL}/update-null-values/${currentFile.filename}`,
      editedRecords
    );

    if (response.status === 200) {
      return response.status;
    } else {
      notifyInfo("Error saving the records. Please try again.");
    }
  } catch (error) {
    notifyInfo("Error saving the records.");
  }
};

export const handleDeleteRowApi = async (currentFile, rowId) => {
  try {
    const response = await axiosAPI.post(
      `${API_BASE_URL}/delete-null-rows/${currentFile.filename}/${rowId}`,
      rowId
    );

    if (response.status === 200) {
      return response.status;
    } else {
      notifyInfo("Error delete records else.");
    }
  } catch (error) {
    notifyInfo("Error saving the records.");
  }
};