document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#tabs li');
    const contents = document.querySelectorAll('.tab-content');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove 'active' class from all tab contents
        contents.forEach(content => content.classList.remove('active'));
  
        // Get the target content ID
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
  
        // Add 'active' class to the target content
        targetContent.classList.add('active');
      });
    });
  });
  