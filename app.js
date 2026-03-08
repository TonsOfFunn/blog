/**
 * Cyber Blog - Loads posts from posts.json and renders the list or single post.
 * To add a new post: edit posts.json and add an object with id, title, date, tag, excerpt, body.
 */

(function () {
  const POSTS_URL = 'posts.json';

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function renderPostList(posts) {
    const listEl = document.getElementById('postsList');
    const loadingEl = document.getElementById('postsLoading');
    if (!listEl) return;

    if (loadingEl) loadingEl.remove();

    if (!posts || posts.length === 0) {
      listEl.innerHTML = '<p class="posts-loading">No posts yet. Add entries to posts.json.</p>';
      return;
    }

    listEl.innerHTML = posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(
        (post) => `
        <a href="post.html?id=${encodeURIComponent(post.id)}" class="post-card">
          <div class="post-meta">
            <span class="post-date">${formatDate(post.date)}</span>
            ${post.tag ? `<span class="post-tag">${escapeHtml(post.tag)}</span>` : ''}
          </div>
          <h2 class="post-title">${escapeHtml(post.title)}</h2>
          <p class="post-excerpt">${escapeHtml(post.excerpt || '')}</p>
        </a>
      `
      )
      .join('');
  }

  function renderSinglePost(post) {
    if (!post) {
      document.body.innerHTML = '<main class="main"><p>Post not found. <a href="index.html">Back to blog</a>.</p></main>';
      return;
    }

    const main = document.querySelector('main.main');
    if (!main) return;

    main.innerHTML = `
      <section class="post-header">
        <a href="index.html" class="post-back">← All posts</a>
        <div class="post-meta">
          <span class="post-date">${formatDate(post.date)}</span>
          ${post.tag ? `<span class="post-tag">${escapeHtml(post.tag)}</span>` : ''}
        </div>
        <h1 class="post-title">${escapeHtml(post.title)}</h1>
      </section>
      <article class="post-content">${post.body}</article>
    `;

    document.title = post.title + ' — Cyber Blog';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function init() {
    const postId = getQueryParam('id');
    const isPostPage = window.location.pathname.includes('post.html') || postId;

    fetch(POSTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load posts');
        return res.json();
      })
      .then((posts) => {
        if (isPostPage && postId) {
          const post = Array.isArray(posts) ? posts.find((p) => p.id === postId) : null;
          renderSinglePost(post);
        } else {
          renderPostList(posts);
        }
      })
      .catch(() => {
        const listEl = document.getElementById('postsList');
        const loadingEl = document.getElementById('postsLoading');
        if (loadingEl) loadingEl.remove();
        if (listEl) {
          listEl.innerHTML = '<p class="posts-loading">Could not load posts. Check that posts.json exists.</p>';
        }
      });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
