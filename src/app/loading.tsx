import { ClipLoader } from "react-spinners";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color="#000" loading={true} size={50} />
    </div>
  );
}
