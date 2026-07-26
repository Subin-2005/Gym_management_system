import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaBars, FaBell } from "react-icons/fa";

export default function Navbar({onMenuClick}) {

    const [gym, setGym] = useState({
        gym_name: "GymPro",
        logo: null,
    });

    useEffect(() => {
        loadGym();
    }, []);

    const loadGym = async () => {
        try {
            const { data } = await api.get("settings/");
            setGym(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className="topbar px-3 px-md-4">

            <div className="d-flex align-items-center gap-2">
                <button className="menu-button" type="button" aria-label="Open menu" onClick={onMenuClick}><FaBars /></button>

                {gym.logo ? (
                    <img
                        src={gym.logo}
                        alt="logo"
                        width="45"
                        height="45"
                        className="rounded-circle me-2"
                    />
                ) : (
                    <img
                        src="/gym.png"
                        alt="logo"
                        width="45"
                        height="45"
                        className="rounded-circle me-2"
                    />
                )}

                <h4 className="m-0 topbar-title">
                    {gym.gym_name || "GymPro"}
                </h4>

            </div>

            <div className="topbar-actions">
                <button className="topbar-icon" type="button" aria-label="Notifications"><FaBell /></button>
            </div>

        </nav>
    );
}
