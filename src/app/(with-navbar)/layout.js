import Navbar from "@/components/Navbar";
import { Fragment } from "react";

export default function AuthenticatedLayout({ children }) {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
}