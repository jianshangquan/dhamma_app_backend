
import Link from 'next/link';

const Menus = [
    {
      path: '/admin',
      label: 'Home'  
    },
    {
        path: '/admin/quote',
        label: 'Daily quote'
    },
    {
        path: '/admin/videos',
        label: 'Videos'
    },
    {
        path: '/admin/audios',
        label: 'Audios'
    },
    {
        path: '/admin/mantras',
        label: 'Mantras'
    }
]


export default function SideMenu() {



    return (
        <div className="w-full h-full p-3 whitespace-nowrap flex flex-col gap-1 border border-r">
            {
                Menus.map((menu, index) => {
                    return (
                        <Link key={index} href={menu.path}>
                            <div className={`cursor-pointer whitespace-nowrap p-2 border rounded-md`}>{menu.label}</div>
                        </Link>
                    )
                })
            }
        </div>
    )
}