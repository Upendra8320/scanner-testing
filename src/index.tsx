import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import theme from "./theme";
let deferredPrompt: any;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    <Toaster position="bottom-center" reverseOrder={false} gutter={8} />
  </ThemeProvider>
);

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Optionally, show your custom install button here
  showInstallButton();
});

function showInstallButton() {
  const installButton = document.createElement("button");
  installButton.textContent = "Install App";
  installButton.className = "install-pwa-btn";
  document.body.appendChild(installButton);

  installButton.addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
        } else {
        }
        deferredPrompt = null;
      });
      // Hide the install button after prompt
      installButton.style.display = "none";
    }
  });
}

window.addEventListener("appinstalled", () => {
  // Hide or remove the installation UI
  // Optionally, hide your custom install button here
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
