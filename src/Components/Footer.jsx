const Footer = () => {
    return (
        <div className="sm:flex text-center sm:justify-between space-y-1 sm:space-y-0 items-center sm:px-10 py-4 relative z-50 bg-gray-100">
            <div className="font-semibold text-sm">
                &copy; 2023 InternHub
            </div>
            <div className="space-x-3 text-sm">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </div>
    )
}


export default Footer;