
console.log("injkectssafsf");
function extractImageUrls() {
  const imageUrls = [];

  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(function(element) {
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.getPropertyValue('background-image');
    
    if (backgroundImage && backgroundImage !== 'none') {
      // Check if the background image is not a gradient or rgba value
      if (!backgroundImage.includes('linear-gradient') && !backgroundImage.includes('rgba')) {
        const imageUrl = backgroundImage.replace(/url\(["']?([^"']*)["']?\)/, '$1');
        imageUrls.push(imageUrl);
      }
    }

    if (element.tagName === 'IMG') {
      const imageUrl = element.src;
      imageUrls.push(imageUrl);
    }
  });

  function removeDuplicates(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }

  let result = removeDuplicates(imageUrls);
  return result;
}



chrome.storage.local.set({ imageUrls: extractImageUrls() }, () => {
  console.log("injkectssafsf");
  
});
