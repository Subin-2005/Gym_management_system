import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function Settings() {
  return (
    <MainLayout>
      <div className="container mt-4">

        <h2 className="mb-4">Settings</h2>

        <div className="row">

          <div className="col-md-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">

                <h4>🏋️ Gym Settings</h4>

                <p>
                  Update gym name, logo, address,
                  phone number and email.
                </p>

                <Link
                  to="/settings/gym"
                  className="btn btn-primary"
                >
                  Open
                </Link>

              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">

                <h4>💬 WhatsApp Settings</h4>

                <p>
                  Configure reminder days and
                  WhatsApp message template.
                </p>

                <Link
                  to="/settings/whatsapp"
                  className="btn btn-success"
                >
                  Open
                </Link>

              </div>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}