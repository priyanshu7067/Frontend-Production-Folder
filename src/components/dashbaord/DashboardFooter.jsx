const DashboardFooter = () => {
    return (
        <footer className="h-10 text-xs text-gray-500 flex items-center justify-center border-t bg-white">
            © {new Date().getFullYear()} MF Dashboard
        </footer>
    );
};

export default DashboardFooter;