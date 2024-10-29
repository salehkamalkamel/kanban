export default function LoadingSpinner({ className }) {
  return (
    <div
      className={`w-8 h-8 border-4 border-t-4 border-gray2 border-t-primary rounded-full animate-spin ${className} mx-auto`}
    ></div>
  );
}
