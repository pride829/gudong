import React from 'react';

function generateFileContent(content: string[]) {
    return new Blob([content.join("\n")], { type: 'text/plain;charset=utf-8' });
}

function FileDownloadButton({ fileContent, fileName }) {
    const handleDownload = () => {
        const blob = generateFileContent(fileContent);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleDownload}>
            下載紀錄
        </button>
    );
}

export default FileDownloadButton;