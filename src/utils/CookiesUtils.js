import Cookies from "js-cookie";

export function wipeCookies() {
  Cookies.remove("chosen-words");
  Cookies.remove("endTime");
  Cookies.remove("score");
  Cookies.remove("partial-choice");
}
