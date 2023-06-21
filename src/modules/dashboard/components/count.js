export default function displayLabelValue({ label, value }) {
  return (
    <div>
      <big>{value}</big>
      <p>{label}</p>
    </div>
  );
}
