const menuItems = document.querySelectorAll('#menuItems li');
const mainContent = document.getElementById('mainContent');
const sidebar = document.getElementById('sidebar');

sidebar.addEventListener('mouseenter', () => {
  mainContent.style.marginLeft = '16rem';
});

sidebar.addEventListener('mouseleave', () => {
  mainContent.style.marginLeft = '4rem';
});

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove background highlight from all items
    menuItems.forEach(item => item.classList.remove('bg-blue-700'));
    // Add background highlight to the clicked item
    item.classList.add('bg-blue-700');
    // Update main content
    mainContent.innerHTML = `
      <h1 class="text-2xl font-bold">${item.innerText}</h1>
      <p class="mt-4 text-gray-600">Content for ${item.innerText}</p>
    `;
  });
});
