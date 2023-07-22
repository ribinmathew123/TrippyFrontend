
import {
  Sidenav,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Sidenav, Ripple });

const sidenav = document.getElementById("full-screen-example");
const sidenavInstance = Sidenav.getInstance(sidenav);

let innerWidth = null;

const setMode = (e) => {
  if (window.innerWidth === innerWidth) {
    return;
  }

  innerWidth = window.innerWidth;

  if (window.innerWidth < sidenavInstance.getBreakpoint("sm")) {
    sidenavInstance.changeMode("over");
    sidenavInstance.hide();
  } else {
    sidenavInstance.changeMode("side");
    sidenavInstance.show();
  }
};

if (window.innerWidth < sidenavInstance.getBreakpoint("sm")) {
  setMode();
}

// Event listeners
window.addEventListener("resize", setMode);
