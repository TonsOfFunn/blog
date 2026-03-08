# Cyber Blog

A minimal, dark cyber-themed blog that runs on **GitHub Pages** using only HTML, CSS, and JavaScript.

## Preview locally

Open `index.html` in a browser, or run a simple server (e.g. `npx serve .`) so that `posts.json` loads correctly.

## Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Push this folder to the repo (e.g. `main` branch).
3. In the repo: **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` (or `master`) → folder: **/ (root)** → Save.
4. Your blog will be at `https://<username>.github.io/<repo>/`.

## Adding a new post

Edit **`posts.json`** and add a new object to the array:

```json
{
  "id": "my-new-post",
  "title": "My new post",
  "date": "2025-03-08",
  "tag": "tech",
  "excerpt": "Short summary shown on the home page.",
  "body": "<p>First paragraph.</p><h2>Section</h2><p>More text. Use <code>&lt;code&gt;</code> for code.</p>"
}
```

- **id** – Unique slug used in the URL (e.g. `post.html?id=my-new-post`). Use lowercase, hyphens, no spaces.
- **title** – Post title.
- **date** – ISO date: `YYYY-MM-DD`.
- **tag** – Optional label (e.g. `tech`, `meta`).
- **excerpt** – Short description for the listing page.
- **body** – Full content in **HTML** (`<p>`, `<h2>`, `<ul>`, `<li>`, `<code>`, etc.).

Save the file, commit, and push. New posts appear on the home page and are linked from there.

## Files

| File        | Purpose                          |
|------------|-----------------------------------|
| `index.html` | Home page and post list          |
| `post.html`  | Single post page (reads `?id=`)  |
| `styles.css` | Dark cyber theme                 |
| `app.js`     | Loads `posts.json`, renders list/post |
| `posts.json` | **Edit this to add or edit posts** |

No build step, no CMS—just edit JSON and push.
