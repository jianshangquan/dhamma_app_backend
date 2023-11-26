


const Menus = [
    {
        path: '/admin/quote',
        label: 'Daily quote'
    }
]


export default function SideMenu() {
    return (
        <div className="w-[20%] min-w-[18vw] h-full p-3">
            {
                Menus.map((menu, index) => {
                    return (
                        <div key={index} className="cursor-pointer">{menu.label}</div>
                    )
                })
            }
        </div>
    )
}