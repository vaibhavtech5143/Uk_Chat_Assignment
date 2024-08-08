document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display posts from the feed endpoint
  fetchAndUpdatePosts();

  // Event listener for login
  document.getElementById('loginButton').addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      fetch('/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              alert('Login successful!');
              fetchAndUpdatePosts();
          } else {
              alert('Login failed: ' + (data.message || 'Unknown error'));
          }
      })
      .catch(error => console.error('Error logging in:', error));
  });

  // Event listener for registration
  document.getElementById('registerButton').addEventListener('click', () => {
      const username = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;

      fetch('/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
      })
      .then(response => response.json())
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              alert('Registration successful!');
              fetchAndUpdatePosts();
          } else {
              alert('Registration failed: ' + (data.message || 'Unknown error'));
          }
      })
      .catch(error => console.error('Error registering:', error));
  });

  // Event listener for posting comments
  document.getElementById('postComment').addEventListener('click', () => {
      const postId = document.getElementById('postId').value;
      const commentText = document.getElementById('commentText').value;

      if (!postId || !commentText) {
          alert('Please enter both Post ID and comment text.');
          return;
      }

      fetch('/api/posts/comment', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postId, text: commentText })
      })
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              alert('Error posting comment: ' + data.error);
          } else {
              alert('Comment posted successfully!');
              document.getElementById('commentText').value = '';
              fetchAndUpdatePosts();
          }
      })
      .catch(error => console.error('Error posting comment:', error));
  });

  // Function to fetch and update posts
  function fetchAndUpdatePosts() {
      fetch('/api/posts/feed', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(response => response.json())
      .then(data => {
          const contentDiv = document.getElementById('content');
          contentDiv.innerHTML = data.map(post => `
              <div id="post-${post._id}">
                  <strong>${post.author.username}</strong>: ${post.content}
                  <div>
                      ${post.comments.map(comment => `
                          <div><strong>${comment.commenter.username}</strong>: ${comment.text}</div>
                      `).join('')}
                  </div>
              </div>
          `).join('');
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  // Function to show a specific tab
  function showTab(tabId) {
      document.querySelectorAll('.form-content').forEach(tab => {
          tab.style.display = tab.id === tabId ? 'block' : 'none';
      });
  }
  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    checkLoginStatus();
    document.getElementById('content').innerHTML = '';
});
  // Expose the function to the global scope
  window.showTab = showTab;
});
