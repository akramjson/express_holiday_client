export const handleDownload = async (filePath: string, fileName: string) => {
  try {
    // Make a fetch request to get the file
    const response = await fetch(
      `http://localhost/files/${encodeURIComponent(filePath)}`,
      {
        method: "GET",
        headers: {
          // Add any necessary headers here
          // 'Authorization': 'Bearer your-token-here'
        },
      }
    );

    if (!response.ok) {
      throw new Error("Download failed");
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Append to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    alert("Failed to download file. Please try again.");
  }
};
