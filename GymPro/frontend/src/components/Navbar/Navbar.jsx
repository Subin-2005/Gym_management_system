import { useGym } from "../../context/GymContext";
import { FaBars, FaBell } from "react-icons/fa";
import { getImageUrl, handleImageError } from "../../utils/imageUrl";

export default function Navbar({onMenuClick}) {
    const { gym } = useGym();

    const logoSrc = getImageUrl(gym?.logo, "/logo.jpeg");

    return (
        <nav className="topbar px-3 px-md-4">
            <div className="d-flex align-items-center gap-2">
                <button className="menu-button" type="button" aria-label="Open menu" onClick={onMenuClick}><FaBars /></button>

                <img
                    src={logoSrc}
                    alt={gym?.gym_name || "GymPro"}
                    width="45"
                    height="45"
                    className="rounded-circle me-2"
                    style={{ objectFit: "cover" }}
                    onError={(e) => handleImageError(e, "/logo.jpeg")}
                />

                <h4 className="m-0 topbar-title">
                    {gym?.gym_name || "GymPro"}
                </h4>
            </div>

            <div className="topbar-actions">
                <button className="topbar-icon" type="button" aria-label="Notifications"><FaBell /></button>
            </div>
        </nav>
    );
}

