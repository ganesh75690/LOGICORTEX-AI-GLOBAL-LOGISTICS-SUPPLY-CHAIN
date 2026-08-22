// Export utilities for CSV and PDF functionality

export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    if (window.addToast) {
      window.addToast('warning', 'No data to export');
    }
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      // Handle nested objects and arrays
      if (typeof value === 'object' && value !== null) {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      // Escape strings with commas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  if (window.addToast) {
    window.addToast('success', `Successfully exported ${filename}.csv`);
  }
};

export const exportToJSON = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    if (window.addToast) {
      window.addToast('warning', 'No data to export');
    }
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  if (window.addToast) {
    window.addToast('success', `Successfully exported ${filename}.json`);
  }
};

export const printElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    if (window.addToast) {
      window.addToast('error', 'Element not found for printing');
    }
    return;
  }

  const printContent = element.innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;

  if (window.addToast) {
    window.addToast('success', 'Print dialog opened');
  }
};