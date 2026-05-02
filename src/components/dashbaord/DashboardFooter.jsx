const DashboardFooter = () => {
    return (
        <footer className="h-10 text-xs text-gray-500 flex items-center justify-center bg-main">
            © {new Date().getFullYear()} MF All Right Reserved
        </footer>
    );
};

export default DashboardFooter;