import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import StatCard from "../../components/Cards/StatCard";

export default function Reports() {

    const [report, setReport] = useState(null);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const { data } = await api.get("reports/");
            setReport(data);
        }
        catch (error) {
            console.log(error);
        }
    };

    if (!report) {
        return (
            <MainLayout>
                <h3>Loading...</h3>
            </MainLayout>
        );
    }

    return (
        <MainLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Reports
                </h2>

                {/* Membership */}

                <div className="card shadow mb-4">

                    <div className="card-header bg-primary text-white">

                        Membership Report

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-3">
                                <h6>Total Members</h6>
                                <h3>{report.total_members}</h3>
                            </div>

                            <div className="col-md-3">
                                <h6>Active Members</h6>
                                <h3>{report.active_members}</h3>
                            </div>

                            <div className="col-md-3">
                                <h6>Inactive Members</h6>
                                <h3>{report.inactive_members}</h3>
                            </div>

                            <div className="col-md-3">
                                <h6>Expired</h6>
                                <h3>{report.expired_members}</h3>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Expiry */}

                <div className="card shadow mb-4">

                    <div className="card-header bg-warning">

                        Membership Expiry

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4">

                                <h5>1 - 3 Days</h5>

                                <h2>{report.expiry_1_3}</h2>

                            </div>

                            <div className="col-md-4">

                                <h5>4 - 7 Days</h5>

                                <h2>{report.expiry_4_7}</h2>

                            </div>

                            <div className="col-md-4">

                                <h5>8 - 15 Days</h5>

                                <h2>{report.expiry_8_15}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Collection */}

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        Collection Report

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-3">

                                <h6>Today</h6>

                                <h3>₹ {report.today_collection}</h3>

                            </div>

                            <div className="col-md-3">

                                <h6>This Month</h6>

                                <h3>₹ {report.monthly_collection}</h3>

                            </div>

                            <div className="col-md-3">

                                <h6>Last Month</h6>

                                <h3>₹ {report.last_month_collection}</h3>

                            </div>

                            <div className="col-md-3">

                                <h6>Total</h6>

                                <h3>₹ {report.total_collection}</h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}