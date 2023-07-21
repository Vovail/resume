import { CV_MAIN_BLOCK_CLASS_NAME, PAGE_BREAK_MARGIN, PAGE_RATIO, PDF_BLOCK_CLASS_NAME } from "../constants";

export const getTotalHeightWithMargins = (element) => {
  const styles = window.getComputedStyle(element);
  const marginTop = parseFloat(styles.marginTop);
  const marginBottom = parseFloat(styles.marginBottom);
  const height = element.offsetHeight;
  const totalHeight = height + marginTop + marginBottom;

  return { totalHeight, marginTop, marginBottom };
}

export const getPageSize = (elementSelector = `.${CV_MAIN_BLOCK_CLASS_NAME}`) => {
  const element = document.querySelector(elementSelector);
  const styles = window.getComputedStyle(element);
  return parseFloat(styles.width) * PAGE_RATIO;
}

export const addPageBreaksForPdf = (pageSize = getPageSize(), pdfBlockClassName = PDF_BLOCK_CLASS_NAME) => {
  const pdfBlocks = document.getElementsByClassName(pdfBlockClassName);
  let currentPageSize = 30; // space for common wrappers top paddings
  const updatedElements = [];
  [...pdfBlocks].forEach((element, index, arr) => {
    const { totalHeight } = getTotalHeightWithMargins(element);
    if ((currentPageSize + totalHeight) < (pageSize - PAGE_BREAK_MARGIN)) {
      currentPageSize += totalHeight;
    } else {
      const previousElement = arr[index - 1];
      const { marginBottom } = getTotalHeightWithMargins(previousElement);
      const additionalMargin = pageSize - (currentPageSize - marginBottom) + PAGE_BREAK_MARGIN;
      previousElement.style.marginBottom = `${additionalMargin}px`;
      updatedElements.push({ marginBottom, element: previousElement });
      currentPageSize = PAGE_BREAK_MARGIN + totalHeight;
    }
  });

  return updatedElements;
}

export const restorePageBreaks = (updatedArray) => {
  updatedArray.forEach(({ element, marginBottom }) => {
    element.style.marginBottom = `${marginBottom}px`;
  })
}