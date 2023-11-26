import SideMenu from "../../../components/common/side-menu";

export default function Layout({ children }) {
    return (
        <div className="flex w-full h-full relative">
            <SideMenu />
            {children}
        </div>
    )
}