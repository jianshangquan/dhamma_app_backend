import SideMenu from "../../components/common/side-menu";


const Menus = [
    {
        path: '/admin',
        label: 'Home'
    },
    {
        path: '/admin/quote',
        label: 'Daily quote'
    }
]


export default function Layout({ children }) {
    return (
        <div className="flex w-full h-full relative ">
            <div className="w-[18%] min-w-[15rem]"><SideMenu /></div>
            <div className="w-full p-10">{children}</div>
        </div>
    )
}