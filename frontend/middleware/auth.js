export default function({ redirect }) {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return redirect("/auth");
  }
}
