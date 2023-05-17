export type ErrorToastProps = {
    message: React.ReactNode;
};

export function ErrorToast({ message }: ErrorToastProps) {
    return (
        <div className="bg-red-300 text-red-500 rounded-lg py-2 px-3">
            {message}
        </div>
    );
}