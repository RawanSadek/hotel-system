import { useTranslation } from "react-i18next";
import DashBoard from "./Components/DashBoard";

export default function AdminDashboard() {
  const { t } = useTranslation();
  return (
    <div>
      <DashBoard />
    </div>
  );
}
