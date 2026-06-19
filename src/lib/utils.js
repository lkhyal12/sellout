export function getErrorMsg(err) {
  const msg =
    err?.response?.data?.message ||
    err?.message ||
    err ||
    "Something went wrong";
  return msg;
}
