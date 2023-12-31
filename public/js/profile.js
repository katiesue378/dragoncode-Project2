const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#bucketlist-name').value.trim();
    const state = document.querySelector('#bucketlist-desc').value.trim();
  console.log(name, state)
    if (name && state) {
      const response = await fetch(`/api/bucketlists`, {
        method: 'POST',
        body: JSON.stringify({ name, state }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create bucketlist');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/bucketlists/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete bucketlist');
      }
    }
  };
  
  document
    .querySelector('.new-bucketlist-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.bucketlist-list')
    .addEventListener('click', delButtonHandler);
  