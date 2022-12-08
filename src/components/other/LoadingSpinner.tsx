export function LoadingSpinner() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="spinner-border mx-2" role="status"></div>
      <strong>Loading...</strong>
    </div>
  );
}
