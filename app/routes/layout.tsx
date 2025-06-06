import { Outlet, useLocation } from "react-router";
import { Navigation } from "~/components/Navigation";
import { Footer } from "~/components/Footer";

export default function Layout() {
	const location = useLocation();

	return (
		<>
			<Navigation currentPath={location.pathname} />
			<Outlet />
			<Footer />
		</>
	);
}
