# PeaceFulSMP Website

A static, dependency-free site for the PeaceFulSMP Minecraft server. Host it free on GitHub Pages.

## Files

```
index.html      # the page
styles.css      # all styling
script.js       # copy-IP + live server status + footer year
assets/         # icon, favicon, banner
.nojekyll       # tells GitHub Pages to serve files as-is (no Jekyll)
```

## Preview locally

Just open `index.html` in a browser, or run a tiny server:

```bash
cd peacefulsmp-site
python3 -m http.server 8899
# then visit http://localhost:8899
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `peacefulsmp-site`) and push these files to the `main` branch:

   ```bash
   cd peacefulsmp-site
   git init
   git add .
   git commit -m "Add PeaceFulSMP website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
5. Your site goes live at `https://<your-username>.github.io/<repo>/` in a minute or two.

> Want it at the repo root domain instead? Name the repo `<your-username>.github.io`.
>
> Want a custom domain (e.g. `peacefulsmp.win`)? Add a file named `CNAME` containing your
> domain, and point a CNAME DNS record at `<your-username>.github.io`.

## Things you may want to edit

- **Vote link** — search for `topeaglerservers.com/vote/cb8254db` in `index.html` (appears twice).
- **Eaglercraft web client** — the "Play in Browser" button currently points to
  `https://play.peacefulsmp.win`. Change it to your browser client URL if different.
- **Server IP** — `play.peacefulsmp.win` in `index.html` and at the top of `script.js`.
- **Colours / branding** — the palette lives in `:root` at the top of `styles.css`.
- **Live status** — `script.js` queries `https://api.mcsrvstat.us/3/play.peacefulsmp.win`
  (Java status). Swap `STATUS_API` if you prefer another provider.
